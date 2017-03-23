var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function() {
//  mongoose.connect('mongodb://localhost:27017/test');
  mongoose.connect('mongodb://dineshbabur92:Mongo#@!!@#7482@ds139480.mlab.com:39480/review_sentiment_analysis');

  var Category =
    mongoose.model('Product', require('./product'), 'products');
  var User =
//    mongoose.model('User', require('./user'), 'users');

  var models = {
    Product: Product,
//    User: User
  };

  return models;
};