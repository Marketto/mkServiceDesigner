angular.module('app').filter('mkss2json',function($filter, $jsf, $cacheFactory){
	var filterCache = $cacheFactory('mkss2json');
	return function(key, endPoint, verb, type){
	//Checking cache
		var cacheKey 	= JSON.stringify(key),
			cachedData 	= filterCache.get(cacheKey);

		if(cachedData){
			return cachedData;
		}
	//Logic
		var json = $jsf($filter('mkss2jsonschema')(key, endPoint, verb, type));
	//Storing in cache
		filterCache.put(cacheKey, json);
		return json;
	};
});