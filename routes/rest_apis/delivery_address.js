var express = require('express');
var deliveryAddrCtr = require('../../controller/rest_apis/deliveryAddrCtr')
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var moment = require('moment');

var router = express.Router();

/**
 * delivery address update
 */
// router.post('/update', express_validate(validation.user_delivery_address_update), (req, res, next) => {
//     deliveryAddrCtr.update(req).then(data => {
//         res.status(200).json({
//             data: data,
//         })
//     }).catch(error => {
//         res.status(500).json({
//             message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
//         })
//     });
// });

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