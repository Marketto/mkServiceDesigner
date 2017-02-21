angular.module('app').filter('endPointLastPart', function($cacheFactory){
	var filterCache = $cacheFactory('endPointLastPart');
	return function(input){
		if(!input){
			return;
		}
		var cacheKey 	= input,
			cachedData 	= filterCache.get(cacheKey);

		if(cachedData){
			return cachedData;
		}
		var splittedPath = (input||"").split("/").filter(function(e){return !!e}),
			out = splittedPath.length<2?(splittedPath[0]||input):splittedPath[splittedPath.length-1];

		filterCache.put(cacheKey, out);
		return out;
	};
});