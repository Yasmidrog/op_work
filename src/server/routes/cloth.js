const express = require('express');
const router = express.Router();
const Cloth = require("../models/Cloth");
const passport = require("passport");
const auth = require("./auth");
router.all('/list', function (req, res, next) {
    let fvalue = req.param("filter");
    let vcode = req.param("for_whom");
    console.log(fvalue);
    Cloth.findCloth(fvalue, vcode, function (e, cl) {
        if (e)
            next(e);
        else
            res.json({status: "done", clothes: cl});
    })
});


router.post('/add', auth, function (req, res, next) {
    Cloth.createCloth(req.body.cloth, (e) => {
        if (e) {
            if (e.message.includes("dup key"))
                e.message = "There's a product with such a name or vendor code";
            next(e);
        }
        else
            res.json({status: "done"});
    })
});

router.post('/remove', auth, function (req, res, next) {
    Cloth.find({vcode: req.param("vcode")}).remove().exec().then(() => {
        res.json({status: "done"});
    }).catch((err) => {
        res.json({status: "err", message: err.message});
    })
});
module.exports = router;