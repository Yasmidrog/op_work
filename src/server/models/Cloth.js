let mongoose = require('mongoose');
let tp = {
    type: String,
    unique: true,
    required: true
};

let cloth = new mongoose.Schema({
    vcode: tp,
    name: tp,
    amount: {type: Number, required: true},
    cost: {type: Number, required: true},
    color: {type: String, required: true},
    size: {type: String, required: true}
});


cloth.statics.createCloth = function (cloth, cb) {
    let m = this.model('Cloth');
    m.findOneAndRemove({
        $or: [
            {name: cloth.name},
            {vcode: cloth.vcode},
        ]
    }).then((removed) => {
       if(Object.keys(cloth).length<6&&!removed){
           let e = new Error("Not enough data");
           e.status=400;
           throw e;
       }
        return m.create({
            vcode: cloth.vcode||removed.vcode,
            name: cloth.name||removed.name,
            amount: cloth.amount||removed.amount,
            cost: cloth.cost||removed.cost,
            color: cloth.color||removed.color,
            size: cloth.size||removed.size
        })
    }).then(() => {
        cb(null)
    }).catch((err) => {
        cb(err);
    })
};
cloth.statics.findCloth=function (fvalue, vcode, cb) {
    let q = {};
    if (fvalue&&!vcode) {
        q = {
            $or:[
                {name: {$regex: fvalue, $options: 'i'}},
                {vcode: {$regex: fvalue, $options: 'i'}},
            ]
        };
    }
    if(vcode){
        q = {
            $and:[
                {name: {$regex: fvalue, $options: 'i'}},
                {vcode: {$regex: '^'+vcode[0], $options: 'i'}},
            ]
        };
    }
    this.model('Cloth').find(q).exec(function (e, cl) {
        if (e) {
            cb(e)
        }
        else {
           cb(null, cl)
        }
    })
};
module.exports = mongoose.model('Cloth', cloth);
