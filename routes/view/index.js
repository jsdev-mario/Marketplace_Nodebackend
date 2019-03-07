var siteInfoCtr = require('../../controller/rest_apis/siteInfoCtr');
var path = require('path');
var express = require('express');
var router = express.Router();

router.use('/*', function(req, res, next){
    res.render('index');
});

module.exports = router;