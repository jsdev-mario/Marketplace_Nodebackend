var express = require('express');
var contactUsCtr = require('../../controller/rest_apis/contactUsCtr')
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var moment = require('moment');
var sendmail = require('../../emails/send_mail');
var router = express.Router();

/**
 * Choice add
 */
router.post('/add', express_validate(validation.contactus_add), (req, res, next) => {
    contactUsCtr.add(req).then(data => {
        res.status(200).json({
            message: 'success',
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