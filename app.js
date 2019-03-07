var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var config = require('./config');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

try{
    mongoose.connect(config.dbURL, { useMongoClient: true });
}catch(e){
    console.log(e)
}

var app = express();


//routes
var rest_apis = require('./routes/rest_apis');
var view = require('./routes/view')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'front')));
app.use(cors()); //cross origin resource sharing
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.use('/apis', rest_apis);
app.use('/', view);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;