var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
    },
    butcher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "butcher",
    },
    customer:{
        email: {
            type: String,
            required: true,
        },
        title:{
            type: Number,
        },
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        mobile_phone: {
            type: String,
        },
        ref_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "customer",
        }
    },
    email_news:{
        type: Boolean,
        required: true,
        default: true,
    },
    order_sms: {
        type: Boolean,
        required: true,
        default: true,
    },
    delivery_address: {
        address_name: {
            type: String,
        },
        address_line1: {
            type: String,
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
            },
            longitude: {
                type: Number,
            }
        },
        post_code: {
            type: String,
        },
        ref_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'delivery_address'
        }
    },
    delivery_option:{
        type: Number,
        required: true,
        default: 0,
    },
    delivery_date:{
        type: Date,
        required: true,
    },

    but_confirm_delivery_time: {
        type: Number,
    },

    delivery_date_type: {
        type: Number,
        required: true,
        default: 0,
    },
    note: {
        type: String,
    },
    order_items:[{
        product:{
            subcategory:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'sub_category'
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
            unit: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            offer:{
                price: {
                    type: Number,
                },
                qty: {
                    type: Number,
                }
            },
        },
        count: {
            type: Number,
            required: true,
            default: 1,
        },
        has_save:{
            type: Boolean,
            default: false,
        },
        save_price: {
            type: Number,
        },
        sub_price: {
            type: Number,
            required: true,
        },
        choices:[{
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        }]
    }],
    payment_method: {
        type: Number,
        required: true,
        default: 2,
    },
    save_price: {
        type: Number,
    },
    total_price: {
        type: Number,
        requird: true,
    },
    sub_price: {
        type: Number,
        required: true,
    },
    delivery_fee:{
        type: Number,
        required: true,
    },
    service_charge: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: 0
    },
    history: [{
        status: {
            type: Number,
        },
        date: {
            type: Date,
        },
        note: {
            type: String,
        },
        refund_requser_type: {
            type: Number,
        },
        refund_amount: {
            type: Number,
        }
    }],
    is_checked: {
        butcher: {
            type: Boolean,
            default: false,
        },
        admin: {
            type: Boolean,
            default: false,
        }
    },

    //latest refund info
    refund: {
        requser_type:{
            type: Number,
        },
        amount: {
            type: Number,
        },
        note: {
            type: String,
        },
        reqdate: {
            type: Date,
        }
    },

    rates: {
        quality: {
            type: Number,
            default: 0,
        },
        service: {
            type: Number,
            default: 0,
        },
        time: {
            type: Number,
            default: 0,
        },
        fee: {
            type: Number,
            default: 0,
        },
        experience: {
            type: Number,
            default: 0,
        }
    },
    rated: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("order", orderSchema);