var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function() {
  mongoose.connect('mongodb://localhost:27017/test');

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