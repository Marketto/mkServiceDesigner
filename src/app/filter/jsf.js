angular.module('app').filter('jsf',function($jsf){
	return function(input){
		return $jsf(input);
	};
});