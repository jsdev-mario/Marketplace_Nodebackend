var mongoose = require('mongoose');

var contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    },
    created_date:{
        type: Date,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("contactus", contactUsSchema);