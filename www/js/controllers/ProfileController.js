angular.module("Store")
.controller('ProfileCtrl', function($scope, $state, $ionicPopup, LoginService){

	$scope.$on('$ionicView.enter', function(){
		$scope.shadowProfile = LoginService.getUserProfile();
		$scope.profile = LoginService.getUserProfile();
	});

	$scope.update = function(){
		Object.keys($scope.profile).map(function(field){
			if(!$scope.shadowProfile[field] == null && $scope.profile[field] == null){
				$ionicPopup.alert({
					title: "Blank Fields",
					template: "Some blank fields previously filled were detected"
				});
				return;
			}
		});

		LoginService.updateUserProfile($scope.profile).then(function(result){
			if(result.status === "ERROR"){
				$ionicPopup.alert({
					title: "Update Failed",
					template: result.msg
				});
				return;
			}
			else if($scope.profile.fname=="" || $scope.profile.contact==""){
				$ionicPopup.alert({
					title:"Blank credential",
					template:"Some of fields are blank"
				});
				return;
			}
			else if(!(/^[0-9]([0-9]{1,9}$)/g.test($scope.profile.contact))){
				$ionicPopup.alert({
					title:"Contact",
					template:"Please check your mobile number again"
				});
				return;
			}
			$state.go('app.dash');
		}, function(err){
			$ionicPopup.alert({
				title: "Update Failed",
				template: "Oops something went wrong..."
			});
			return;
		})
	}
});