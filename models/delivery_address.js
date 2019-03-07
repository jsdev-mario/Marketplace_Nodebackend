var mongoose = require('mongoose');
var common = require('../common');

var deliveryAddressSchema = new mongoose.Schema({
    address_name: {
        type: String,
        required: true,
    },
    post_code: {
        type: String,
        required: true,
    },
    address_line1: {
        type: String,
        required: true,
    },
    address_line2: {
        type: String,
    },
    city: {
        type: String,
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
}, {
    versionKey: false,
    timestamps: true,
});

deliveryAddressSchema.pre('save', function(next) {
    this.post_code = this.post_code.toUpperCase();
    this.address_name = common.filterName(this.address_name);
    if (this.address_line1){
        this.address_line1 = common.filterAddress(this.address_line1);
    }
    if (this.address_line2){
        this.address_line2 = common.filterAddress(this.address_line2);
    }
    if (this.city){
        this.city = common.filterAddress(this.city);
    }
    next();
});

deliveryAddressSchema.pre('findOneAndUpdate', function(next) {
    this._update.post_code = this._update.post_code.toUpperCase();
    this._update.address_name = common.filterName(this._update.address_name);
    if (this._update.address_line1){
        this._update.address_line1 = common.filterAddress(this._update.address_line1);
    }
    if (this._update.address_line2){
        this._update.address_line2 = common.filterAddress(this._update.address_line2);
    }
    if (this._update.city){
        this._update.city = common.filterAddress(this._update.city);
    }
    next();
});

module.exports = mongoose.model("delivery_address", deliveryAddressSchema);