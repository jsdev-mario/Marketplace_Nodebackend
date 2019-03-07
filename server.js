var express = require('express');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var config = require('./config');
var mongoose = require('mongoose');
var anpapi = require('./routes/rest_apis/anpdb')
var estadoapi = require('./routes/rest_apis/estado')
var cylinderapi = require('./routes/rest_apis/cylinder')
var common = require('./common')
mongoose.Promise = global.Promise;
mongoose.connect(config.dbURL, { useMongoClient: true });

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); //cross origin resource sharing
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.use('/apis/admin/cylinder', cylinderapi);
app.use(common.checkToken);
app.use('/apis/admin/anpdb', anpapi);
app.use('/apis/admin/estado', estadoapi);

app.listen(config.ADMIN_PORT, function(err, req, res) {
    console.log("Admin app started.")
})