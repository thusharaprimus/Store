angular.module("Store")
.service('LoginService', function($rootScope, $http, $q, config){
	var baseApiUrl = config.locals.baseUrl;

	var profile = {};
	var isLoggedIn = false;
	var o = {};
//login user check
	o.loginUser = function(user){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'api/login/customer', user).then(function(response){
			if(response.data.status === 'OK'){
				profile = response.data.profile;
				$rootScope.token = response.data.token;

				localStorage.setItem("token", response.data.token);
				isLoggedIn = true;
				deferred.resolve({ status: "SUCCESS" });
				console.log($scope.user);
			}
			else{
				isLoggedIn = false;
				deferred.reject({ status: "ERROR", msg: "Invalid Login"});
				return;
			}
		}).catch(function(error){
			deferred.reject({ status: "ERROR", msg: error });
		});

		return deferred.promise;
	}
//signup user
	o.signUpUser = function(user){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'api/user/create/customer', user).then(function(response){
			if(response.data.status	=== "ERROR"){
				deferred.resolve({ status: "ERROR" });
			}
			else{
				deferred.resolve({ status: "SUCCESS" });
			}
		}, function(error){
			deferred.reject({ status: "ERROR" });
		});
		return deferred.promise;
	}
	
//update the user profile details
	o.updateUserProfile = function(profile){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'api/user/update/customer', profile).then(function(response){
			if(response.data.status	=== "ERROR"){
				deferred.resolve({ status: "ERROR", msg: response.data.msg });
			}
			else{
				deferred.resolve({ status: "SUCCESS" });
			}
		}, function(error){
			deferred.reject({ status: "ERROR" });
		});

		return deferred.promise;
	}

	o.getUserProfile = function(){
		return profile;
	}

	o.logOut = function(){
		localStorage.setItem("token", "");
		isLoggedIn = false;
		profile = {};
	}

	o.isLoggedIn = function(){
		return (profile.uname != "" && profile.uname != undefined);
	}

	return o;
})