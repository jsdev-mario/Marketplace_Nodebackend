module.exports = {
    env: "DEV",
    //'env: "PRO",
    secret: 'secret',
    dbURL: 'mongodb://username:password@domain.xxx:port/database',
    SERVER_URL: "protocal://xxxx.xxx", 
    
    PORT: 3000,
    MQTT_CHAT_PORT: 1883,
    MQTT_USER: "mqttusername",
    MQTT_PASS: "mqttpassword",
    FIREBASE_SERVER_TOKEN: "firebase server token",
    
    GOOGLE_KEY: 'google key',

    RECATCHA_SECRET_KEY: 'recapter key',


    DOC_ROOT: "public",
    SITE_NAME: "SITE NAME",
    USERDATA_UPLOAD_URL: "/uploads/userdatas",
    ATTACHFILE_UPLOAD_URL: "/uploads/attachs",
    SITEDATA_UPLOAD_URL: "/uploads/sitedata",
    
    message: {
        TOKEN_MSG_1000: "Failed to authenticate token",
        TOKEN_MSG_1001: "No token provided.",
        TOKEN_MSG_1002: "Invalid token.",
        USER_MSG_1: "Login success.",
        
        USER_MSG_50: "User doesn't exist.",
        USER_MSG_51: "User blocked.",
        
        COMMON_MSG1003: "Server Error.", //1003
        COMMON_MSG1004: "Invalid requst data.",
        COMMON_MSG1005: "Invalid url.",
        NOTIFICATION_TITLE: "SmartGaaS Notification",
        NOTIFICATION_LABEL: "Please check Reminder section.",
    },

    userStatus: {
        DECLINED: -1,
        NEWREQUEST: 0,
        INACTIVE: 1,
        ACTIVE: 2,
        BLOCKED: 3,
        DELETED: 4,
    },

    userType: {
        CUSTOMER: 0,
        BUTCHER: 1,
        ADMIN: 2,
    },

    userRole: {
        customer: {
            CUSTOMER: 0
        },
        butchers: {
            MANAGER: 0,
            DRIVER: 1
        },
        admin: {
            ADMIN: 0,
        }
    },

    userTitle:{
        MR: 0,
        MRS: 1,
        MISS: 2,
        MS: 3
    },

    meatType: {
        SEAFOOD: 0,
        KOSHER: 1,
        HALAL: 2,
        OTHERMEAT: 3,
    },
    
    phoneStatus: {
        DELETED: "DELETED NUMBER",
    },

    emailStatus: {
        DELETED: "DELETED EMAIL",
    },

    paymentMethod: {
        PAYPAL: 0,
        CARD: 1,
        CASH: 2,
    },

    orderStatus: {
        AWAITING_CONFIRMATION: 0,
        CONFIRMED_PREPARING: 1,
        READY_COLLECTION: 2,
        OUT_DELIVERY: 3,
        COLLECTED: 4,
        DELIVERED: 5,
        NOT_COLLECTED: 6,
        NOT_DELIVERY_WRONGADDRESS: 7,
        CANCELLED_BYCUST: 8,
        REJECTED_BYBUT: 9,
        REFUND_REQUEST: 10,
        REFUND_PROCESSED: 11,
    },

    deliveryType:{
        COLLECTION: 0,
        DELIVERY: 1,
    },

    proofType:{
        DRIVING_LISENCE: 0,
        PASSPORT: 1,
    },

    proofOwnerType:{
        BILL: 0,
        LEASE: 1,
        LETTER: 2
    },

    businessType:{
        LIMITED_COMPANY: 0,
        SOLE_TRADER: 1,
    },

    msgContentType: {
        TEXT: 0,
        IMAGE: 1,
        VIDEO: 2
    },

    fileUploadType: {
        USER_DATA: 0,
        SITE_DATA: 1,
        GENERAL_DATA: 2
    },

    adminEmail: 'admin@xxxx.com',
    
    BRAINTREE_MECHANT_ID: "braintree mechant id",
    BRAINTREE_PUBLIC_KEY: "braintree public key",
    BRAINTREE_PRIVATE_KEY: "braintree private key",
}