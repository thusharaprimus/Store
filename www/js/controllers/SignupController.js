angular.module("Store")
.controller('SignupCtrl',function($state, $scope, $ionicPopup, LoginService){

	$scope.user = { fname:'',
					lname:'',
					uname: '',
					passwd: '',
					repasswd: ''};
//signup process success 
	var logInAfterSignUp = function(){
		LoginService.loginUser($scope.user).then(function(result){
			if(result.status === "SUCCESS"){
				$state.go('app.profile');
				console.log(LoginService.getUserProfile());
			}
			else{
				$state.go('signup');
			}
		}, function(err){
			$state.go('signup');
		});
	}
//go back to login
	$scope.goToLogin = function(){
		$state.go('login');
	}
//signup button action
	$scope.signup = function(){
		var level=0;
		var input='';
		if($scope.user.fname== "" || $scope.user.passwd == "" || $scope.user.repasswd == "" || $scope.user.uname == ""){
			$ionicPopup.alert({
				title: "Blank Credentials",
				template: "Some of the fields are blank"
			});
			return;
		}
		else if($scope.user.passwd != $scope.user.repasswd){
			$ionicPopup.alert({
				title: "Password Mismatch",
				template: "Password re-type doesn't match"
			});
			return;
		}
		else if ($scope.user.passwd.length<3) {
			$ionicPopup.alert({
				title:"Password",
				template: "Password should be greater than 8 charachters"
			});
			return;
		}
		
		else{
			LoginService.signUpUser($scope.user).then(function(result){
				if(result.status === "SUCCESS"){
					logInAfterSignUp();
				}
				else{
					$ionicPopup.alert({
						title:"User Exists",
						template: "Please choose a different user name"
					});

					$scope.user = { uname: '',
							passwd: '',
							repasswd: ''
					};
				}
			}, function(error){
				$state.go('signup');
			});
		}
	}
})