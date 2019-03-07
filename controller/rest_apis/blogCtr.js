var blogMenu = require('../../models/blog');
var moment = require('moment');
var mongoose = require('mongoose');
var appConfig = require('../../config');

exports.add = (req) =>{
    return blogMenu.create(req.body.blog);
}

exports.update = (req) => {
    return blogMenu.findOneAndUpdate({
        _id: req.body.blog._id,
    }, req.body.blog, {
        new: true,
    }).populate('maker')
    .populate('modifier')
    .populate('comments.user')
}

exports.remove = (req) => {
    return blogMenu.findOneAndRemove({
        _id: req.body.blog_id,
    });
}

exports.addComment = (req) => {
    req.body.comment.created_date = new Date()
    return blogMenu.findOneAndUpdate({
        _id: req.body.blog_id,
    }, {
        $push: {
            comments: req.body.comment,
        },
    }, {
        new: true,
    }).populate('maker')
    .populate('modifier')
    .populate('comments.user')
}

exports.updateComment = (req) => {
    return blogMenu.findOneAndUpdate({
        _id: req.body.blog_id,
        'comments._id': req.body.comment._id
    }, {
        $set: {
            "comments.$": req.body.comment,
        },
    }, {
        new: true,
    }).populate('maker')
    .populate('modifier')
    .populate('comments.user')
}

exports.removeComment = (req) => {
    return blogMenu.findOneAndRemove({
        _id: req.body.blog_id,
    }, {
        $pull: {
            comments: {
                $elementMatch: {
                    _id: req.body.comment_id
                }
            }
        }
    });
}

exports.addComment = (req) => {
    return blogMenu.findOneAndUpdate({
        _id: req.body.blog_id,
    }, {
        $push: {
            comments: req.body.comment,
        },
    }, {
        new: true,
    }).populate('maker')
    .populate('modifier')
    .populate('comments.user')
}

exports.get = (req) => {
    return blogMenu.find({
    }).sort({
        created_date: -1,
    }).limit(100)
    .populate('maker')
    .populate('modifier')
    .populate('comments.user');
}
