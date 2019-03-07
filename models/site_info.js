var mongoose = require('mongoose');
var appConfig = require('../config')
var siteInfoSchema = new mongoose.Schema({
    site_name: {
        type: String,
        required: true,
        default: appConfig.SITE_NAME,
    },
    bg_image:{
        type: String,
        required: true,
    },
    logo:{
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    proof_id_types:[{
        type: String,
    }],
    proof_ownership_types: [{
        type: String,
    }],
    meat_types: [{
        type: String,
    }],
    payment_settings:{
        jf_effective_date:{
            type: Date,
            required: true,
        },
        join_fees: {
            type: Number,
            required: true,
            default: 0.5,
        },
        join_fees_details: {
            type: String,
        },
        commission: {
            type: Number,
            required: true,
            default: 5.0,
        },
        charge_effective_date: {
            type: Date,
            required: true
        },
        cash_charge: {
            type: Number,
            default: 0.5
        },
        card_charge: {
            type: Number,
            required: true,
            default: 0.5,
        },
        has_cash: {
            type: Boolean,
            required: true,
            default: true,
        }
    },
    rate: {
        type: Number,
        required: true,
        default: 0
    },
    rate_num: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("site_info", siteInfoSchema);