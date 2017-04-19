angular.module("Store")
.controller('DashCtrl', function($state,$scope, RetailService, ionicToast,LoginService, NfcService,$ionicPopup, $ionicModal, $timeout,$ionicSideMenuDelegate) {
    $scope.$on('$ionicView.enter', function(){
    console.log(LoginService.getUserProfile());
    $ionicSideMenuDelegate.canDragContent(false);
    });
    $scope.$on('$ionicView.leave', function(){
    $ionicSideMenuDelegate.canDragContent(false);
    });

  	$scope.recent = [];
    $scope.categories = {
        'Gents' : [],
        'Ladies' : [],
        'Kids' : [],
        'Accessaries' : [],
        'Gifts' : []
    
    };

    $scope.searchResults = [];

    $scope.search = function(){
    $scope.query = { name: '' };
    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="query.name" placeholder= "Search">',
    title: 'Search',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Search</b>',
        type: 'button-positive'
      }
    ]
  });

  myPopup.then(function(res) {
    console.log(res);
    console.log($scope.query.name);

    if($scope.query.name != ''){
      RetailService.getProductByName($scope.query.name).then(function(products){
        if(products.length == 0){
          ionicToast.show('No Products Found', 'bottom', false, 2500);
          return;
        }

        if(products.length == 1){
          $state.go('app.product', { details: products[0] });
          return;
        }

        $scope.searchResults = products;
        $scope.productModal.show();
      }, function(err){
          ionicToast.show('Failed search...', 'bottom', false, 2500);
      });
    }
  });
 };

  $scope.productModal = $ionicModal.fromTemplateUrl('templates/clothpopup.html',{
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.productModal = modal;
  });

  $scope.$on('$destroy', function() {
      $scope.productModal.remove();
  });

	$scope.refreshRecentList = function(){
      Object.keys($scope.categories).map(function(category){
        var catRep = category.replace(/\+/g, '%20');
        RetailService.getRecentProducts(catRep).then(function(result){
          $scope.categories[category] = result;
          console.log($scope.categories);
        }, function(err){
          console.log(err);
        });
      });
 	}

   $scope.viewDetails = function(item){
     $scope.productModal.hide();
     $state.go('app.product', { details: item });
   }

   $scope.$on('$ionicView.enter', function(){
      $scope.refreshRecentList();
   });
});
