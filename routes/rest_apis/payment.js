var express = require('express');
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var moment = require('moment');
var router = express.Router();
var request = require('request');

var access_token;

/**
 * generate client token
 */
router.post('/get_access_token', (req, res, next) => {
	request.post({
		uri: "https://api.sandbox.paypal.com/v1/oauth2/token",
		headers: {
			"Accept": "application/json",
			"Accept-Language": "en_US",
			"content-type": "application/x-www-form-urlencoded"
		},
		auth: {
		'user': 'Ad10hIlmSLE12qeho2LZP_OK6iQYQblkw34oBLbalSdUkJv7vylp-xvk4sJWA4uF02MMElo_Xx7QFDGh',
		'pass': 'EBGLV2a9Pwy2pwLVMKxYHgVqFaOTKgxwjInpKlloenpiBbwxzo2xvSF14NEbIgciWFn9VBpvPcdM0edS',
		// 'sendImmediately': false
	  },
	  form: {
		"grant_type": "client_credentials"
	  }
	}, function(error, response, body) {
		if (error === null){
			access_token = JSON.parse(body).access_token;
		}
	});
	
});


router.post('/confirm', (req, res, next) => {
	console.log(req);
});


router.use((err, req, res, next) => {
	if (err) {
		console.log(er);
		res.status(404).json({
			message: appConfig.env == "DEV" ? err.message : appConfig.message.COMMON_MSG1004,
		})
		return;
	}
});

module.exports = router