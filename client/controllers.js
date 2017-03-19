reviewApp.controller("productsController",["$scope", "$log", "$http", function($scope, $log, $http){
    
    $scope.getProducts = function(){
        
        $http.get("/products").success(function(result){
            $scope.products = result;
        });
    }
    
    $scope.getProducts();
}]);

reviewApp.controller("productDetailsController",["$scope", "$routeParams", "$log", "$http", function($scope, $routeParams, $log, $http){
    
    $scope.productId= $routeParams.id;
    console.log("requesting details of : "+ $scope.productId);
    
     $scope.getProductDetails = function(){
        
        $http.get("/product/"+$scope.productId).success(function(result){
            $scope.productDetails = result;
        });
    }
    
    $scope.getProductDetails();
    
    $scope.addReview = function(){
        
        $http.post("/product/"+ $scope.productId + "/review", {
            review: {
                content: $scope.reviewContent
            }
        }).error(function(error){
            
            console.log(error);
            
        }).success(function(result){
            console.log("done posting review");
            console.log(result);
            $scope.productDetails = result;
            $scope.reviewContent = "";
        });
        
    }
    
    
}]);
