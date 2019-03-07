var mongoose = require('mongoose');
var subCatModal = require('./subcategory');
var common = require('../common');

var catSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    }
}, {
    versionKey: false,
    timestamps: true,
});

catSchema.pre('remove', function(next) {
    subCatModal.find({category_id: this._id}).then(subcats => {
        subcats.forEach(subcat => {
            subcat.remove();
        })
        next();
    }).catch(e => {
        next();
    })
});

catSchema.pre('save', function(next) {
    if(this.name){
        this.name = common.filterName(this.name);
    }
    next();
});

catSchema.pre('findOneAndUpdate', function(next){
    if(this._update.name){
        this._update.name = common.filterName(this._update.name);
    }
    next();
});

module.exports = mongoose.model("category", catSchema);