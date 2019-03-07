var mongoose = require('mongoose');
var common = require('../common')

var choiceSchema = new mongoose.Schema({
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    choice_num: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        require: true,
    }
}, {
    versionKey: false,
    timestamps: true,
});

choiceSchema.pre('save', function(next) {
    if(this.name){
        this.name = common.filterName(this.name);
    }
    next();
});

choiceSchema.pre('findOneAndUpdate', function(next){
    if(this._update.name){
        this._update.name = common.filterName(this._update.name);
    }
    next();
});

module.exports = mongoose.model("choice", choiceSchema);