'use strict';
var bodyparser = require('body-parser');
var request = require('request');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);
var User = require('../models/User');

module.exports = function (router) {
  router.use(bodyparser.json());

  router.get('/tennis/getCourt', function(req, res) {
    request({
      url: 'https://data.seattle.gov/resource/7stk-8j8w.json',
      method: 'GET'}, function(err, response, body) {
        if(err) {
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
        }
        else {
          res.json(body);
        }
      }
    );
  });

  router.get('/tennis/getUsers', function(req, res){
    User.find({}, function(err, data){
      if(err){
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });
};
