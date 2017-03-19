var mongoose = require('mongoose');

var productSchema = {
    name: {
        type: String
    },
    image: {
        type: String
    },
    description:[{
        type: String
    }],
  reviews: [{
    content: {type: String},
    sentiment: {type: String, enum: ['POS', 'NEG', "NEU"], Default: 'NEU'},
    approve_version: {type: Number, Default: 0}
            
  }]
};

module.exports = new mongoose.Schema(productSchema);
module.exports.productSchema = productSchema;