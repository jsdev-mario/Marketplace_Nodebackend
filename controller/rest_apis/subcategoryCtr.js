var subcatModel = require('../../models/subcategory');
var moment = require('moment');
var mongoose = require('mongoose');
var appConfig = require('../../config');

exports.add = (req) => {
    return subcatModel.findOne({
        category_id: req.body.subcategory.category_id,
        name: req.body.subcategory.name,
    }).then(subcategory => {
        if (subcategory){
            return {
                message: "This subcategory exist already."
            }
        }else{
            return subcatModel.create(req.body.subcategory);
        }
    })
}

exports.update = (req) => {
    return subcatModel.findOne({
        category_id: req.body.subcategory.category_id,
        name: req.body.subcategory.name,
    }).then(subcategory => {
        if (!subcategory || subcategory._id == req.body.subcategory._id){
            return subcatModel.findOneAndUpdate({
                _id: req.body.subcategory._id
            }, req.body.subcategory ,{
                new: true,
            })      
        }else{
            return {
                message: "This subcategory exist already."
            }
        }
    })
}

exports.get = (req) =>{
    return subcatModel.find({
        category_id: req.body.category_id
    });
}

exports.remove = (req) =>{
    return subcatModel.findOne({ _id: req.body.subcategory_id}).then(subcat => {
        if (subcat) {
            return subcat.remove();
        }
    });
}


