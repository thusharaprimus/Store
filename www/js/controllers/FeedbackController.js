angular.module("Store")
.controller('FeedCtrl',function($scope,$state,$ionicPopup,UserService){
	console.log("switch to feedback");
	$scope.user={feedback:''
					}
	$scope.feed=function(){
		if($scope.user.feedback == ""){
			$ionicPopup.alert({
				title:"Blank Credential",
				template:"Feedback field cannot be empty."
			});
			return;
		}
		else{
			UserService.sendFeedback($scope.user).then(function(result){
				if (result.status === "SUCCESS") {
					$state.go('app.feedback');
				}
				else{
					$state.go('app.feedback');
				}
			}, function(err){
				$state.go('app.feedback');
			});
		}
	}
})