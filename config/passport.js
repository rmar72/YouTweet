const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = mongoose.model('User');

passport.use(new LocalStrategy(
    {
        usernameField: 'user[email]',
        passwordField: 'user[password]'
    },
    (email, password, done) => {
    User.findOne({email})
        .then( (err, user) => {
            if(!user || !user.validatePassword(password)){
                return done(null, false, { err: { 'email or password': 'is invalid'}} );
            }
            return done(null, user);
        })
        .catch(done);
}));