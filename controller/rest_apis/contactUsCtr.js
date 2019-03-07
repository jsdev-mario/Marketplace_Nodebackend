var contactUsModel = require('../../models/contactus');

exports.add = (req) => {
    req.body.created_date = new Date();
    return contactUsModel.create(req.body);
}

