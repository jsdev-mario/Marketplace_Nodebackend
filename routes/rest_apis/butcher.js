var express = require('express');
var http = require("http");
var https = require("https");
var butCtr = require('../../controller/rest_apis/butcherCtr')
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
router.post('/signin', express_validate(validation.butcher_signin), (req, res, next) => {
    // if (req.body.recaptcha_key) {
    //     let ip = req.connection.remoteAddress;
    //     let url = "https://www.google.com/recaptcha/api/siteverify?secret=" + appConfig.RECATCHA_SECRET_KEY +
    //         "&response=" + req.body.recaptcha_key + "&remoteip=" + ip;
    //     axios.get(url)
    //         .then(function (response) {
    //             console.log(response.data);
    //             if (response.data.success == true){
    //                 login(req, res);
    //             }else{
    //                 res.status(300).json({
    //                     message: "Invalid request."
    //                 })    
    //             }
    //         })
    //         .catch(function (error) {
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
    butCtr.getLoginUser(req).then(user => {
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
                    token = common.generateToken(user, 12 * 3600);
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
 *  user prifile signup
 */

router.post('/signup', express_validate(validation.butcher_signup), (req, res, next) => {
    req.body.password = common.generateHash(req.body.password);
    req.body.user_status = appConfig.userStatus.NEWREQUEST;
    var address = req.body.shop.address_line1;
    if (req.body.shop.address_line2){
        address += ', ' + req.body.shop.address_line2;
    }
    address += ', ' + req.body.shop.town_city + ', ' + req.body.shop.post_code + ', UK';
    var geocoder = nodeGeocoder(options);
    geocoder.geocode({
        address: address,
        country: 'United Kingdom',
        zipcode: req.body.shop.post_code
    }).then(location_data => {
        if (location_data.length > 0) {
            req.body.shop.location = {
                latitude: location_data[0].latitude,
                longitude: location_data[0].longitude
            };
            butCtr.signUpButcher(req).then(data => {
                if (data) {
                    if (data.message) {
                        res.status(300).json({
                            message: data.message,
                        })
                    } else {
                        var token = common.generateToken(data, 12 * 3600);
                        data.password = undefined;
                        res.status(200).json({
                            data: data,
                            token: token,
                            message: "SignUp sccess."
                        })
                        sendMail.welcomeEmail(data.first_name + ' ' + data.last_name , data.email, appConfig.SERVER_URL);
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
        }else{
            res.status(300).json({
                message: "Invalid address. please check again."
            })
        }
    }).catch(error => {
        console.log(error);
        res.status(300).json({
            message: "Invalid address. please check again."
        })
    });
});


router.post('/update_profile', common.checkToken, express_validate(validation.butcher_update_profile), (req, res, next) => {
    butCtr.updateProfile(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch((error) => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/forgot_password', express_validate(validation.butcher_forgotpassword), (req, res, next) => {
    butCtr.getLoginUser(req).then(user => {
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
                        message: "Please check your email.",
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


router.post('/change_password', common.checkToken, express_validate(validation.butcher_changepassword), (req, res, next) => {
    req.body.new_password = common.generateHash(req.body.new_password);
    butCtr.changePassword(req).then(user => {
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

router.post('/get_all', common.checkToken, express_validate(validation.butchers_get), (req, res, next) => {
    butCtr.getAll(req).then(data => {
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