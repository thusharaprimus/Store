angular.module("Store")
.controller('LoginCtrl',function($state, $scope, $ionicPopup, LoginService, RetailService, ionicToast){
	$scope.user = {
		uname: "",
		passwd: ""
	}
//change view to signup
	$scope.goToSignUp = function(){
		$state.go('signup')
	}
//login button action
	$scope.login = function(){
		console.log("Logging In...");
		LoginService.loginUser($scope.user).then(function(response){
			if(LoginService.isLoggedIn()){
				RetailService.init();
				$state.go('app.dash');
			}
		}, function(err){
			console.log("Failed login");
			ionicToast.show('Invalid Login!', 'bottom', false, 2500);
		});
	}

});