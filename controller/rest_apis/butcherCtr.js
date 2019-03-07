var butModel = require('../../models/butcher');
var shopModel = require('../../models/shop');
var moment = require('moment');
var mongoose = require('mongoose');
var appConfig = require('../../config');

exports.getLoginUser = (req) => {
    return butModel.findOneAndUpdate({
            email: req.body.email,
        }, {
            noti_token: req.body.noti_token,
        }, {
            noti_token: 0,
        }).populate('shop')
};

exports.signUpButcher = (req) => {
    return butModel.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return {
                message: "User exist already."
            }
        } else {
            return shopModel.create(req.body.shop).then(new_shop => {
                req.body.shop = new_shop._id;
                req.body.account_histories.push({
                    user_status: appConfig.userStatus.NEWREQUEST,
                    note: req.body.shop.other_info
                })
                return butModel.create(req.body)
            });
        }
    });
};

exports.updateProfile = (req) => {
    return butModel.findOneAndUpdate({
            _id: req.body.user_id
        }, req.body, {
            new: true,
        }).populate('shop')
}

exports.changePassword = (req) => {
    return butModel.findOneAndUpdate({
        _id: req.body.user_id
    }, {
        password: req.body.new_password
    }, {
        new: true,
    });
}

exports.getAll = (req) => {
    return butModel.find({}).populate('shop');
}

