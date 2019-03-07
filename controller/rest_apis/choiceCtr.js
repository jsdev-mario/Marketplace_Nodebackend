var choiceModel = require('../../models/choice');
var moment = require('moment');
var mongoose = require('mongoose');
var appConfig = require('../../config');

exports.add = (req) => {
    return choiceModel.findOne({
        subcategory_id: req.body.choice.subcategory_id,
        choice_num: req.body.choice.choice_num,
        name: req.body.choice.name,
    }).then(choice => {
        if (choice){
            return {
                message: "This order choice exist already."
            }
        }else{
            return choiceModel.create(req.body.choice);
        }
    })
}

exports.update = (req) => {
    return choiceModel.findOne({
        subcategory_id: req.body.choice.subcategory_id,
        choice_num: req.body.choice.choice_num,
        name: req.body.choice.name,
    }).then(choice => {
        if (!choice || choice._id == req.body.choice._id){
            return choiceModel.findOneAndUpdate({
                _id: req.body.choice._id
            }, req.body.choice ,{
                new: true,
            })      
        }else{
            return {
                message: "This order choice exist already."
            }
        }
    })
}

exports.get = (req) =>{
    return choiceModel.find({
        subcategory_id: req.body.subcategory_id
    });
}

exports.remove = (req) =>{
    return choiceModel.findOneAndRemove({
        _id: req.body.choice_id
    });
}



