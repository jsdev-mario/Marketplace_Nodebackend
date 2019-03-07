var mongoose = require('mongoose');
var choiceModel = require('./choice')
var common = require('../common')

var subCatSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
        default: "",
    }
}, {
    versionKey: false,
    timestamps: true,
});

subCatSchema.pre('remove', function(next) {
    choiceModel.remove({subcategory_id: this._id}).exec();
    next();
});

subCatSchema.pre('save', function(next) {
    if(this.name){
        this.name = common.filterName(this.name);
    }
    next();
});

subCatSchema.pre('findOneAndUpdate', function(next){
    if(this._update.name){
        this._update.name = common.filterName(this._update.name);
    }
    next();
});

module.exports = mongoose.model("sub_category", subCatSchema);