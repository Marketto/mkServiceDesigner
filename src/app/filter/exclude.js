angular.module('app').filter('exclude',function(){
	return function(input, itemToExclude){
		if(angular.isArray(input)){
			return input.filter(function(e){return e!==itemToExclude});
		}
		return input;
	};
});