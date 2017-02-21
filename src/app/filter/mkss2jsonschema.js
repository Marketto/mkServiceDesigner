angular.module('app').filter('mkss2jsonschema',function($cacheFactory){
	var filterCache = $cacheFactory('mkss2jsonschema');
	function mkss2jsonschemaProperties(node){
		if(!angular.isArray(node)){
			return node;
		}

		var jssNode = {type:'object'},
			reqFields = node.filter(function(e){
					return e.$required===true;
				}).map(function(e){
					return e.$name;
				})||[],
			nl = node.length;

	//Children
		if(nl){
		//Properties
			jssNode.properties = {};

		//Dependencies
			var nodeDependencies = node.map(function(e,i,a){
					if(angular.isArray(e.$dependencies) && e.$dependencies.length>0){
						var _depz = e.$dependencies.filter(function(d){
								return !!a.find(function(s){
									return s.$name === d && s.$name !== e.$name
								});
							});
						if(_depz.length){
							var _depzObj = {};
							_depzObj[e.$name] = _depz
							return _depzObj;
						}
					}
					return;
				}).filter(function(e){
					return !!e;
				});
			if(nodeDependencies.length){
				jssNode.dependencies = nodeDependencies.reduce(function(p,c){
						return angular.merge(p,c);
					});
			}
		//End Dependencies
		}

		for(var p=0; p<nl; p++){
			var currentProp = {};
			for (var k in node[p]){
				if(!(/^\$/).test(k)){
					currentProp[k] = node[p][k];
				}
			}
			if(angular.isObject(node[p]['$'+node[p].type])){
				for (var k in node[p]['$'+node[p].type]){
					if(!(/^\$/).test(k)){
						currentProp[k] = node[p]['$'+node[p].type][k];
					}
				}
				switch(node[p].type){
					case 'object':
						if(((node[p].$object||{}).$children||[]).length){
							currentProp = angular.extend(currentProp,mkss2jsonschemaProperties(node[p].$object.$children));
						}
						break;
					case 'string':
						if(((node[p].$string||{}).$domain||[]).length){
							currentProp.enum = node[p].$string.$domain;
						}
						break;
				}
			}
		//Array of
			if(node[p].$listOf){
				jssNode.properties[node[p].$name] = {
					"type" : "array",
					"items": currentProp
				};
				if(node[p].$minOccurrences){
					jssNode.properties[node[p].$name].minItems = node[p].$minOccurrences;
				}
				if(node[p].$maxOccurrences){
					jssNode.properties[node[p].$name].minItems = node[p].$maxOccurrences;
				}
				if(node[p].$uniqueItems){
					jssNode.properties[node[p].$name].uniqueItems = node[p].$uniqueItems;
				}
			}else{
				jssNode.properties[node[p].$name] = currentProp;
			}
		}
		if(reqFields.length>0){
			jssNode.required = reqFields;
		}

		return jssNode;
	}
	return function(key, endPoint, verb, type){
	//Checking cache
		var cacheKey = JSON.stringify({
				"key" 		: key, 
				"endPoint" 	: endPoint, 
				"verb" 		: verb, 
				"type" 		: type
			}),
			cachedData = filterCache.get(cacheKey);
		
		if(cachedData){
			return cachedData;
		}

	//Logic
		var jss = angular.extend({
				'$schema' 	: "http://json-schema.org/schema#",
				'$id'		: endPoint + '.' + verb + '.' + type + '.json',
				'type'		: 'object',
			}, mkss2jsonschemaProperties(key));
			
	//Storing in cache
		filterCache.put(cacheKey, jss);
		return jss;
	};
});