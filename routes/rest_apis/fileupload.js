var express = require('express');
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var multer = require('multer');
var router = express.Router();

var userDataUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, appConfig.DOC_ROOT + "/" + appConfig.USERDATA_UPLOAD_URL);
        },
        filename: (req, file, cb) => {
            var filename = 'userdata' + Math.floor((Math.random() * 127225831) + 1) + Date.now();
            if (file.mimetype.startsWith("image/")) {
                filename += "." + file.mimetype.replace("image/", "");
            }
        cb(null, filename);
        }
    }),
    limits: {
        fileSize: 4096 * 4096,
        files: 1,
    }
}).single('image');

router.post('/userdata', common.checkToken, userDataUpload, express_validate(validation.upload_file), (req, res, next) => {
    var file_url = appConfig.SERVER_URL + appConfig.USERDATA_UPLOAD_URL + "/" + req.file.filename;
    res.status(200).json({
        data: file_url,
    })
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