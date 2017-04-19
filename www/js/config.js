angular.module('Store')
.provider('config', function(){
	this.locals = {};

	this.$get = function(){
		return this;
	}
})