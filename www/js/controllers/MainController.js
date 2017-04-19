angular.module("Store")
.controller('MainCtrl', function($scope, $state, LoginService,$ionicSideMenuDelegate) {
	console.log("In main controller...");
        $scope.$on('$ionicView.enter', function(){
        console.log(LoginService.getUserProfile());
        $ionicSideMenuDelegate.canDragContent(false);
    });
  $scope.$on('$ionicView.leave', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });

  $scope.$watch(function() { return LoginService.getUserProfile() }, function(newVal){
    console.log("Scope is changing...");
    console.log(newVal);

    $scope.userName = newVal.fname + " " + newVal.lname;
    $scope.uname = newVal.uname;
  }, true);

	$scope.logout = function(){
    	LoginService.logOut();
    	$state.go('login');
  	}

  	$scope.account = function(){
    	$state.go('app.profile');
  	}

  	$scope.wishlist = function(){
    	$state.go('app.wishlist');
  	}

  	$scope.feedback = function(){
    	$state.go('app.feedback');
  	}
    $scope.about = function(){
      $state.go('app.about');
    }
});
