var express = require('express');
var subcatCtr = require('../../controller/rest_apis/subcategoryCtr')
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var moment = require('moment');

var router = express.Router();

/**
 * subcategory add
 */
router.post('/add', express_validate(validation.subcategory_add), (req, res, next) => {
    subcatCtr.add(req).then(data => {
        if (data){
            if(data.message){
                res.status(300).json(data.message);
            }else{
                res.status(200).json({
                    data: data,
                    message: "Subcategory added."
                })
            }
        } else{
            res.status(300).json({
                message: "Subcategory add fail. try again."
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * subcategory gets
 */
router.post('/get', express_validate(validation.subcategory_get), (req, res, next) => {
    subcatCtr.get(req).then(data => {
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
 * subcategory update
 */
router.post('/update', express_validate(validation.subcategory_update), (req, res, next) => {
    subcatCtr.update(req).then(data => {
        if(data){
            if (data.message){
                res.status(300).json(data.message);
            }else{
                res.status(200).json({
                    data: data,
                })       
            }
        }else{
            res.status(300).json({
                message: "Subcategory update fail. try again.",
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});


/**
 * subcategory remove
 */
router.post('/remove', express_validate(validation.subcategory_remove), (req, res, next) => {
    subcatCtr.remove(req).then(data => {
        res.status(200).json({
            message: "Subcategory removed.",
        })
    }).catch(error => {
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