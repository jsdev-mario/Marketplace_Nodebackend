var orderModel = require('../../models/order');
var moment = require('moment');
var autoCountCtr = require('./autoCountCtr');
var mongoose = require('mongoose');
var appConfig = require('../../config');
var common = require('../../common')
var moment = require('moment');
var custModel = require('../../models/customer');
var butModel = require('../../models/butcher');
var shopModel = require('../../models/shop')
var siteInfoModel = require('../../models/site_info')

exports.add = (req) => {
    return autoCountCtr.getNextCount("order_id").then(function (data) {
        req.body.order.order_id = common.convertOrder32ID(data.count);
        req.body.order.history = [{
            status: appConfig.orderStatus.AWAITING_CONFIRMATION,
            date: new Date(),
        }]
        return custModel.findOneAndUpdate({
            _id: req.body.order.customer.ref_id
        }, {
            last_order_date: new Date(),
        }).then(cust => {
            return butModel.findOneAndUpdate({
                _id: req.body.order.butcher
            }, {
                last_order_date: new Date(),
            }).then(but => {
                return orderModel.create(req.body.order) 
            })
        })
    });
}

exports.getAll = (req) => {
    var search_item = {};
    if(req.body.but_id){
        search_item.butcher = req.body.but_id;
    }else if(req.body.cust_id){
        search_item = {
            'customer.ref_id': req.body.cust_id
        }
    }
    return orderModel.find(search_item);
}

exports.gets = (req) => {
    req.body.skip = req.body.skip || 0;
    req.body.limit = req.body.limit || 0;
    var search_items = {};
    if (req.body.st_date){
        if (req.body.et_date){
            search_items.createdAt = {
                $gte: moment(req.body.st_date).utc().startOf('day'),
                $lte: moment(req.body.et_date).utc().endOf('day'),
            }
        }else{
            search_items.createdAt = {
                $gte: moment(req.body.st_date).utc().startOf('day'),
                $lte: moment(req.body.st_date).utc().endOf('day'),
            }
        }
    }
    if(req.body.status){
        search_items.status = req.body.status;
    }
    return orderModel.find(search_items)
    .sort({status: 1, createdAt : -1})
    .skip(req.body.skip)
    .limit(req.body.limit)
    .populate({
        path: 'butcher',
        model: 'butcher',
        populate: {
            path: 'shop',
            model: 'shop'
        }
    })
    .populate({
        path: 'customer.ref_id',
        model: 'customer',
        populate: {
            path: 'delivery_addresses',
            model: 'delivery_address'
        }
    });
}

exports.getCustOrder = (req) => {
    req.body.skip = req.body.skip || 0;
    req.body.limit = req.body.limit || 0;
    var search_items = {
        'customer.ref_id': req.body.cust_id
    };
    if (req.body.st_date){
        if (req.body.et_date){
            search_items.createdAt = {
                $gte: moment(req.body.st_date).utc().startOf('day'),
                $lte: moment(req.body.et_date).utc().endOf('day'),
            }
        }else{
            search_items.createdAt = {
                $gte: moment(req.body.st_date).utc().startOf('day'),
                $lte: moment(req.body.st_date).utc().endOf('day'),
            }
        }
    }
    if(req.body.status){
        search_items.status = req.body.status;
    }
    return orderModel.find(search_items)
    .sort({status: 1, createdAt : -1})
    .skip(req.body.skip)
    .limit(req.body.limit)
    .populate({
        path: 'butcher',
        model: 'butcher',
        populate: {
            path: 'shop',
            model: 'shop'
        }
    })
    .populate({
        path: 'customer.ref_id',
        model: 'customer',
        populate: {
            path: 'delivery_addresses',
            model: 'delivery_address'
        }
    });
}

exports.getButOrder = (req) => {
    req.body.skip = req.body.skip || 0;
    req.body.limit = req.body.limit || 0;
    var search_items = {
        butcher: req.body.but_id
    };
    if (req.body.st_date){
        if (req.body.et_date){
            search_items.createdAt = {
                $gte: moment(req.body.st_date).utc().startOf('day'),
                $lte: moment(req.body.et_date).utc().endOf('day'),
            }
        }else{
            search_items.createdAt = {
                $gte: moment(req.body.st_date).utc().startOf('day'),
                $lte: moment(req.body.st_date).utc().endOf('day'),
            }
        }
    }
    if(req.body.status){
        search_items.status = req.body.status;
    }
    return orderModel.find(search_items)
    .sort({status: 1, createdAt : -1})
    .skip(req.body.skip)
    .limit(req.body.limit)
    .populate({
        path: 'butcher',
        model: 'butcher',
        populate: {
            path: 'shop',
            model: 'shop'
        }
    })
    .populate({
        path: 'customer.ref_id',
        model: 'customer',
        populate: {
            path: 'delivery_addresses',
            model: 'delivery_address'
        }
    });
}

exports.updateStatus = (req) => {
    let update_data = {
        status: req.body.status,
        $push: {
            history: {
                status: req.body.status,
                date: new Date(),
                note: req.body.note,
            }
        }
    }
    if (req.body.but_confirm_delivery_time !== undefined){
        update_data.but_confirm_delivery_time = req.body.but_confirm_delivery_time;
    }
    return orderModel.findOneAndUpdate({
        _id: req.body.order_id
    }, update_data, {
        new: true,
    })
    .populate({
        path: 'butcher',
        model: 'butcher',
        populate: {
            path: 'shop',
            model: 'shop'
        }
    })
    .populate({
        path: 'customer.ref_id',
        model: 'customer',
        populate: {
            path: 'delivery_addresses',
            model: 'delivery_address'
        }
    });
}

exports.rating = (req) => {
    const but_rate = (req.body.rates.quality + req.body.rates.service + req.body.rates.time + req.body.rates.fee) / 4;
    return orderModel.findOneAndUpdate({
        _id: req.body.order_id
    }, {
        rates: req.body.rates,
        rated: true,
    }, {
        new: true,
    })
    .populate({
        path: 'butcher',
        model: 'butcher',
        populate: {
            path: 'shop',
            model: 'shop'
        }
    }).then(order => {
        return shopModel.findOneAndUpdate({
            _id: order.butcher.shop._id
        }, {
            rate_num: order.butcher.shop.rate_num + 1,
            rate: (order.butcher.shop.rate * order.butcher.shop.rate_num + but_rate) / (order.butcher.shop.rate_num + 1),
        }).then(data => {
            return siteInfoModel.findOne({}).then(site_info => {
                return siteInfoModel.findOneAndUpdate({
                    _id: site_info._id
                }, {
                    rate_num: site_info.rate_num + 1,
                    rate: (site_info.rate * site_info.rate_num + req.body.rates.experience) / (site_info.rate_num + 1),
                })
            })
        })
    })
}

exports.refundRequest = (req) => {
    console.log(req.body.rates);
    return orderModel.findOneAndUpdate({
        _id: req.body.order_id
    }, {
        'refund.requser_type': req.body.requser_type,
        'refund.amount': req.body.amount,
        'refund.note': req.body.refund_note,
        'refund.reqdate': new Date(),
        $push: {
            history: {
                status: req.body.requser_type !== appConfig.userType.ADMIN ? 
                        appConfig.orderStatus.REFUND_REQUEST : appConfig.orderStatus.REFUND_PROCESSED,
                date: new Date(),
                note: req.body.refund_note,
                refund_requser_type: req.body.requser_type,
                refund_amount: req.body.amount,
            }
        }
    }, {
        new: true,
    }).populate({
        path: 'butcher',
        model: 'butcher',
        populate: {
            path: 'shop',
            model: 'shop'
        }
    })
    .populate({
        path: 'customer.ref_id',
        model: 'customer',
        populate: {
            path: 'delivery_addresses',
            model: 'delivery_address'
        }
    });
}