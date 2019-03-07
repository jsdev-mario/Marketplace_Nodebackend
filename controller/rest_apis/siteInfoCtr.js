var siteInfoModel = require('../../models/site_info');
var moment = require('moment');
var mongoose = require('mongoose');
var appConfig = require('../../config');

exports.updateSiteName = (req) =>{
    return siteInfoModel.findOneAndUpdate({
        _id: req.body.siteinfo_id
    },{
        site_name: req.body.site_name
    },{
        new: true,
        upsert: true,
    })
};

exports.updateBgImage = (req) =>{
    return siteInfoModel.findOneAndUpdate({
        _id: req.body.siteinfo_id
    },{
        bg_image: req.body.bg_image
    },{
        new: true,
        upsert: true,
    })
};

exports.updateLog = (req) => {
    return siteInfoModel.findOneAndUpdate({
        _id: req.body.siteinfo_id
    },{
        logo: req.body.logo
    },{
        new: true,
        upsert: true,
    })
};

exports.updateIcon = (req) => {
    return siteInfoModel.findOneAndUpdate({
        _id: req.body.siteinfo_id
    },{
        icon: req.body.icon
    },{
        new: true,
        upsert: true,
    })
};

exports.updateProofTypes = (req) => {
    return siteInfoModel.findOneAndUpdate({
        _id: req.body.siteinfo_id
    },{
        proof_id_types: req.body.proof_id_types,
        proof_ownership_types: req.body.proof_ownership_types,
    },{
        new: true,
        upsert: true,
    })
};


exports.updateMeatTypes = (req) => {
    return siteInfoModel.findOneAndUpdate({
        _id: req.body.siteinfo_id
    },{
        meat_types: req.body.meat_types
    },{
        new: true,
        upsert: true,
    })
};

exports.updatePaymentSettings = (req) => {
    return siteInfoModel.findOneAndUpdate({
        _id: req.body.siteinfo_id
    },{
        payment_settings: req.body.payment_settings
    },{
        new: true,
        upsert: true,
    })
};

exports.get = () => {
    return siteInfoModel.findOne({
    })
};