'use strict';
var bodyparser = require('body-parser');
var http = require('http');
var request = require('request');

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
          console.log(body);
          res.json(body);
        }
      }
    );
  });
};
