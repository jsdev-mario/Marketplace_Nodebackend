var deliveryAddrModel = require('../../models/delivery_address');
var moment = require('moment');
var mongoose = require('mongoose');
var appConfig = require('../../config');

exports.add = (req) => {
    return deliveryAddrModel.create(req.body.address);
}

exports.update = (req) => {
    return deliveryAddrModel.findOneAndUpdate({
        _id: req.body.address._id,
    }, req.body.address, {
        new: true,
    });
}

exports.remove = (req) => {
    return deliveryAddrModel.findOneAndRemove({
        _id: req.body.address_id,
    });
}

