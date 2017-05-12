const express = require('express');
const router = express.Router();
const auth = require("./auth");
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/../../../build/index.html'));
});
router.use('/clothes', require("./cloth"));
router.all("/auth", auth, function (req, res, next) {
    res.status(200).json({status:"done"});
});
router.all('/logout', function (req,res,next) {
    req.logout();
    req.session.destroy();
    req.session = null;
    res.status(200).json({status:"done"});
});
router.use(function (req, res, next) {
   let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

router.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).json({
        status: "err",
        message: err.message || err,
        code: res.statusCode
    })
});
module.exports=router;

