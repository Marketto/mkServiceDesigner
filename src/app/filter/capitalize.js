angular.module('app').filter('capitalize', function($cacheFactory){
	var filterCache = $cacheFactory('capitalize');
    return function(input) {
    	if(!input){
    		return;
    	}
    	var cacheKey 	= input,
			cachedData 	= filterCache.get(cacheKey);

		if(cachedData){
			return cachedData;
		}
		var out = input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
		filterCache.put(cacheKey, out);
      	return out;
    }
});