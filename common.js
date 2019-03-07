var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var appConfig = require('./config');
var mongoose = require('mongoose');

exports.generateToken = function (user, expired_time) {
    var token = jwt.sign({
            user_id: user._id.toString(),
            user_type: user.user_type,
        },
        appConfig.secret, {
            expiresIn: expired_time,
        })
    return token;
}

exports.checkToken = function (req, res, next) {
    var custModel = require('./models/customer');
    var butModel = require('./models/butcher');
    var adminModel = require('./models/admin');
    // check header or url params or post params for token
    var token = req.body.token || req.query.token || req.headers['token'] || req.params.token;
    if (token) {
        jwt.verify(token, appConfig.secret, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: appConfig.message.TOKEN_MSG_1000,
                });
            } else {
                if (decoded.user_id == undefined) {
                    res.status(401).json({
                        message: appConfig.message.TOKEN_MSG_1002,
                    });
                    return;
                }
                req.body.user_id = decoded.user_id;
                req.body.user_type = decoded.user_type;
                var model = custModel;
                if (req.body.user_type == appConfig.userType.CUSTOMER) {
                    model = custModel;
                } else if (req.body.user_type == appConfig.userType.BUTCHER) {
                    model = butModel;
                } else {
                    model = adminModel;
                }
                model.findById(req.body.user_id).then(user => {
                    if (!user) {
                        res.status(401).json({
                            message: appConfig.message.TOKEN_MSG_1002,
                        })
                    } else if (user.user_status === appConfig.userStatus.BLOCKED) {
                        res.status(450).json({
                            message: "Your account was blocked.",
                        })
                    } else {
                        req.body.user_status = user.user_status;
                        req.body.user_role = user.user_role;
                        next();
                    }
                }).catch(error => {
                    res.status(500).json({
                        message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
                    })
                })
            }
        });
    } else {
        res.status(403).json({
            message: appConfig.message.TOKEN_MSG_1001,
        })
    }
}

exports.validateEmail = function (value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}

exports.validatePhone = function (value) {
    var phoneno = /^\+?([0-9]{2})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})[- ]?([0-9]{4})$/;
    return value.match(phoneno);
}

exports.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

exports.validPassword = function (login_pass, db_pass) {
    return bcrypt.compareSync(login_pass, db_pass);
};

exports.isNumber = function (string) {
    return !isNaN(parseFloat(string)) && isFinite(string);
}

exports.filterNumber = function (string) {
    try {
        var number = "";
        console.log(string);
        for (i = 0; i < string.length; i++) {
            if (this.isNumber(string[i])) {
                number += string[i]
            }
        }
        return number;
    } catch (e) {
        return 0;
    }
}

exports.firstLetterCapitalize = function (value) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

exports.filterAddress = function (val) {
    try {
        var value = val
        var numberArrary = value.match(/\d+/g);
        if (numberArrary != null) {
            numberArrary.forEach(number => {
                var temp = "";
                var tempArray = value.split(number);
                tempArray.forEach((addr, index) => {
                    temp += addr.trim() + " ";
                    if (index != tempArray.length - 1) {
                        temp += number + " ";
                    }
                });
                value = temp.trim();
            });
        }
        var temp1 = "";
        value.split(' ').forEach(addr => {
            temp1 += this.firstLetterCapitalize(addr) + " ";
        });
        return temp1.trim();
    } catch (e) {
        console.log(e);
        return val;
    }
}

exports.filterName = function (val) {
    try {
        console.log(val);
        var value = "";
        val.split(' ').forEach(str => {
            value += this.firstLetterCapitalize(str) + " ";
        });
        return value.trim();
    } catch (e) {
        console.log(e);
        return val;
    }
}

exports.convertOrder32ID = function(number) {
    var order_id = number;
    let character = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var result = "";
    while (order_id > 0) {
        result = character.charAt(order_id % 36) + result;
        order_id = Math.floor(order_id / 36);
    }
    result = character[order_id] + result;
    for (i = result.length; i < 5; i++) {
        result = "0" + result;
    }
    return "#" + result;
}