var express = require('express');
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var moment = require('moment');
var braintree = require('braintree');
var router = express.Router();

var gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: appConfig.BRAINTREE_MECHANT_ID,
	publicKey: appConfig.BRAINTREE_PUBLIC_KEY,
	privateKey: appConfig.BRAINTREE_PRIVATE_KEY
});

/**
 * generate client token
 */
router.post('/client_token', express_validate(validation.payment_client_token), (req, res, next) => {
	gateway.clientToken.generate({}).then(response => {
		res.status(200).json({
			data: response.clientToken
		});
	}).catch(error => {
		res.status(500).json({
			message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
		})
	});
});

/**
 * paypal checkout
 */

router.post('/check_out_paypal', express_validate(validation.payment_checkout_paypal), (req, res, next) => {
	var saleRequest = {
		amount: req.body.amount,
		paymentMethodNonce: req.body.nonce,
		orderId: req.body.order_id,
		options: {
			submitForSettlement: true,
			paypal: {
				customField: {},
				description: "Description for PayPal email receipt",
			},
		}
	};
	gateway.transaction.sale(saleRequest).then(result => {
		if (result.success) {
			res.status(200).json({
				data: result.transaction
			})
		} else {
			res.status(300).json({
				message: result.message,
			})
		}
	}).catch(error => {
		res.status(500).json({
			message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
		})
	});
});


/**
 * credit card checkout
 */
router.post('/check_out_card', express_validate(validation.payment_checkout_creditcard), (req, res, next) => {
	gateway.paymentMethod.create({
		// customerId: "theCustomerId",
		paymentMethodNonce: req.body.nonce,
		options: {
			verifyCard: true,
			verificationMerchantAccountId: appConfig.BRAINTREE_MECHANT_ID,
			verificationAmount: "1.00",
		}
	}, (error, result) => {
		if (error) {
			res.status(300).json({
				message: "Invalid card"
			})
		} else if (result.verification) {
			res.status(300).json({
				message: "Invalid card"
			})
		} else {
			gateway.transaction.sale({
				amount: req.body.amount,
				paymentMethodNonce: req.body.nonce,
				order_id: req.body.order_id,
				options: {
					submitForSettlement: true
				}
			}, (error, result) => {
				if (error){
					res.status(500).json({
						message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
					})
				}else if (result.success) {
					res.status(200).json({
						data: result.transaction,
					})
				} else {
					res.status(500).json({
						message: result,
					})
				}
			});
		}
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