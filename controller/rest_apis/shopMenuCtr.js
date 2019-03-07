
var shopMenu = require('../../models/shop_menu');
var moment = require('moment');
var mongoose = require('mongoose');
var appConfig = require('../../config');

exports.update = (req) =>{
    console.log(req.body.shop_menu._id);
    if (req.body.shop_menu._id){
        return shopMenu.findOneAndUpdate({
            _id: req.body.shop_menu._id
        }, req.body.shop_menu, {
            new: true,
        })
    }else{
        return shopMenu.create(req.body.shop_menu);
    }
};

exports.get = (req) => {
    return shopMenu.findById(req.body.butmenu_id)
    .populate("categories")
    .populate("subcategories.subcategory")
    .populate("choices.choice")
}