var mongoose = require('mongoose');

var blogMenu = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        required: true,
    },
    modified_date: {
        type: Date,
        required: true,
    },
    marker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    modifier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    comments: [{
        content:{
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        created_date: {
            type: Date,
            required: true,
        },
    }],
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("blog", blogMenu);