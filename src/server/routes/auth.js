const passport=require("passport");

module.exports = function auth(req, res, next) {
    if (!req.user) {
        passport.authenticate('basic', {session:true}, function (err, user, info) {
            if (err) {
                err.message=info||err.message;
                next(err);
                return;
            }
            if (!user) {
                let err=new Error("No user");
                err.status=401;
                next(err);
                return;
            }
            req.logIn(user, function (err) {
                if (err) {
                    next(err)
                } else {
                    next();
                }
            });
        })(req, res, next);
    } else {

        next();
    }
};