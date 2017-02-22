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
		
		var out = input.replace(/(?:^| )([a-z])/g, function(c){return c.toUpperCase()});
		filterCache.put(cacheKey, out);
      	return out;
    }
});