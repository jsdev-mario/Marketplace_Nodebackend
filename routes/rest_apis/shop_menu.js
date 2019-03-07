var express = require('express');
var shopMenuCtr = require('../../controller/rest_apis/shopMenuCtr')
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var moment = require('moment');

var router = express.Router();

/**
 * menu add
 */
router.post('/update', common.checkToken, express_validate(validation.shop_menu_update), (req, res, next) => {
    shopMenuCtr.update(req).then(data => {
        res.status(200).json({
            data: data._id,
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