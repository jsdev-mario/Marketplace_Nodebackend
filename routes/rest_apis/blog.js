var express = require('express');
var blogCtr = require('../../controller/rest_apis/blogCtr')
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var moment = require('moment');

var router = express.Router();

/**
 * blog add
 */
router.post('/add', common.checkToken, express_validate(validation.blog_add), (req, res, next) => {
    req.body.blog.created_date = new Date();
    req.body.blog.modified_date = new Date();
    blogCtr.add(req).then(data => {
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
 * blog update
 */
router.post('/update', common.checkToken, express_validate(validation.blog_update), (req, res, next) => {
    req.body.blog.modified_date = new Date();
    blogCtr.update(req).then(data => {
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
 * blog remove
 */
router.post('/remove', common.checkToken, express_validate(validation.blog_remove), (req, res, next) => {
    blogCtr.remove(req).then(data => {
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
 * comment add
 */
router.post('/comment_add', common.checkToken, express_validate(validation.comment_add), (req, res, next) => {
    blogCtr.addComment(req).then(data => {
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
 * comment update
 */
router.post('/comment_update', common.checkToken, express_validate(validation.comment_update), (req, res, next) => {
    blogCtr.updateComment(req).then(data => {
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
 * comment remove
 */
router.post('/comment_remove', common.checkToken, express_validate(validation.comment_remove), (req, res, next) => {
    blogCtr.removeComment(req).then(data => {
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
 * latest blog get
 */
router.post('/get', (req, res, next) => {
    blogCtr.get(req).then(data => {
        res.status(200).json({
            data: data,
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