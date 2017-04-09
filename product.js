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
  reviews: [
    {
    // product_name: {type: String},
    content: {type: String},
    sentiment: {type: String}
    // approve_version: {type: Number, Default: 0}
            
    }
  ]
};

module.exports = new mongoose.Schema(productSchema);
module.exports.productSchema = productSchema;