//Routes

reviewApp.config(function($routeProvider){
    
   $routeProvider
   
   .when("/", {
       templateUrl: "/products.html",
       controller: "productsController"
   })
    
   .when("/product/:id", {
       templateUrl: "/product_details.html",
       controller: "productDetailsController"
   })
});