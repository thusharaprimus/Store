angular.module("Store")
.service('UserService', function($rootScope, $http, $q, config){
	var baseApiUrl = config.locals.baseUrl;
	var o = {};
	o.sendFeedback = function(user){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'api/feedback', user).then(function(response){
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
	return o;
})