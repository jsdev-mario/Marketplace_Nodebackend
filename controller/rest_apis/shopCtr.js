var shopModel = require('../../models/shop');
var moment = require('moment');
var mongoose = require('mongoose');
var appConfig = require('../../config');

exports.update = (req) => {
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

exports.deleteProofOfId = (req) => {
    console.log(req.body.proof_id);
    return shopModel.findOneAndUpdate({
        _id: req.body.shop_id
    }, {
        $pull: {
            proof_id_files: {
                _id: req.body.proof_id
            }
        }
    }, {
        new: true
    });
}

exports.addProofOfId = (req) => {
    return shopModel.findOneAndUpdate({
        _id: req.body.shop_id
    }, {
        $push: {
            proof_id_files: {
                type: req.body.proof_data.type,
                file: req.body.proof_data.file
            }
        }
    }, {
        new: true
    });
}

exports.deleteOwnership = (req) => {
    return shopModel.findOneAndUpdate({
        _id: req.body.shop_id
    }, {
        $pull: {
            proof_ownership_files: {
                _id: req.body.ownership_id
            }
        }
    }, {
        new: true
    });
}

exports.addOwnership = (req) => {
    return shopModel.findOneAndUpdate({
        _id: req.body.shop_id
    }, {
        $push: {
            proof_ownership_files: {
                type: req.body.ownership_data.type,
                file: req.body.ownership_data.file
            }
        }
    }, {
        new: true
    });
}


exports.shopMenuUpdate = (req) => {
    return shopModel.findOneAndUpdate({
        _id: req.body.shop_id
    }, {
        shop_menu: req.body.shop_menu
    }, {
        new: true,
    });
}

