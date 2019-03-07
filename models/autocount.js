var mongoose = require('mongoose');
var countSchema = new mongoose.Schema({
    field_name: {
        type: String,
        require: true,
    },
    count: {
        type: Number,
        require: true,
        default: 0,
    }
}, {
    versionKey: false,
})

module.exports = mongoose.model('counter', countSchema);