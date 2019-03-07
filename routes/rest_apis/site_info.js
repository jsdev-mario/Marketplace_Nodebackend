var express = require('express');
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var multer = require('multer');

var siteInfoCtr = require('../../controller/rest_apis/siteInfoCtr')

var router = express.Router();

var siteDataUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, appConfig.DOC_ROOT + "/" + appConfig.SITEDATA_UPLOAD_URL);
        },
        filename: (req, file, cb) => {
            var filename = 'sitedata' + Math.floor((Math.random() * 127225831) + 1) + Date.now();
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


router.post('/upload_file', common.checkToken, siteDataUpload, express_validate(validation.upload_file), (req, res, next) => {
    var file_url = appConfig.SERVER_URL + appConfig.SITEDATA_UPLOAD_URL + "/" + req.file.filename;
    res.status(200).json({
        data: file_url,
    })
});

function createIfNotExist(req, res, next){
    if (req.body.siteinfo_id){
        next();
    }else{
        
    }
} 

router.post('/get', (req, res, next) => {
    siteInfoCtr.get(req).then(site_info => {
        res.status(200).json({
            data: site_info
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});



router.post('/update_proofidtypes',common.checkToken,  express_validate(validation.proofid_type_update), (req, res, next) => {
    siteInfoCtr.updateProofIdTypes(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/update_proofownershiptypes', common.checkToken, express_validate(validation.proofowner_type_update), (req, res, next) => {
    siteInfoCtr.updateProofOwnerShipTypes(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/update_sitename', common.checkToken, express_validate(validation.siteinfo_sitename_update), (req, res, next) => {
    siteInfoCtr.updateSiteName(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});


router.post('/update_logo', common.checkToken, express_validate(validation.siteinfo_logo_update), (req, res, next) => {
    siteInfoCtr.updateLog(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/update_icon', common.checkToken, express_validate(validation.siteinfo_icon_update), (req, res, next) => {
    siteInfoCtr.updateIcon(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/update_bgimage', common.checkToken, express_validate(validation.siteinfo_bgimage_update), (req, res, next) => {
    siteInfoCtr.updateBgImage(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/update_proof', common.checkToken, express_validate(validation.proof_update), (req, res, next) => {
    siteInfoCtr.updateProofTypes(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/update_meattypes', common.checkToken, express_validate(validation.meattypes_update), (req, res, next) => {
    siteInfoCtr.updateMeatTypes(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/upadate_paymentsettins', common.checkToken, express_validate(validation.payment_settings), (req, res, next) => {
    siteInfoCtr.updatePaymentSettings(req).then(data => {
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
        res.status(404).json({
            message: appConfig.env == "DEV" ? err.message : appConfig.message.COMMON_MSG1004,
        })
        return;
    }
});

module.exports = router