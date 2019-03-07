var mongoose = require('mongoose');
var bcrpt = require('bcrypt-nodejs');
var common = require('../common');

var adminSchema = new mongoose.Schema({
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
        default: 2
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

    password: {
        type: String,
        required: true,
    },
    noti_token: {
        type: String,
    },
    address_line1: {
        type: String,
    },
    address_line2: {
        type: String,
    },
    town_city: {
        type: String,
    },
    post_code: {
        type: String,
    },
    msg_email: {
        type: String,
    },
    fax: {
        type: String,
    },
    timings: {
        type: String,
    }
}, {
    versionKey: false,
    timestamps: true,
});

adminSchema.pre('save', function(next) {
    if(this.first_name){
        this.first_name = common.filterName(this.first_name);
    }
    if (this.last_name){
        this.last_name = common.filterName(this.last_name);
    }
    next();
});

adminSchema.pre('findOneAndUpdate', function(next){
    if(this._update.first_name){
        this._update.first_name = common.filterName(this._update.first_name);
    }
    if (this._update.last_name){
        this._update.last_name = common.filterName(this._update.last_name);
    }
    next();
});

module.exports = mongoose.model("admin", adminSchema);