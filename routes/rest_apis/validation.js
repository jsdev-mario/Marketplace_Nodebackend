var Joi = require('joi');
var appConfig = require('../../config');


/**
 * user validate properties
 */

exports.customer_signin = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        recaptcha_key: Joi.string(),
        noti_token: Joi.string(),
        remember: Joi.boolean(),
    }
}

exports.customer_signup = {
    body: {
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        post_code: Joi.string(),
        address_line1: Joi.string(),
        location: Joi.object().keys({
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
        }),
    }
}

exports.customersocial_signup = {
    body: {
        email: Joi.string().required().email(),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
    }
}

exports.customer_update_profile = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        cust_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        first_name: Joi.string().required(),
        last_name: Joi.string(),
        title: Joi.number(),
        birthday: Joi.string(),
        order_sms: Joi.boolean(),
        email_news: Joi.boolean(),
        gender: Joi.boolean(),
        mobile_phone: Joi.string().required(),
        email: Joi.string().required()
    }
}

exports.customer_delete_account = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        password: Joi.string().required(),
    }
}

exports.customer_delete_account_byadmin = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        cust_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    }
}

exports.customer_forgotpassword = {
    body: {
        email: Joi.string().email().required(),
    }
}

exports.customer_changepassword = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        new_password: Joi.string().required(),
    }
}

exports.customers_get = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
    }
}

exports.butchers_get = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
    }
}

exports.user_signup_verify = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.INACTIVE),
        email: Joi.string().required().email(),
    }
}

exports.category_add = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        category: {
            name: Joi.string().required(),
        }
    }
}

exports.category_get = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
    }
}

exports.category_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        category: {
            _id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            name: Joi.string().required(),
        }
    }
}

exports.category_remove = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        category_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    }
}

exports.subcategory_add = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        subcategory: {
            category_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            name: Joi.string().required(),
        }
    }
}

exports.subcategory_get = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        category_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    }
}

exports.subcategory_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        subcategory: {
            _id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            category_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            name: Joi.string().required(),
            description: Joi.string().allow(""),
        }
    }
}

exports.subcategory_remove = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        subcategory_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    }
}

exports.choice_add = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        choice: {
            subcategory_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            choice_num: Joi.number().required(),
            name: Joi.string().required(),
        }
    }
}

exports.choice_get = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        subcategory_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    }
}

exports.choice_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        choice: {
            _id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            subcategory_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            choice_num: Joi.number(),
            name: Joi.string().required(),
        }
    }
}

exports.choice_remove = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        choice_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    }
}

exports.order_add = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        order: {
            butcher: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            customer: {
                email: Joi.string().required(),
                title: Joi.number(),
                first_name: Joi.string(),
                last_name: Joi.string(),
                mobile_phone: Joi.string(),
                ref_id: Joi.string().required()
            },
            email_news: Joi.boolean().required(),
            order_sms: Joi.boolean().required(),
            delivery_address: {
                address_name: Joi.string(),
                address_line1: Joi.string(),
                address_line2: Joi.string(),
                city: Joi.string(),
                location: {
                    latitude: Joi.number(),
                    longitude: Joi.number()
                },
                post_code: Joi.string(),
                ref_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            },
            delivery_option: Joi.number().required(),
            delivery_date: Joi.string().required(),
            delivery_date_type: Joi.number().required(),
            note: Joi.string().allow(''),
            order_items: Joi.array().items(Joi.object().keys({
                product: {
                    subcategory: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
                    name: Joi.string().required(),
                    price: Joi.number().required(),
                    qty: Joi.number().required(),
                    unit: Joi.number().required(),
                    description: Joi.string(),
                    offer: Joi.object().keys({
                        price: Joi.number(),
                        qty: Joi.number()
                    }),
                },
                count: Joi.number().required(),
                has_save: Joi.boolean().required(),
                save_price: Joi.number(),
                sub_price: Joi.number().required(),
                choices: Joi.array().items(Joi.object().keys({
                    name: Joi.string().required(),
                    price: Joi.number().required()
                })),
            })),
            payment_method: Joi.number().required(),
            save_price: Joi.number(),
            total_price: Joi.number().required(),
            sub_price: Joi.number().required(),
            delivery_fee: Joi.number().required(),
            service_charge: Joi.number().required(),
        }
    }
}

exports.order_gets = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        st_date: Joi.string(),
        et_date: Joi.string(),
        status: Joi.number(),
        skip: Joi.number(),
        limit: Joi.number(),
    }
}

exports.order_custget = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        cust_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        st_date: Joi.string(),
        et_date: Joi.string(),
        status: Joi.number(),
        skip: Joi.number(),
        limit: Joi.number(),
    }
}

exports.order_butget = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        but_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        st_date: Joi.string(),
        et_date: Joi.string(),
        status: Joi.number(),
        skip: Joi.number(),
        limit: Joi.number(),
    }
}

exports.order_getinfo = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        is_today: Joi.boolean(),
    }
}

exports.order_updatestatus = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        order_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        status: Joi.number().required(),
        note: Joi.string(),
        but_confirm_delivery_time: Joi.number(),
    }
}

exports.order_rating = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        order_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        rates: {
            quality: Joi.number().required(),
            service: Joi.number().required(),
            time: Joi.number().required(),
            fee: Joi.number().required(),
            experience: Joi.number().required()
        }
    }
}

exports.order_refund_request = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        order_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        requser_type: Joi.number().required(),
        amount: Joi.number().required(),
        refund_note: Joi.string().required(),
    }
}

exports.order_saleprice = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        but_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        cust_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        st_date: Joi.string(),
        et_date: Joi.string(),
        status: Joi.number(),
    }
}

exports.order_count = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        but_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        cust_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        st_date: Joi.string(),
        et_date: Joi.string(),
        status: Joi.number(),
    }
}

exports.contactus_add = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        subject: Joi.string().allow(''),
        message: Joi.string().required(),
    }
}

exports.blog_add = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        blog: {
            title: Joi.string().required(),
            content: Joi.string().required(),
            photo: Joi.string().required(),
            marker: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            modifier: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        }
    }
}

exports.blog_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        blog: {
            _id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            title: Joi.string().required(),
            content: Joi.string().required(),
            photo: Joi.string().required(),
            marker: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            modifier: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        }
    }
}

exports.blog_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        blog: {
            _id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            title: Joi.string().required(),
            content: Joi.string().required(),
            photo: Joi.string().required(),
            marker: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            modifier: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        }
    }
}

exports.blog_remove = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        blog_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    }
}

exports.comment_add = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        comment: {
            content: Joi.string().required(),
            user: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        }
    }
}

exports.comment_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        blog_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        comment: {
            _id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            content: Joi.string().required(),
            user: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        }
    }
}

exports.comment_remove = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        blog_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        comment_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    }
}

exports.delivery_address_add = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        cust_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        address: {
            address_name: Joi.string().required(),
            post_code: Joi.string().required(),
            address_line1: Joi.string().required(),
            address_line2: Joi.string(),
            location: Joi.object().keys({
                latitude: Joi.number().required(),
                longitude: Joi.number().required()
            }),
            city: Joi.string(),
        }
    }
}

exports.delivery_address_remove = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        cust_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        address_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    }
}

exports.user_delivery_address_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        cust_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        address: {
            _id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            address_name: Joi.string().required(),
            post_code: Joi.string().required(),
            address_line1: Joi.string().required(),
            address_line2: Joi.string(),
            location: Joi.object().keys({
                latitude: Joi.number().required(),
                longitude: Joi.number().required()
            }),
            city: Joi.string(),
        },
    }
}

exports.location_nearest_addresses = {
    body: {
        post_code: Joi.string().required(),
    }
}

exports.get_location = {
    body: {
        address_line1: Joi.string().required(),
        address_line2: Joi.string().allow(''),
        city: Joi.string().allow(''),
        post_code: Joi.string().required(),
    }
}





/** common */

exports.upload_file = {}

/*** admin */

/**
 * site info
 */

exports.siteinfo_bgimage_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        siteinfo_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        bg_image: Joi.string().required(),
    }
}

exports.siteinfo_sitename_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        siteinfo_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        site_name: Joi.string().required(),
    }
}

exports.siteinfo_logo_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        siteinfo_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        logo: Joi.string().required(),
    }
}

exports.siteinfo_icon_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        siteinfo_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        icon: Joi.string().required(),
    }
}

exports.proof_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        siteinfo_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        proof_id_types: Joi.array().items(Joi.string()),
        proof_ownership_types: Joi.array().items(Joi.string()),
    }
}

exports.meattypes_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        siteinfo_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        meat_types: Joi.array().items(Joi.string()),
    }
}

exports.payment_settings = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        siteinfo_id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        payment_settings: {
            jf_effective_date: Joi.string().required(),
            join_fees: Joi.number().required(),
            join_fees_details: Joi.string().allow(''),
            commission: Joi.number().required(),
            charge_effective_date: Joi.string().required(),
            cash_charge: Joi.number(),
            card_charge: Joi.number().required(),
            has_cash: Joi.boolean().required(),
        }
    }
}

/****** butcher account */

exports.butcher_signin = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        recaptcha_key: Joi.string(),
        noti_token: Joi.string(),
        remember: Joi.boolean(),
    }
}

exports.butcher_signup = {
    body: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        title: Joi.number(),
        gender: Joi.boolean(),
        birthday: Joi.string(),
        email: Joi.string().required().email(),
        mobile_phone: Joi.string().required(),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        password: Joi.string().required(),
        post_code: Joi.string(),
        shop: {
            shop_name: Joi.string().required(),
            address_line1: Joi.string().required(),
            address_line2: Joi.string().allow(''),
            town_city: Joi.string().required(),
            post_code: Joi.string().required(),
            location: {
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
            },
            proof_id_files: Joi.array().items(Joi.object().keys({
                type: Joi.string().required(),
                file: Joi.string().required()
            })),
            proof_ownership_files: Joi.array().items(Joi.object().keys({
                type: Joi.string().required(),
                file: Joi.string().required()
            })),
            other_info: Joi.string().allow(''),
        }
    }
}

exports.shop_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required().valid(appConfig.userStatus.ACTIVE),
        shop_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        min_delivery_price: Joi.number().required(),
        min_collection_price: Joi.number().required(),
        delivery_time: Joi.number().required(),
        collection_time: Joi.number().required(),
        delivery_fee: Joi.number().required(),
        delivery_radius: Joi.number().required(),
        day_settings: Joi.array().items(Joi.object().keys({
            open: Joi.boolean().required(),
            has_delivery: Joi.boolean().required(),
            opening_time: Joi.string().required(),
            closing_time: Joi.string().required(),
            start_time: Joi.string().required(),
            end_time: Joi.string().required(),
            _id: Joi.string(),
        })),
        meat_types: Joi.array().items(Joi.string().required()),
        shop_phone: Joi.string().required(),
        shop_logo: Joi.string(),
        shop_introduction: Joi.string().allow(''),
    }
}

exports.butcher_update_profile = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        title: Joi.number(),
        birthday: Joi.string(),
        gender: Joi.boolean(),
        mobile_phone: Joi.string(),
        email: Joi.string()
    }
}

exports.shop_update_menu = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        shop_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        shop_menu: Joi.string().required(),
    }
}

exports.shop_menu_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        shop_menu: {
            _id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
            categories: Joi.array().items(Joi.string()).required(),
            subcategories: Joi.array().items(Joi.object().keys({
                subcategory: Joi.string().required(),
                description: Joi.string().allow(''),
                qty: Joi.number().required(),
                unit: Joi.number().required(),
                price: Joi.number().required(),
                is_available: Joi.boolean().required(),
                offer: {
                    qty: Joi.number(),
                    price: Joi.number(),
                },
            })),
            choices: Joi.array().items(Joi.object().keys({
                choice: Joi.string().required(),
                price: Joi.number().required(),
            }))
        }
    }
}

exports.shop_delete_proofid = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        shop_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        proof_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    }
}

exports.shop_delete_ownership = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        shop_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        ownership_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    }
}

exports.shop_add_proofid = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        shop_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        proof_data: {
            type: Joi.string().required(),
            file: Joi.string().required(),
        }
    }
}

exports.shop_add_ownership = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        shop_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        ownership_data: {
            type: Joi.string().required(),
            file: Joi.string().required(),
        }
    }
}

exports.butcher_forgotpassword = {
    body: {
        email: Joi.string().email().required(),
    }
}

exports.butcher_changepassword = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        new_password: Joi.string().required(),
    }
}


/***** admin account *****/

exports.admin_signup = {
    body: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
}

/***** admin get customers *****/

exports.admin_signin = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
}

exports.admin_profile_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        address_line1: Joi.string(),
        address_line2: Joi.string(),
        town_city: Joi.string(),
        post_code: Joi.string(),
        msg_email: Joi.string(),
        mobile_phone: Joi.string(),
        fax: Joi.string(),
        timings: Joi.string()
    }
}

exports.admin_butcher_accept = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        but_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        note: Joi.string().required(),
        is_doc_verified: Joi.boolean().required(),
        is_paid_fee: Joi.boolean().required(),
    }
}

exports.admin_butcher_decline = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        but_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        note: Joi.string().required(),
    }
}

exports.admin_butcher_active = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        but_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        note: Joi.string().required(),
    }
}

exports.admin_butcher_deactivate = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        but_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        note: Joi.string().required(),
        is_visible: Joi.boolean().required(),
    }
}

exports.admin_butcher_bankaccount_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        but_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        bank_account: {
            account_name: Joi.string().required(),
            address_line1: Joi.string().required(),
            address_line2: Joi.string().allow(''),
            postcode: Joi.string().required(),
            city: Joi.string().required(),
            bank_name: Joi.string().required(),
            sort_code: Joi.string().required(),
            account_num: Joi.string().required(),
        }
    }
}

exports.admin_butcher_card_add = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        but_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        card: {
            card_type: Joi.string().required(),
            card_name: Joi.string().required(),
            card_num: Joi.string().required(),
            expiry_date: Joi.string().required(),
            security_code: Joi.string().required(),
            billing_address: {
                address_line1: Joi.string().required(),
                address_line2: Joi.string().allow(''),
                city: Joi.string().required(),
                postcode: Joi.string().required(),
            }
        },
        def_card_num: Joi.number()
    }
}

exports.admin_butcher_card_delete = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        but_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        card_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    }
}

exports.admin_butcher_defcard_set = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        but_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        def_card_num: Joi.number().required(),
    }
}

exports.admin_butcher_update_profile = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        but_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        first_name: Joi.string(),
        last_name: Joi.string(),
        title: Joi.number(),
    }
}

exports.admin_shop_update = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required().valid(appConfig.userType.ADMIN),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        shop_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        shop_name: Joi.string().required(),
        address_line1: Joi.string().required(),
        address_line2: Joi.string().allow(''),
        town_city: Joi.string().required(),
        post_code: Joi.string().required(),
        min_delivery_price: Joi.number().required(),
        min_collection_price: Joi.number().required(),
        delivery_time: Joi.number().required(),
        collection_time: Joi.number().required(),
        delivery_fee: Joi.number().required(),
        delivery_radius: Joi.number().required(),
        day_settings: Joi.array().items(Joi.object().keys({
            open: Joi.boolean().required(),
            has_delivery: Joi.boolean().required(),
            opening_time: Joi.string().required(),
            closing_time: Joi.string().required(),
            start_time: Joi.string().required(),
            end_time: Joi.string().required(),
            _id: Joi.string(),
        })),
        meat_types: Joi.array().items(Joi.string().required()),
        shop_phone: Joi.string().required(),
        shop_logo: Joi.string(),
        shop_introduction: Joi.string().allow(''),
    }
}




/*** pament */

exports.payment_client_token = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
    }
}

exports.payment_checkout_paypal = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        nonce: Joi.string().required(),
        amount: Joi.number().required(),
        order_id: Joi.string().required(),
        // custom_fileds: Joi.object({})
    }
}

exports.payment_checkout_creditcard = {
    body: {
        user_id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        user_type: Joi.number().required(),
        user_role: Joi.number().required(),
        user_status: Joi.number().required(),
        nonce: Joi.string().required(),
        amount: Joi.number().required(),
        order_id: Joi.string().required(),
    }
}