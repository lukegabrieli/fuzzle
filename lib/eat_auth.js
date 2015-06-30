var eat = require('eat');
var User = require('../models/User.js');

module.exports = function eatAuthFactory(secret) {
  return function eatAuth(req, res, next) {
    var token = req.headers.eat || req.body.eat;

    if (!token) {
      return res.redirect('/sign_in');
    }
    eat.decode(token, secret, function decode(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'error decoding token'});
      }
      User.findOne({uuid: decoded.id}, function findUser(err, user) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'internal service error'});
        }
        if (!user) {
          console.log('no user found for that token');
          return res.status(500).json({msg: 'not authorized'});
        }
        req.user = user;
        next();
      });
    });
  };
};
