var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
//mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://dineshbabur92:Mongo7482@ds139480.mlab.com:39480/review_sentiment_analysis');
var Product = mongoose.model('Product', require('./product'), 'products');

var app = express();

app.use(require('morgan')());
app.use(bodyParser());
app.use(express.static(__dirname + '/client'));

var prepareProducts = [
    
    {"name": "HTC Desire", "image":"\/images\/htc.jpg", "description": ["Octa-Core processor", "5.5\" HD screen", "13.0 MP primary", "8.0 MP secondary camera", "Android + HTC Sense Platform"], "reviews": [
        
//        {"content":"review1"},
//        {"content":"review2"},
//        {"content":"review3"}
    
    ]},
    {"name": "Windows", "image":"\/images\/windows.jpg", "description": ["4.7 inch Retina HD Display", "64-bit A9 processor", "12 MP camera, 32 GB storage"], "reviews": []},
    {"name": "IPhone", "image":"\/images\/iphone.jpg", "description": ["5.7 Inches", "640 XL Dual Sim", "8 GB (Expandable up-to 256 GB)", "M-1067", "13.0 MP", "Windows 8.1"], "reviews": []}
    
    
];
var prepare = function(){
    
    for(var i=0; i<3; i++){
        new Product(prepareProducts[i]).save(function(error, result){
            if(error){
                console.log( i + "th Product insertion failed");
            }
            
        });
    }
    
};
                                             
//prepare();


app.get('/products', function(req, res){
        
    var query = Product.find({}).select('_id name image description');

    query.exec(function(error, result){
        if(error){
            res.json({"error": "products get db error"});
            return;
        }
        res.json(result);
    });

});
app.get('/product/:id', function(req, res){
        
    var productId = req.params.id;
    console.log("Requested product ID:" + productId);
    
    

    Product.findById(productId, function(error, result){
        if(error){
            res.json({"error": "product by id get db error"});
            return;
        }
        res.json(result);
    });

});

app.post('/product/:id/review', function(req, res){
   
    var productId = req.params.id;
    console.log("Requested product ID:" + productId);
    var review = req.body.review;
    
    Product.findById(productId, function(err, product){
        if(err){
            res.json({"error": "product review by id get db error"});
            return;
        }
        if(!product.reviews)
            product.reviews = []
        product.reviews.push(review);
        product.save(function(err, result){
           if(err){
                res.json({"error": "product review by id post db error"});
                return;
            }
            res.json(result);
        });
    })
    
});

app.listen(3000);
console.log('Listening on port 3000!');