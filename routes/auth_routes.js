var secret = process.env.APP_SECRET;

var bodyParser = require('body-parser');
var validator = require('validator');
var User = require('../models/User.js');
var eatAuth = require('../lib/eat_auth.js')(process.env.APP_SECRET);


 module.exports = function userRoutes(router, passport) {
  router.use(bodyParser.json());

  // Will add passport basic strategy as middleware
  router.get('/sign_in', passport.authenticate('basic', {session: false}),
    function signIn(req, res) {
      req.user.generateToken(secret, function generateToken(err, eat) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'error generating token'});
        }
        res.json({eat: eat});
    });
  });

  router.post('/create_user', function createUser(req, res) {
    console.log(req.body);
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({msg: 'a valid email is required'});
    }
    if (typeof req.body.password != 'string' || req.body.password.length < 6) {
      return res.status(400).json({
        msg: 'password must be at least 6 characters'
      });
    }
    var newUser = new User();

    newUser.generateUuid();

    newUser.username = req.body.username;

    newUser.basic.email = req.body.email;

    newUser.generateHash(req.body.password, function generateHash(err, hash) {
      if (err) {
        return res.status(500).json({msg: 'Account could not be created'});
      }
      newUser.basic.password = hash;

      newUser.save(function saveUser(err, user) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'Error saving user'});
        }

        user.generateToken(secret, function generateToken(err, eat) {
          if (err) {
            console.log(err);
            return res.status(500).json({msg: 'error generating token'});
          }
        res.json({eat: eat});
        });
      });
    });
  });
 };
