var mongoose = require('mongoose');
var bcrpt = require('bcrypt-nodejs');
var common = require('../common');

var butcherSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    title:{
        type: Number,
        default: 0,
    },
    gender: {
        type: Boolean,
        default: true,
    }, 
    birthday:{
        type: String,
    },
    photo: {
        type: String,
    },
    
    email:{
        type: String,
        required: true,
    },
    mobile_phone:{
        type: String,
    },
    user_type:{
        type: Number,
        required: true,
        default: 0,
    },
    user_role:{
        type: Number,
        required: true,
        default: 0
    },
    user_status:{
        type: Number,
        default: 0,
    },
    is_visible: {
        type: Boolean,
        required: true,
        default: false,
    },
    is_doc_verified: {
        type: Boolean,
    },
    is_paid_fee: {
        type: Boolean,
    },
    account_histories: [{
        user_status: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
            required: true,
        },
        is_visible: {
            type: Boolean,
        },
        is_doc_verified: {
            type: Boolean,
        },
        is_paid_fee: {
            type: Boolean,
        }
    }],
    bank_account: {
        account_name: {
            type: String,
            required: true,
        },
        address_line1: {
            type: String,
            required: true,
        },
        address_line2: {
            type: String,
            required: true,
        },
        postcode: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        bank_name: {
            type: String,
            required: true,
        },
        sort_code: {
            type: String,
            required: true,
        },
        account_num: {
            type: String,
            requried: true,
        }
    },
     cards: [{
        card_type: {
            type: String,
            required: true,
        },
        card_name: {
            type: String,
            required: true,
        },
        card_num: {
            type: String,
            requried: true,
        },
        expiry_date: {
            type: String,
            requried: true,
        },
        security_code: {
            type: String,
            requried: true,
        },
        billing_address: {
            address_line1: {
                type: String,
                required: true,
            },
            address_line2: {
                type: String,
            },
            city: {
                type: String,
                required: true
            },
            postcode: {
                type: String,
                required: true,
            },
        }
    }],
    def_card_num: {
        type: Number,
    },
    is_social: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    shop:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    noti_token: {
        type: String,
    },
    last_order_date:{
        type: Date,
    },
    join_date:{
        type: Date,
    }
}, {
    versionKey: false,
    timestamps: true,
});

butcherSchema.pre('save', function(next) {
    if(this.first_name){
        this.first_name = common.filterName(this.first_name);
    }
    if (this.last_name){
        this.last_name = common.filterName(this.last_name);
    }
    next();
});

butcherSchema.pre('findOneAndUpdate', function(next){
    if(this._update.first_name){
        this._update.first_name = common.filterName(this._update.first_name);
    }
    if (this._update.last_name){
        this._update.last_name = common.filterName(this._update.last_name);
    }
    next();
});

module.exports = mongoose.model("butcher", butcherSchema);