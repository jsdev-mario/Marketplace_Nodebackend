var express = require('express');
var catCtr = require('../../controller/rest_apis/categoryCtr')
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var moment = require('moment');

var router = express.Router();

/**
 * Category add
 */
router.post('/add', express_validate(validation.category_add), (req, res, next) => {
    catCtr.add(req).then(data => {
        if (data){
            if(data.message){
                res.status(300).json(data.message);
            }else{
                res.status(200).json({
                    data: data,
                    message: "Category added."
                })
            }
        } else{
            res.status(300).json({
                message: "Category add fail. try again."
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * Category gets
 */
router.post('/get', express_validate(validation.category_get), (req, res, next) => {
    catCtr.get(req).then(data => {
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
                message: "Category update fail. try again."
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * Category update
 */
router.post('/update', express_validate(validation.category_update), (req, res, next) => {
    catCtr.update(req).then(data => {
        if (data){
            if (data.message){
                res.status(300).json(data.message);
            }else{
                res.status(200).json({
                    data: data,
                })
            }
        }else{
            res.status(300).json({
                message: "Category update fail. try again."
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * Category remove
 */
router.post('/remove', express_validate(validation.category_remove), (req, res, next) => {
    catCtr.remove(req).then(data => {
        res.status(200).json({
            message: "Category removed",
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.use((err, req, res, next) => {
    if (err) {
        console.log(error);
        res.status(404).json({
            message: appConfig.env == "DEV" ? err.message : appConfig.message.COMMON_MSG1004,
        })
        return;
    }
});

module.exports = router