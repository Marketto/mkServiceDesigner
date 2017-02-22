angular.module('app').factory('$fileReader',function($q, $rootScope){
	function _onLoad(_reader, _resolve, transformResponse) {
    	transformResponse = angular.isFunction(transformResponse)?transformResponse:function(){return arguments}
        return function () {
            $rootScope.$apply(function () {
                _resolve(transformResponse(_reader.result));
            });
        };
    };
 
    function _onError(_reader, _reject) {
        return function () {
            $rootScope.$apply(function () {
                _reject(_reader.result);
            });
        };
    };
 
    function _onProgress(_progress) {
        return function (event) {
        	$rootScope.$apply(function () {
	        	_progress.total 	= event.total;
	        	_progress.loaded 	= event.loaded;
	        });
        };
    };

    function makeReader(functionName, transformResponse){
    	return function(file){
    		var _progress = {};
    		return angular.extend($q(function(resolve,reject){
    			var reader 			= new FileReader();
    			
    			reader.onload 		= _onLoad(reader, resolve, transformResponse);
        		reader.onerror 		= _onError(reader, reject);
        		reader.onProgress 	= _onProgress(_progress);
        		
        		reader[functionName](file);
    		}),_progress);
    	}
    }
 
    return {
        readAsDataUrl 	: makeReader('readAsDataURL'),
        readAsText		: makeReader('readAsText'),
        readAsJson		: makeReader('readAsText', function(data){
            return angular.fromJson(data||"{}")
        }),
        readAsBinary    : makeReader('readAsArrayBuffer')
    };
});