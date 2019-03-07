var express = require('express');
var SSE = require('sse-nodejs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var orderModel = require('../../models/order')
var appConfig = require('../../config');
var common = require('../../common');
var moment = require('moment');
var router = express.Router();


/**
 * but order detect sse url
 */
router.get('/addbutorders/:token', common.checkToken, (req, res, next) => {
    var total_count = -1;
    var interval_id = setInterval(()=> {
        orderModel.find({butcher: req.body.user_id}).then(all_data => {
            total_count = all_data.length;
        }).catch(error => {
            total_count = -1;
        });
    }, 5000);
    var sse = SSE(res);
    sse.sendEvent('addbutorders', function () {
        if (total_count !== -1 && total_count !== undefined){
            return total_count;
        }
    }, 3000);

    sse.disconnect(function () {
        clearInterval(interval_id);
        sse.removeEvent('addbutorders', 1000)
    });
});

/**
 * admin order detect sse url
 */
router.get('/addorders/:token', common.checkToken, (req, res, next) => {
    var total_count = -1;
    var interval_id = setInterval(()=> {
        orderModel.find({}).then(all_data => {
            total_count = all_data.length;
        }).catch(error => {
            total_count = -1;
        });
    }, 5000);
    var sse = SSE(res);
    sse.sendEvent('addorders', function () {
        if (total_count !== -1 && total_count !== undefined){
            return total_count;
        }
    }, 3000);

    sse.disconnect(function () {
        clearInterval(interval_id);
        sse.removeEvent('addorders', 1000)
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