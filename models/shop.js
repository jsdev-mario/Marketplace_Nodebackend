var mongoose = require('mongoose');
var common = require('../common')

var shopSchema = new mongoose.Schema({
    shop_name: {
        type: String,
        required: true,
    },
    shop_type: {
        type: Number,
        default: 0,
    },
    meat_types: [{
        type: String,
        required: true,
    }],
    shop_phone: {
        type: String,
    },
    shop_type: {
        type: String,
    },
    shop_introduction:{
        type: String,
    },
    proof_id_files:[{
        type: {
            type: String,
            required: true,
        },
        file:{
            type: String,
            required: true,
        }
    }],
    proof_ownership_files:[{
        type: {
            type: String,
            required: true,
        },
        file:{
            type: String,
            required: true,
        }
    }],
    other_info:{
        type: String,
    },
    shop_logo:{
        type: String,
    },
    address_line1:{
        type: String,
    },
    address_line2:{
        type: String,
    },
    town_city: {
        type: String,
    },
    post_code: {
        type: String,
        required: true,
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        }
    },
    //*** business setting  */
    rate: {
        type: Number,
        required: true,
        default: 0.0,
    },
    rate_num: {
        type: Number,
        required: true,
        default: 0,
    },
    review_num: {
        type: Number,
        required: true,
        default: 0,
    },
    min_delivery_price: {
        type: Number,
        default: 10,
    },
    min_collection_price: {
        type: Number,
        default: 0,
    },
    delivery_time: {
        type: Number,
        default: 20,
    },
    collection_time: {
        type: Number,
        default: 20,
    },
    delivery_fee:{
        type: Number,
        default: 0,
    },
    delivery_radius: {
        type: Number,
        default: 3.0,
    },

    day_settings: [{
        open: {
            type: Boolean,
            default: true,
        },
        has_delivery: {
            type: Boolean,
            default: false
        },
        opening_time: {
            type: Date,
        },
        closing_time: {
            type: Date,
        },
        start_time: {
            type: Date,
        },
        end_time: {
            type: Date,
        },
    }],

    status:{
        type: Number,
        required: true,
        default: 0
    },
    shop_menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop_menu'
    },
}, {
    versionKey: false,
    timestamps: true,
});

shopSchema.pre('save', function(next) {
    if(this.shop_name){
        this.shop_name = common.filterName(this.shop_name);
    }
    if (this.address_line1){
        this.address_line1 = common.filterAddress(this.address_line1);
    }
    if (this.address_line2){
        this.address_line2 = common.filterAddress(this.address_line2);
    }
    if(this.town_city){
        this.town_city = common.filterAddress(this.town_city);
    }
    if (this.post_code){
        this.post_code = this.post_code.toUpperCase();
    }
    next();
});

shopSchema.pre('findOneAndUpdate', function(next) {
    if(this._update.shop_name){
        this._update.shop_name = common.filterName(this._update.shop_name);
    }
    if (this._update.address_line1){
        this._update.address_line1 = common.filterAddress(this._update.address_line1);
    }
    if (this._update.address_line2){
        this._update.address_line2 = common.filterAddress(this._update.address_line2);
    }
    if(this._update.town_city){
        this._update.town_city = common.filterAddress(this._update.town_city);
    }
    if (this._update.post_code){
        this._update.post_code = this._update.post_code.toUpperCase();
    }
    next();
});

module.exports = mongoose.model("shop", shopSchema);
