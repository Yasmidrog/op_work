const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'),
    passport = require('passport');

const index = require('./server/routes/index');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(require('cors')());
app.use(cookieParser());
const dbConfig = require('../db.js');
const mongoose = require('mongoose');
mongoose.connect(dbConfig.url);
const User = require("./server/models/User");
app.use('/static', express.static(__dirname+'/../build/static'));
User.find({}).remove().exec(function (e) {
    if (e) console.log(e);
    User.create({
        password: process.env.PASS,
        username: process.env.USER//как образец
    }, function (e) {
        if (e) console.log(e);
    })
});
session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
    key: 'express.sid',
    secret: 'supernova', saveUninitialized: true, resave: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());
require("./server/init_auth")(passport);
app.use('/', index);

module.exports = app;