var express = require('express');
var router = express.Router();
var customer = require('./customer');
var butcher = require('./butcher');
var admin = require('./admin');
var category = require('./category');
var subcategory = require('./subcategory');
var shop = require('./shop');
var choice = require('./choice');
var contactus = require('./contactus');
var blog = require('./blog');
var siteInfo = require('./site_info');
var fileupload = require('./fileupload');
var shop_menu = require('./shop_menu');
var share = require('./share');
var payment = require('./payment');
var order = require('./order');
var sse = require('./sse');
var delivery_address = require('./delivery_address');
var common = require('../../common');
var appConfig = require('../../config');



router.use('/customer', customer);
router.use('/butcher', butcher);
router.use('/admin', admin);
router.use('/site_info', siteInfo);
router.use('/shop_menu', shop_menu);
router.use('/contactus', contactus);
router.use('/blog', blog)
router.use('/share', share)
router.use('/payment', payment);
router.use('/sse', sse);
router.use('/fileupload', fileupload)
router.use(common.checkToken);
router.use('/category', category)
router.use('/subcategory', subcategory)
router.use('/choice', choice)
router.use('/shop', shop)
router.use('/deliveryaddress', delivery_address)
router.use('/order', order);


router.use(function(error, req, res, next) {
    console.log(error);
    res.status(404).json({
        code: 1005,
        // 404 url error.
        message: appConfig.message.COMMON_MSG1005
    })
})

module.exports = router;