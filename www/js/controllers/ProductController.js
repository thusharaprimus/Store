angular.module("Store")
.controller('ProductCtrl',function($scope, $state, $ionicHistory, NfcService,RetailService,LoginService,ionicToast) {
  $scope.nfcService = NfcService;

	$scope.$on('$ionicView.enter', function(){
    $scope.productDetails = $state.params.details;

    RetailService.getCustomerPreferences($scope.productDetails).then(function(response){
        var prefs = response[0];
        displayRatings(null, prefs.ratings);
        $scope.productDetails.flag = prefs.flag;
        console.log(prefs);
    }, function(err){
        console.log(err);
    });
  });

	$scope.$watch('nfcService.getProduct()', function(product){
		console.log("New product details: " + JSON.stringify(product));
		if(product.id != undefined){
			$scope.productDetails = product;
		}
	});

  	$scope.toggleFlag = function(){
  		console.log("flagging...");

      if($scope.productDetails.flag == null){
          ionicToast.show('Flagged...', 'bottom', false, 2500);
  		    RetailService.flagProduct($scope.productDetails.id).then(function(result){
  			     console.log(result);
             $scope.productDetails.flag = 1;
  		    });

      }
      else{
          ionicToast.show('Unflagged...', 'bottom', false, 2500);
          RetailService.resetFlag($scope.productDetails.id).then(function(result){
             $scope.productDetails.flag = null;
             console.log(result);
          });
      }

  	};

	console.log($state.params);
	$scope.ratingArr = [{
    value: 1,
    icon: 'ion-ios-star-outline',
    question: 1
  }, {
    value: 2,
    icon: 'ion-ios-star-outline',
    question: 2
  }, {
    value: 3,
    icon: 'ion-ios-star-outline',
    question: 3
  }, {
    value: 4,
    icon: 'ion-ios-star-outline',
    question: 1
  }, {
    value: 5,
    icon: 'ion-ios-star-outline',
    question: 'question 5'
  }];

  var displayRatings = function(question, val){
    var rtgs = $scope.ratingArr;
    for (var i = 0; i < rtgs.length; i++) {
      if (i < val) {
        rtgs[i].icon = 'ion-ios-star';
      } else {
        rtgs[i].icon = 'ion-ios-star-outline';
      }
    };
  }

  $scope.setRating = function(question,val) {
    displayRatings(question, val);

    RetailService.rateProduct(val).then(function(result){
      console.log(result);
      console.log("Rating succeeded");
    }, function(err){
      console.log("Rating failed");
    })

  }
});