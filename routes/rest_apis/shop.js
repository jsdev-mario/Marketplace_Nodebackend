var express = require('express');
var shopCtr = require('../../controller/rest_apis/shopCtr')
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var moment = require('moment');

var router = express.Router();

/**
 * Butcher preference update
 */
router.post('/update', express_validate(validation.shop_update), (req, res, next) => {
    shopCtr.update(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});


/**
 * Butcher shop menu update
 */
router.post('/update_menu', express_validate(validation.shop_update_menu), (req, res, next) => {
    shopCtr.shopMenuUpdate(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * Shop proof of Id delete
 */
router.post('/delete_proofid', express_validate(validation.shop_delete_proofid), (req, res, next) => {
    shopCtr.deleteProofOfId(req).then(data => {
        res.status(200).json({
            data: data
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * Shop ownership delete
 */
router.post('/delete_ownership', express_validate(validation.shop_delete_ownership), (req, res, next) => {
    shopCtr.deleteOwnership(req).then(data => {
        res.status(200).json({
            data: data
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * Shop proof id add
 */
router.post('/add_proofid', express_validate(validation.shop_add_proofid), (req, res, next) => {
    shopCtr.addProofOfId(req).then(data => {
        res.status(200).json({
            data: data
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * Shop ownership add
 */
router.post('/add_ownership', express_validate(validation.shop_add_ownership), (req, res, next) => {
    shopCtr.addOwnership(req).then(data => {
        res.status(200).json({
            data: data
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});


router.use((err, req, res, next) => {
    if (err) {
        console.log(err);
        res.status(404).json({
            message: appConfig.env == "DEV" ? err.message : appConfig.message.COMMON_MSG1004,
        })
        return;
    }
});

module.exports = router