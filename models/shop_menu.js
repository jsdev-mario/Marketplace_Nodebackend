var mongoose = require('mongoose');

var shopMenuSchema = new mongoose.Schema({
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    }],
    subcategories: [{
        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "sub_category",
        },
        description: {
            type: String,
        },
        qty: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        unit: {
            type: Number,
            required: true,
            default: 0
        },
        is_available:{
            type: Boolean,
            required: true,
            default: true,
        },
        offer: {
            qty: {
                type: Number,
            },
            price: {
                type: Number,
            },
        }
    }],
    choices: [{
        choice: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "choice",
        },
        price: {
            type: Number
        }
    }],
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("shop_menu", shopMenuSchema);