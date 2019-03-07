var express = require('express');
var appConfig = require('../../config');
var nodeGeocoder = require('node-geocoder');
var butModel = require('../../models/butcher')
var shopMenuModel = require('../../models/shop_menu')
var common = require('../../common');
var express_validate = require('express-joi-validator');
var validation = require('./validation');
var moment = require('moment');
var axios = require('axios');
var nodeGeocoder = require('node-geocoder');
var router = express.Router();

var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: appConfig.GOOGLE_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};


/**
 * search butchers
 */

router.post('/butchers', (req, res, next) => {
    butModel.find({
        user_status: appConfig.userStatus.ACTIVE
    }).populate({
        path: 'shop',
        model: 'shop',
        populate: {
            path: 'shop_menu',
            model: 'shop_menu',
            select: 'categories',
            populate: {
                path: 'categories',
                model: 'category'
            }
        }
    }).then(butchers => {
        var result = [];
        butchers.forEach(butcher => {
            if (butcher.user_status == appConfig.userStatus.ACTIVE || butcher.is_visible) {
                result.push(butcher);
            }
        })
        res.status(200).json({
            data: result,
        })
    }).catch(error => {
        res.status(500).json({
            message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
        })
    })
});

router.post('/shop_menu', (req, res, next) => {
    shopMenuModel.findOne({
            _id: req.body.shopmenu_id
        }).populate('categories')
        .populate('subcategories.subcategory')
        .populate('choices.choice').then(shop_men => {
            res.status(200).json({
                data: shop_men
            });
        }).catch(error => {
            res.status(500).json({
                message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
            })
        })
});



/**
 * nearest address search
 */
router.post('/nearest_addresses', express_validate(validation.location_nearest_addresses), (req, res, next) => {
    axios.get('http://api.postcodes.io/postcodes/' + req.body.post_code)
        .then(response => {
            if (response && response.data && response.data.status == 200 && response.data.result) {
                axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + response.data.result.latitude + ',' + response.data.result.longitude +
                    '&radius=100&key=' + appConfig.GOOGLE_KEY).then(data => {
                    res.status(200).json({
                        data: data.data.results,
                        default_location: {
                            latitude: response.data.result.latitude,
                            longitude: response.data.result.longitude,
                        }
                    })
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({
                        message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
                    })
                })
            } else {
                res.status(300).json({
                    message: "Invalid Post Code.",
                })
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
            })
        });
});

/**
 * get location with address
 */
router.post('/getlocation', express_validate(validation.get_location), (req, res, next) => {
    axios.get('http://api.postcodes.io/postcodes/' + req.body.post_code)
        .then(response => {
            if (response && response.data && response.data.status == 200 && response.data.result) {
                var address = req.body.address_line1;
                if (req.body.address_line2) {
                    address += ', ' + req.body.address_line2;
                }
                if (req.body.city) {
                    address += ', ' + req.body.city;
                }
                address += ' ' + req.body.post_code + ', UK';
                console.log('address', address);
                var geocoder = nodeGeocoder(options);
                return geocoder.geocode({
                    address: address,
                    country: 'UK',
                    zipcode: req.body.post_code
                }).then(data => {
                    if (data.length > 0) {
                        res.status(200).json({
                            data: {
                                latitude: data[0].latitude,
                                longitude: data[0].longitude,
                            }
                        })
                    } else {
                        res.status(300).json({
                            message: 'Invalid address'
                        })
                    }
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({
                        message: appConfig.env == "DEV" ? error.message : appConfig.message.COMMON_MSG1003,
                    })
                })
            } else {
                res.status(300).json({
                    message: "Invalid Postcode.",
                })
            }
        }).catch(error => {
            console.log(error);
            res.status(300).json({
                message: "Invalid Postcode"
            })
        });
});

router.use((err, req, res, next) => {
    if (err) {
        console.log(err);
        res.status(404).json({
            message: appConfig.env == "DEV" ? err.message : appConfig.message.COMMON_MSG1004,
        })
        return;
    }
});

module.exports = router