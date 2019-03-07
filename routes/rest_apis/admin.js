var express = require('express');
var nodeGeocoder = require('node-geocoder');
var adminCtr = require('../../controller/rest_apis/adminCtr')
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var multer = require('multer');
var moment = require('moment');
var nodemailer = require('nodemailer');

var router = express.Router();

/**
 * admin login
 */

router.post('/signin', express_validate(validation.admin_signin), (req, res, next) => {
    adminCtr.getLoginUser(req).then(user => {
        if (user){
            if(user.status == appConfig.userStatus.BLOCKED){
                res.status(450).json({
                    message: 'Your account was blocked'
                })
            }else{
                if (common.validPassword(req.body.password, user.password)) {
                    user.password = undefined;
                    var token = common.generateToken(user, 12 * 3600);
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
        }else{
            res.status(300).json({
                message: 'User does not exist!'
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * admin sign up
 */
router.post('/signup', express_validate(validation.admin_signup), (req, res, next) => {
    req.body.password = common.generateHash(req.body.password);
    req.body.user_status = appConfig.userStatus.ACTIVE;
    adminCtr.signUp(req).then(user => {
        if (user.message){
            res.status(300).json({
                message: user.message
            })
        }else{
            user.password = undefined;
            res.status(200).json({
                data: user
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * profile update
 */
router.post('/profile_update', common.checkToken, express_validate(validation.admin_profile_update), (req, res, next) => {
    adminCtr.updateProfile(req).then(data => {
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
 * Butcher account accept
 */
router.post('/accept_but', common.checkToken, express_validate(validation.admin_butcher_accept), (req, res, next) => {
    adminCtr.butcherAccept(req).then(data => {
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
 * Butcher account decline
 */
router.post('/decline_but', common.checkToken, express_validate(validation.admin_butcher_decline), (req, res, next) => {
    adminCtr.butcherDecline(req).then(data => {
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
 * Butcher account active
 */
router.post('/active_but', common.checkToken, express_validate(validation.admin_butcher_active), (req, res, next) => {
    adminCtr.butcherActive(req).then(data => {
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
 * Butcher account deactivate
 */
router.post('/deactivate_but', common.checkToken, express_validate(validation.admin_butcher_deactivate), (req, res, next) => {
    adminCtr.butcherDeactivate(req).then(data => {
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
 * Butcher account deactivate
 */
router.post('/update_but_bankaccount', common.checkToken, express_validate(validation.admin_butcher_bankaccount_update), (req, res, next) => {
    adminCtr.butcherBankAccountUpdate(req).then(data => {
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
 * Butcher card add
 */
router.post('/add_but_card', common.checkToken, express_validate(validation.admin_butcher_card_add), (req, res, next) => {
    adminCtr.butcherCardAdd(req).then(data => {
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
 * Butcher card delete
 */
router.post('/delete_but_card', common.checkToken, express_validate(validation.admin_butcher_card_delete), (req, res, next) => {
    adminCtr.butcherCardDelete(req).then(data => {
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
 * Butcher def card set
 */
router.post('/set_but_defcard', common.checkToken, express_validate(validation.admin_butcher_defcard_set), (req, res, next) => {
    adminCtr.butcherDefCardSet(req).then(data => {
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
 * Butcher update profile
 */

router.post('/update_butprofile', common.checkToken, express_validate(validation.admin_butcher_update_profile), (req, res, next) => {
    adminCtr.updateButProfile(req).then(data => {
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
 * Shop update
 */

router.post('/update_shop', common.checkToken, express_validate(validation.admin_shop_update), (req, res, next) => {
    adminCtr.updateShop(req).then(data => {
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
