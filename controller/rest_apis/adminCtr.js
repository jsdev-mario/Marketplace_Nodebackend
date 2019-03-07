var adminModel = require('../../models/admin');
var moment = require('moment');
var custModel = require('../../models/customer')
var butModel = require('../../models/butcher')
var shopModel = require('../../models/shop')

var appConfig = require('../../config');

exports.getLoginUser = (req) => {
    return adminModel.findOneAndUpdate({
        email: req.body.email,
    }, {
        noti_token: req.body.noti_token,
    }, {
        noti_token: 0,
    })
};

exports.signUp = (req) => {
    return adminModel.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return {
                message: "User exist already."
            }
        } else {
            return adminModel.create(req.body);
        }
    });
};

exports.updateProfile = (req) => {
    return adminModel.findOneAndUpdate({
            _id: req.body.user_id
        }, req.body, {
            new: true,
        });
}

// exports.changePassword = (req) => {
//     return adminModel.findOneAndUpdate({
//         _id: req.body.user_id
//     }, {
//         password: req.body.new_password
//     }, {
//         new: true,
//     });
// }


exports.butcherAccept = (req) => {
    return butModel.findOneAndUpdate({
        _id: req.body.but_id
    }, {
        user_status: appConfig.userStatus.ACTIVE,
        is_doc_verified: req.body.is_doc_verified,
        is_paid_fee: req.body.is_paid_fee,
        is_visible: true,
        $push: {
            account_histories: {
                user_status: appConfig.userStatus.ACTIVE,
                is_doc_verified: req.body.is_doc_verified,
                is_paid_fee: req.body.is_paid_fee,
                is_visible: true,
                note: req.body.note,
            }
        }
    }, {
        new: true,
    }).populate('shop');
}

exports.butcherDecline = (req) => {
    return butModel.findOneAndUpdate({
        _id: req.body.but_id
    }, {
        user_status: appConfig.userStatus.DECLINED,
        $push: {
            account_histories: {
                user_status: appConfig.userStatus.DECLINED,
                note: req.body.note,
            }
        }
    }, {
        new: true,
    }).populate('shop');
}

exports.butcherActive = (req) => {
    return butModel.findOneAndUpdate({
        _id: req.body.but_id
    }, {
        user_status: appConfig.userStatus.ACTIVE,
        is_visible: true,
        $push: {
            account_histories: {
                user_status: appConfig.userStatus.ACTIVE,
                note: req.body.note,
            }
        }
    }, {
        new: true,
    }).populate('shop');
}

exports.butcherDeactivate = (req) => {
    return butModel.findOneAndUpdate({
        _id: req.body.but_id
    }, {
        user_status: appConfig.userStatus.INACTIVE,
        is_visible: req.body.is_visible,
        $push: {
            account_histories: {
                user_status: appConfig.userStatus.INACTIVE,
                is_visible: req.body.is_visible,
                note: req.body.note,
            }
        }
    }, {
        new: true,
    }).populate('shop');
}

exports.butcherBankAccountUpdate = (req) => {
    console.log('bank_account', req.body.bank_account);
    return butModel.findOneAndUpdate({
        _id: req.body.but_id
    }, {
        bank_account: req.body.bank_account
    }, {
        new: true,
    }).populate('shop');
}

exports.butcherCardAdd = (req) => {
    let add_item = {
        $push: {
            cards: req.body.card
        },
    };
    if (req.body.def_card_num != undefined){
        add_item.def_card_num = req.body.def_card_num
    }
    return butModel.findOneAndUpdate({
        _id: req.body.but_id
    }, add_item, {
        new: true,
    }).populate('shop');
}

exports.butcherCardDelete = (req) => {
    return butModel.findOneAndUpdate({
        _id: req.body.but_id
    }, {
        $pull: {
            cards: {
                _id: req.body.card_id
            }
        }
    }, {
        new: true,
    }).populate('shop');
}

exports.butcherDefCardSet = (req) => {
    return butModel.findOneAndUpdate({
        _id: req.body.but_id
    }, {
        def_card_num: req.body.def_card_num
    }, {
        new: true,
    }).populate('shop');
}

exports.updateButProfile = (req) => {
    return butModel.findOneAndUpdate({
        _id: req.body.but_id
    }, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        title: req.body.title,
    }, {
        new: true,
    }).populate('shop')
}

exports.updateShop = (req) => {
    return shopModel.findOneAndUpdate({
        _id: req.body.shop_id
    }, req.body, {
        new: true,
    }).then(data => {
        if (req.body.shop_logo){
            return data;
        }else{
            return shopModel.findOneAndUpdate({
                _id: req.body.shop_id
            }, {
                $unset: {shop_logo:1}
            });
        }
    });
}