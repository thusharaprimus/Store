angular.module("Store")
.service('RetailService', function($http, $q, config, LoginService){
	var o = {};
	var baseUrl = config.locals.baseUrl;
	var id = "";

	var getImageUrls = function(images){
		if(images.length)
		images.map(function(elem){
			elem.image = baseUrl + elem.image;
		});
	}

	o.init = function(){
		id = LoginService.getUserProfile().id;
	}

	o.getRecentProducts = function(category){
		var deferred = $q.defer();

		$http.get(baseUrl + 'api/product/recent/'+ category +'/10').then(function(response){
			getImageUrls(response.data);
			deferred.resolve(response.data);
		}, function	(error){
			deferred.reject({ status: 'ERROR', msg: error });
		});

		return deferred.promise;
	}

	o.getProductsByTag = function(uid){
		var deferred = $q.defer();
		console.log("Requesting tag");
		console.log(uid);
		$http.get(baseUrl + 'api/product/find/uid/' + uid).then(function(response){
			getImageUrls(response.data);
			deferred.resolve(response.data);
		}, function(err){
			deferred.reject({ status: 'ERROR', msg: err });
		});

		return deferred.promise;
	}

	o.flagProduct = function(prodId){
		var flag = {
			custId: id,
			prodId: prodId
		};

		console.log(flag);
		console.log(id);

		var deferred = $q.defer();

		$http.post(baseUrl + 'api/retail/flag', flag).then(function(response){
			console.log(response);
			deferred.resolve({status: "SUCCESS"});
		},function(err){
			deferred.reject({status: "ERROR",msg:err});
		});

		return deferred.promise;
	}

	o.getflagProducts = function(custId){
		console.log("Flagging service get flags");
		var deferred = $q.defer();
		$http.get(baseUrl + 'api/product/get/flagged/' + id).then(function(response){
			console.log(response.data);
			getImageUrls(response.data);
			deferred.resolve(response.data);
		},function(err){
			deferred.reject({stsus: "ERROR",msg:err});
		});
		return deferred.promise;
	}

	o.getCustomerPreferences = function(product){
		console.log(product);

		var deferred = $q.defer();
		$http.post(baseUrl + 'api/product/get/prefs/' + id, product).then(function(response){
			//getImageUrls(response.data);
			console.log(response.data);
			deferred.resolve(response.data);
		},function(err){
			deferred.reject({status: "ERROR",msg:err});
		});
		return deferred.promise;
	}

	o.getFlaggedProducts = function(){
		var deferred = $q.defer();
		$http.post(baseUrl + 'api/product/get/prefs/' + id).then(function(response){
			getImageUrls(response.data);
			deferred.resolve(response.data);
		},function(err){
			deferred.reject({status: "ERROR",msg:err});
		});
		return deferred.promise;
	}

	o.rateProduct = function(prodId, prodRating){
		var deferred = $q.defer();

		var rating = {
			custId: id,
			prodId: prodId,
			prodRating: prodRating
		};

		$http.post(baseUrl + 'api/product/rate', rating).then(function(response){
			deferred.resolve(response.data);
		},function(err){
			deferred.reject({status: "ERROR",msg:err});
		});
		return deferred.promise;
	}

	o.resetFlag = function(prodId){
		var flag = {
			custId: id,
			prodId: prodId
		};

		var deferred = $q.defer();

		console.log(flag);

		$http.post(baseUrl + 'api/retail/flag/remove', flag).then(function(response){
			deferred.resolve(response.data);
		},function(err){
			deferred.reject({status: "ERROR",msg:err});
		});

		return deferred.promise;
	}

	return o;
});