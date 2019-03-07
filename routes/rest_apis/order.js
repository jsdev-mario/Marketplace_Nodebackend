var express = require('express');
var orderCtr = require('../../controller/rest_apis/orderCtr')
var appConfig = require('../../config');
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var moment = require('moment');

var router = express.Router();

/**
 * menu add
 */
router.post('/add', express_validate(validation.order_add), (req, res, next) => {
    orderCtr.add(req).then(data => {
        if (data){
            res.status(200).json({
                data: data,
                message: "Order success."
            })
        } else{
            res.status(300).json({
                message: "Order fail. try again."
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

/**
 * order gets
 */
router.post('/gets', express_validate(validation.order_gets), (req, res, next) => {
    orderCtr.gets(req).then(data => {
        res.status(200).json({
            data: data,
        });
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/get_ordersinfo', express_validate(validation.order_getinfo), (req, res, next) => {
    orderCtr.getAll(req).then(all_data => {
        if (req.body.is_today){
            all_data = all_data.filter(element => {
                if(moment(element.createdAt).utc() >= moment().utc().startOf('day') 
                && moment(element.createdAt) <= moment().utc().endOf('day')){
                    return element;
                }
            })
        }
        var total_count = all_data.length;
        var total_price = 0.0;
        var service_charge = 0.0;
        var await_confirm_count = 0;
        var cash_paid_price = 0.0;
        var card_paid_price = 0.0;
        var paypal_paid_price = 0.0;
        var reject_count = 0;
        var cancel_count = 0;
        all_data.forEach(order => {
            var refund_price = 0;
            order.history.forEach(history => {
                if (history.refund_amount && history.status === appConfig.orderStatus.REFUND_PROCESSED){
                    refund_price += history.refund_amount
                }
            })
            var sub_price = order.sub_price + order.delivery_fee - refund_price;
            total_price += sub_price;
            service_charge += order.service_charge;
            if(order.status === appConfig.orderStatus.AWAITING_CONFIRMATION){
                await_confirm_count ++;
            }else if(order.status === appConfig.orderStatus.CANCELLED_BYCUST){
                cancel_count ++;
            }else if (order.status === appConfig.orderStatus.REJECTED){
                reject_count ++;
            }
            if (order.payment_method === appConfig.paymentMethod.PAYPAL){
                paypal_paid_price += sub_price;
            }else if (order.payment_method === appConfig.paymentMethod.CARD){
                card_paid_price += sub_price;
            }else{
                cash_paid_price += sub_price;
            }
        });
        res.status(200).json({
            data: {
                total_count: total_count,
                reject_count: reject_count,
                cancel_count: cancel_count,
                total_price: total_price,
                await_confirm_count: await_confirm_count,
                paypal_paid_price: paypal_paid_price,
                card_paid_price: card_paid_price,
                cash_paid_price: cash_paid_price,
                commissions: service_charge
            }
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    })
});

/**
 * customer order get
 */
router.post('/get_custorder', express_validate(validation.order_custget), (req, res, next) => {
    orderCtr.getCustOrder(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/get_custordersinfo', express_validate(validation.order_getinfo), (req, res, next) => {
    req.body.cust_id = req.body.user_id;
    orderCtr.getAll(req).then(all_data => {
        if (req.body.is_today){
            all_data = all_data.filter(element => {
                if(moment(element.createdAt).utc() >= moment().utc().startOf('day') 
                && moment(element.createdAt) <= moment().utc().endOf('day')){
                    return element;
                }
            })
        }
        var total_count = all_data.length;
        var total_price = 0.0;
        var await_confirm_count = 0;
        var cash_paid_price = 0.0;
        var card_paid_price = 0.0;
        var paypal_paid_price = 0.0;
        all_data.forEach(order => {
            var refund_price = 0;
            order.history.forEach(history => {
                if (history.refund_amount && history.status === appConfig.orderStatus.REFUND_PROCESSED){
                    refund_price += history.refund_amount
                }
            })
            var sub_price = order.sub_price + order.delivery_fee - refund_price;
            total_price += sub_price;
            if(order.status === appConfig.orderStatus.AWAITING_CONFIRMATION){
                await_confirm_count ++;
            }
            if (order.payment_method === appConfig.paymentMethod.PAYPAL){
                paypal_paid_price += sub_price;
            }else if (order.payment_method === appConfig.paymentMethod.CARD){
                card_paid_price += sub_price;
            }else{
                cash_paid_price += sub_price;
            }
        });
        res.status(200).json({
            data: {
                total_count: total_count,
                total_price: total_price,
                await_confirm_count: await_confirm_count,
                paypal_paid_price: paypal_paid_price,
                card_paid_price: card_paid_price,
                cash_paid_price: cash_paid_price
            }
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    })
});

/**
 * butcher order get
 */
router.post('/get_butorder', express_validate(validation.order_butget), (req, res, next) => {
    orderCtr.getButOrder(req).then(data => {
        res.status(200).json({
            data: data,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/get_butordersinfo', express_validate(validation.order_getinfo), (req, res, next) => {
    req.body.but_id = req.body.user_id;
    orderCtr.getAll(req).then(all_data => {
        if (req.body.is_today){
            all_data = all_data.filter(element => {
                if(moment(element.createdAt).utc() >= moment().utc().startOf('day') 
                && moment(element.createdAt) <= moment().utc().endOf('day')){
                    return element;
                }
            })
        }
        var total_count = all_data.length;
        var total_price = 0.0;
        var await_confirm_count = 0;
        var cash_paid_price = 0.0;
        var card_paid_price = 0.0;
        var paypal_paid_price = 0.0;
        all_data.forEach(order => {
            var refund_price = 0;
            order.history.forEach(history => {
                if (history.refund_amount && history.status === appConfig.orderStatus.REFUND_PROCESSED){
                    refund_price += history.refund_amount
                }
            })
            var sub_price = order.sub_price + order.delivery_fee - refund_price;
            total_price += sub_price;
            if(order.status === appConfig.orderStatus.AWAITING_CONFIRMATION){
                await_confirm_count ++;
            }
            if (order.payment_method === appConfig.paymentMethod.PAYPAL){
                paypal_paid_price += sub_price;
            }else if (order.payment_method === appConfig.paymentMethod.CARD){
                card_paid_price += sub_price;
            }else{
                cash_paid_price += sub_price;
            }
        });
        res.status(200).json({
            data: {
                total_count: total_count,
                total_price: total_price,
                await_confirm_count: await_confirm_count,
                paypal_paid_price: paypal_paid_price,
                card_paid_price: card_paid_price,
                cash_paid_price: cash_paid_price
            }
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    })
});

/**
 * order status update
 */
router.post('/update_status', express_validate(validation.order_updatestatus), (req, res, next) => {
    orderCtr.updateStatus(req).then(data => {
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
 * order rate
 */
router.post('/rating', express_validate(validation.order_rating), (req, res, next) => {
    orderCtr.rating(req).then(data => {
        res.status(200).json({
            message: 'Success',
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    });
});

router.post('/refund_request', express_validate(validation.order_refund_request), (req, res, next) => {
    orderCtr.refundRequest(req).then(data => {
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