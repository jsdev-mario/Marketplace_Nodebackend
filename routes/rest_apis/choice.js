var express = require('express');
var choiceCtr = require('../../controller/rest_apis/choiceCtr')
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var moment = require('moment');

var router = express.Router();

/**
 * Choice add
 */
router.post('/add', express_validate(validation.choice_add), (req, res, next) => {
    choiceCtr.add(req).then(data => {
        if (data){
            if(data.message){
                res.status(300).json(data.message);
            }else{
                res.status(200).json({
                    data: data,
                    message: "Order choice added."
                })
            }
        } else{
            res.status(300).json({
                message: "Order choice add fail. try again."
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * Choice get
 */
router.post('/get', express_validate(validation.choice_get), (req, res, next) => {
    choiceCtr.get(req).then(data => {
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
 * Choice update
 */
router.post('/update', express_validate(validation.choice_update), (req, res, next) => {
    choiceCtr.update(req).then(data => {
        if(data){
            if(data.message){
                res.status(300).json(data.message);
            }else{
                res.status(200).json({
                    data: data,
                })
            }
        }else{
            res.status(300).json({
                data: "Order choice update fail. try again",
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * Choice update
 */
router.post('/remove', express_validate(validation.choice_remove), (req, res, next) => {
    choiceCtr.remove(req).then(data => {
        res.status(200).json({
            message: "Choice removed",
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