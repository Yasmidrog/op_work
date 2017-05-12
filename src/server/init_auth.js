module.exports = function (passport) {
    const BasicStrategy = require('passport-http').BasicStrategy;
    const User = require("./models/User");
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    passport.use('basic', new BasicStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
            User.findOne({username: username}, function (err, client) {
                if (err) {
                    return done(err, false,  err.message);
                }
                if (!client) {
                    let e=new Error("No user");
                    e.status=401;
                    return done(e, false);
                }
                if (client.password !== password) {
                    let e=new Error("Wrong password");
                    e.status=401;
                    return done(e, false);
                }
                return done(null, client);
            });
        }
    ));
};