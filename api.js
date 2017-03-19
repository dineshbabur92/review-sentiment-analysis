var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');

module.exports = function() {

    var api = express.Router();

    api.use(bodyparser.json());

    api.get('/products', function(req, res){
        
        res.json({"something": "foo"});
          
    });
}