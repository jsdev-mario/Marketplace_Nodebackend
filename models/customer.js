var mongoose = require('mongoose');
var common = require('../common');


var customerSchema = new mongoose.Schema({
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
    email_news: {
        type: Boolean,
        required: true,
        default: true,
    },
    order_sms: {
        type: Boolean,
        required: true,
        default: true,
    },
    user_type:{
        type: Number,
        required: true,
        default: 0
    },
    user_role:{
        type: Number,
        required: true,
        default: 0,
    },
    user_status:{
        type: Number,
        default: 0,
    },
    is_social: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    noti_token: {
        type: String,
    },
    delivery_addresses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'delivery_address'
    }],
    last_order_date:{
        type: Date,
    }
}, {
    versionKey: false,
    timestamps: true,
});

customerSchema.pre('save', function(next) {
    if(this.first_name){
        this.first_name = common.filterName(this.first_name);
    }
    if (this.last_name){
        this.last_name = common.filterName(this.last_name);
    }
    next();
});

customerSchema.pre('findOneAndUpdate', function(next){
    if(this._update.first_name){
        this._update.first_name = common.filterName(this._update.first_name);
    }
    if (this._update.last_name){
        this._update.last_name = common.filterName(this._update.last_name);
    }
    next();
});

module.exports = mongoose.model("customer", customerSchema);