var custModel = require('../../models/customer');
var moment = require('moment');
var mongoose = require('mongoose');
var appConfig = require('../../config');
var addrModel = require('../../models/delivery_address')
var delAddrCtr = require('../../controller/rest_apis/deliveryAddrCtr')
var common = require('../../common');


exports.getLoginUser = (req) => {
    return custModel.findOneAndUpdate({
        email: req.body.email,
    }, {
        noti_token: req.body.noti_token,
    }, {
        noti_token: 0,
    }).populate('delivery_addresses')
};

exports.signUpCustomer = (req) => {
    return custModel.findOne({
        email: req.body.email,
    }).then(data => {
        if (data) {
            return {
                message: "User exist already.",
            }
        } else {
            return custModel.create(req.body).then(add_user => {
                return custModel.findById(add_user._id)
                    .populate('delivery_addresses');
            });
        }
    })
};

exports.updateProfile = (req) => {
    return custModel.find({
        email: req.body.email
    }).then(users => {
        if (users.length > 1) {
            return {
                message: "This email exist already."
            }
        } else if (users.length == 1 && users[0]._id == req.body.cust_id) {

        }
        return custModel.findOneAndUpdate({
            _id: req.body.cust_id
        }, req.body, {
            new: true,
        }).populate('delivery_addresses')
    })
}

exports.deleteAccount = (req) => {
    return custModel.findById(req.body.user_id).then(user => {
        if (common.validPassword(req.body.password, user.password)){
            return custModel.findOneAndUpdate({
                _id: req.body.user_id,
            }, {
                user_status: appConfig.userStatus.DELETED
            })
        }else{
            return {
                message: 'Incorrect password.',
            }
        }
    })
}

exports.deleteAccountByAdmin = (req) => {
    return custModel.findOneAndUpdate({
        _id: req.body.cust_id,
    }, {
        user_status: appConfig.userStatus.DELETED
    })
}

exports.addDeliveryAddress = (req) => {
    return custModel.findById(req.body.cust_id)
        .populate('delivery_addresses')
        .then(user => {
            for (var i = 0; i < user.delivery_addresses.length; i++) {
                if (user.delivery_addresses[i].address_name.toLowerCase() == req.body.address.address_name.toLowerCase()) {
                    return {
                        message: 'Address name exist already.',
                    }
                }
            }
            return delAddrCtr.add(req).then(address => {
                req.body.delivery_address = address._id;
                return custModel.findOneAndUpdate({
                    _id: req.body.cust_id,
                }, {
                    $push: {
                        delivery_addresses: req.body.delivery_address,
                    },
                }, {
                    new: true,
                }).populate('delivery_addresses')
            });
        });
}

exports.removeDeliveryAddress = (req) => {
    return delAddrCtr.remove(req).then(flag => {
        return custModel.findOneAndUpdate({
            _id: req.body.cust_id,
        }, {
            $pull: {
                delivery_addresses: req.body.address_id,
            },
        }, {
            new: true,
        }).populate('delivery_addresses');
    })
}

exports.updateDeliveryAddress = (req) => {
    return custModel.findById(req.body.cust_id)
        .populate('delivery_addresses')
        .then(user => {
            for (var i = 0; i < user.delivery_addresses.length; i++) {
                if (user.delivery_addresses[i].address_name.toLowerCase() == req.body.address.address_name.toLowerCase()) {
                    if (user.delivery_addresses[i]._id != req.body.address._id) {
                        return {
                            message: 'Address name exist already.',
                        }
                    }
                }
            }
            return delAddrCtr.update(req);
        });
}

exports.changePassword = (req) => {
    return custModel.findOneAndUpdate({
        _id: req.body.user_id
    }, {
        password: req.body.new_password
    }, {
        new: true,
    });
}

exports.getAll = (req) => {
    return custModel.find({}).populate('delivery_addresses');
}
