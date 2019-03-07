var autoCountModel = require('../../models/autocount');
exports.getNextCount = function (field_name) {
    return autoCountModel.findOneAndUpdate({
        field_name: field_name
    }, {
        $inc: {
            count: 1
        }
    }, {
        new: true,
        upsert: true
    });
}

