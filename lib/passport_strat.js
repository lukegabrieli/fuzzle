var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User.js');

module.exports = function passportBasic(passport) {
  passport.use('basic', new Basic({}, function verify(email, pswd, done) {
    User.findOne({'basic.email': email}, function findUser(err, user) {
      if (err) {
        return done('There was an error processing your request');
      }

      if (!user) {
        return done(null, false);
      }

      user.checkPassword(pswd, function validatePassword(err, data) {
        if (err) {
          return done('There was an error verifying your password');
        }

        if (!data) {
          return done(null, false);
        }

        return done(null, user);
      });
    });
  }));
};
