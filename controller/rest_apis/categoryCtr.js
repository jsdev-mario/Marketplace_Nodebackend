var catModel = require('../../models/category');
var subcatModel = require('../../models/subcategory')
var choiceModel = require('../../models/choice')
var moment = require('moment');
var mongoose = require('mongoose');
var appConfig = require('../../config');

exports.add = (req) => {
    console.log(req.body.category.name);
    console.log(req.body.category.name.length);
    return catModel.findOne({
        name: req.body.category.name
    }).then(category => {
        console.log(category);
        if (category){
            return {
                message: "This category exist already."
            }
        }else{
            return catModel.create(req.body.category);
        }
    })
}

exports.update = (req) => {
    return catModel.findOne({
        name: req.body.category.name
    }).then(category => {
        if(!category || category._id == req.body.category._id){
            return catModel.findOneAndUpdate({
                _id: req.body.category._id
            }, req.body.category ,{
                new: true,
            })  
        }else{
            return {
                message: "This category exist already."
            }   
        }
        
    });
}

exports.get = (req) =>{
    return catModel.find({})
}

exports.remove = (req) => {
    return catModel.findOne({ _id: req.body.category_id}).then(cat => {
        if (cat) {
            return cat.remove();
        }
    });
}




