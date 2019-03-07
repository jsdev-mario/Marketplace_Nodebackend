var express = require('express');
var http = require("http");
var https = require("https");
var custCtr = require('../../controller/rest_apis/customerCtr')
var deliveryAddrCtr = require('../../controller/rest_apis/deliveryAddrCtr')
var request = require('request');
var appConfig = require('../../config');
var nodeGeocoder = require('node-geocoder');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var multer = require('multer');
var moment = require('moment');
var nodemailer = require('nodemailer');
var router = express.Router();
var axios = require('axios');
var sendMail = require('../../emails/send_mail');

/**
 *  send email
 */

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: appConfig.adminUserEmail, // generated ethereal user
        pass: appConfig.adminUserEmail_pass // generated ethereal password
    }
});

//Geolocaton option
var options = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: appConfig.GOOGLE_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

/**
 * user login
 */
router.post('/signin', express_validate(validation.customer_signin), (req, res, next) => {
    // if (req.body.recaptcha_key) {
    //     let ip = req.connection.remoteAddress;
    //     let url = "https://www.google.com/recaptcha/api/siteverify?secret=" + appConfig.RECATCHA_SECRET_KEY +
    //         "&response=" + req.body.recaptcha_key + "&remoteip=" + ip;
    //     axios.get(url).then(function (response) {
    //             console.log(response.data);
    //             if (response.data.success == true){
    //                 login(req, res);
    //             }else{
    //                 res.status(300).json({
    //                     message: "Invalid request."
    //                 })    
    //             }
    //         }).catch(function (error) {
    //             res.status(300).json({
    //                 message: "Invalid request."
    //             })
    //         });
    // } else {
    //     login(req, res);
    // }
    login(req, res);
});

function login(req, res) {
    custCtr.getLoginUser(req).then(user => {
        if (user) {
            if (user.user_status == appConfig.userStatus.BLOCKED) {
                res.status(450).json({
                    message: "Your account was blocked.",
                })
            } else {
                var token;
                if (req.body.remember){
                    token = common.generateToken(user, 300 * 3600);   
                }else{
                    token = common.generateToken(user, 5 * 3600);
                }
                if (common.validPassword(req.body.password, user.password)) {
                    user.password = undefined;
                    res.status(200).json({
                        data: user,
                        token: token,
                        message: "Welcome to Meat Hut.",
                    })
                } else {
                    res.status(300).json({
                        message: "Invalid password.",
                    })
                }
            }
        } else {
            res.status(300).json({
                message: "User doesn't exist.",
            })
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
}

/**
 *  customer signup
 */

 router.post('/signup', express_validate(validation.customer_signup), (req, res, next) => {
    req.body.password = common.generateHash(req.body.password);
    req.body.user_status = appConfig.userStatus.ACTIVE;
    if (req.body.post_code){
        req.body.address = {
            address_name: req.body.post_code,
            post_code: req.body.post_code,
            location: req.body.location,
            address_line1: req.body.address_line1,
        }
        deliveryAddrCtr.add(req).then(address => {
            req.body.delivery_addresses = [address._id];
            customerSignUp(req,res);
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
            })
        })
    }else{
        customerSignUp(req, res);
    }
});

function customerSignUp(req, res){
    custCtr.signUpCustomer(req).then(data => {
        if (data) {
            if (data.message) {
                res.status(300).json({
                    message: data.message,
                })
            } else {
                var token = common.generateToken(data, 5 * 3600);
                data.password = undefined;
                res.status(200).json({
                    data: data,
                    token: token,
                    message: "SignUp sccess."
                })
                sendMail.welcomeEmail(data.email , data.email, appConfig.SERVER_URL);
            }
        } else {
            res.status(300).json({
                message: "SignUp fail.",
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
}

router.post('/customer_socialsignup', express_validate(validation.customersocial_signup), (req, res, next) => {
    req.body.is_social = true;
    req.body.user_status = appConfig.userStatus.ACTIVE;
    custCtr.signUpCustomer(req).then(data => {
        if (data) {
            if (data.message) {
                res.status(300).json({
                    message: data.message,
                })
            } else {
                var token = common.generateToken(data, 5 * 3600);
                data.password = undefined;
                res.status(200).json({
                    data: data,
                    token: token,
                    message: "SignUp sccess."
                })
            }
        } else {
            res.status(300).json({
                message: "SignUp fail.",
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/forgot_password', express_validate(validation.customer_forgotpassword), (req, res, next) => {
    custCtr.getLoginUser(req).then(user => {
        if (user){
            var token = common.generateToken(user, 15 * 60);
            let mailOptions = {
                from: appConfig.contactEmail, // sender address
                to: req.body.email, // list of receivers
                subject: "Meat Hut", // Subject line
                text: "Please verify your account.", // plain text body
                html: "<h5> Did you request a password reset? If yes, click the link below and set a new password.</h5><br> " + 
                    "<a href='" + appConfig.SERVER_URL + "/user/passwordchange/" + token + "'>New Password</a>"
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error.message);
                    res.status(500).json({
                        message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
                    })
                } else {
                    res.status(200).json({
                        message: "Please check your account email.",
                    })
                }
            });
        }else{
            res.status(300).json({
                message: "User does not exist!",
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});


router.post('/change_password', common.checkToken, express_validate(validation.customer_changepassword), (req, res, next) => {
    req.body.new_password = common.generateHash(req.body.new_password);
    custCtr.changePassword(req).then(user => {
        res.status(200).json({
            message: "Password changed"
        })
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * update profile
 */

router.post('/update_profile', common.checkToken, express_validate(validation.customer_update_profile), (req, res, next) => {
    if (req.body.user_type == appConfig.userType.CUSTOMER){
        req.body.cust_id = req.body.user_id
    }
    custCtr.updateProfile(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch((error) => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * delete account
 */

router.post('/delete_account', common.checkToken, express_validate(validation.customer_delete_account), (req, res, next) => {
    custCtr.deleteAccount(req).then(data => {
        if (data.message){
            res.status(300).json({
                message: data.message,
            })    
        }else{
            res.status(200).json({
                message: 'Account deleted',
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/delete_account_byadmin', common.checkToken, express_validate(validation.customer_delete_account_byadmin), (req, res, next) => {
    custCtr.deleteAccountByAdmin(req).then(data => {
        if (data.message){
            res.status(300).json({
                message: data.message,
            })    
        }else{
            res.status(200).json({
                message: 'Account deleted',
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});


/**
 * add delivery address
 */
router.post('/add_delivery_address', common.checkToken, express_validate(validation.delivery_address_add), (req, res, next) => {
    if (req.body.user_type == appConfig.userType.CUSTOMER){
        req.body.cust_id = req.body.user_id
    }
    custCtr.addDeliveryAddress(req).then(data => {
        if(data.message){
            res.status(300).json({
                message: data.message,
            })
            return;    
        }
        res.status(200).json({
            data: data,
        })
    }).catch((error) => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * remove delivery address
 */
router.post('/remove_delivery_address', common.checkToken, express_validate(validation.delivery_address_remove), (req, res, next) => {
    if (req.body.user_type == appConfig.userType.CUSTOMER){
        req.body.cust_id = req.body.user_id
    }
    custCtr.removeDeliveryAddress(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch((error) => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});


/**
 * update delivery address
 */
router.post('/update_delivery_address', common.checkToken, express_validate(validation.user_delivery_address_update), (req, res, next) => {
    if (req.body.user_type == appConfig.userType.CUSTOMER){
        req.body.cust_id = req.body.user_id
    }
    custCtr.updateDeliveryAddress(req).then(data => {
        if(data.message){
            res.status(300).json({
                message: data.message,
            })
            return;    
        }
        res.status(200).json({
            data: data,
        })
    }).catch((error) => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 *  send email
 */

router.post('/req_signup_verify', common.checkToken, express_validate(validation.user_signup_verify), (req, res, next) => {

    var verify_code = Math.floor(Math.random() * 8999) + 1000
    // setup email data with unicode symbols
    let mailOptions = {
        from: appConfig.contactEmail, // sender address
        to: req.body.email, // list of receivers
        subject: "Meat Hut", // Subject line
        text: "Please verify your account.", // plain text body
        html: '<h5> Verification Code:</h5><br>' +
            '<b>' + verify_code + '</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        req.session.verify_code = verify_code;
        console.log("email code: " + verify_code);
        if (error) {
            console.log(error.message);
            res.status(500).json({
                message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
            })
        } else {
            res.status(200).json({
                message: "Please check your account email.",
            })
        }
    });
});

var userDataUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, appConfig.DOC_ROOT + "/" + appConfig.USERDATA_UPLOAD_URL);
        },
        filename: (req, file, cb) => {
            var filename = 'userdata' + Math.floor((Math.random() * 127225831) + 1) + Date.now();
            if (file.mimetype.startsWith("image/")) {
                filename += "." + file.mimetype.replace("image/", "");
            }
            cb(null, filename);
        }
    }),
    limits: {
        fileSize: 4096 * 4096,
        files: 1,
    }
}).single('image');

router.post('/upload_file', userDataUpload, express_validate(validation.upload_file), (req, res, next) => {
    var file_url = appConfig.SERVER_URL + appConfig.USERDATA_UPLOAD_URL + "/" + req.file.filename;
    res.status(200).json({
        data: file_url,
    })
});


router.post('/get_all', common.checkToken, express_validate(validation.customers_get), (req, res, next) => {
    custCtr.getAll(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch((error) => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});


router.use((err, req, res, next) => {
    if (err) {
        res.status(404).json({
            message: appConfig.env == "DEV" ? err.message : appConfig.message.COMMON_MSG1004,
        })
        return;
    }
});

module.exports = router