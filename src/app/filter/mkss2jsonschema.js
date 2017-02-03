angular.module('app').filter('mkss2jsonschema',function(){
	function mkss2jsonschemaProperties(node){
		if(!angular.isArray(node)){
			return node;
		}
		var jssNode = {'properties':{}},
			reqFields = node.filter(function(e){
					return e.$required===true;
				}).map(function(e){
					return e.$name;
				})||[],
			nl = node.length;
		for(var p=0; p<nl; p++){
			jssNode.properties[node[p].$name] = {};
			for (var k in node[p]){
				if(!(/^\$/).test(k)){
					jssNode.properties[node[p].$name][k] = node[p][k];
				}
			}
			if(angular.isArray(node[p].$children)){
				jssNode.properties[node[p].$name] = angular.extend(jssNode.properties[node[p].$name],mkss2jsonschemaProperties(node[p].$children));
			}
		}
		if(reqFields.length>0){
			jssNode.required = reqFields;
		}

		return jssNode;
	}
	return function(key,endPoint, verb, type){
		var jss = {
			'$schema' 	: "http://json-schema.org/schema#",
			'$id'		: endPoint + '.' + verb + '.' + type + '.json',
			// 'properties': mkss2jsonschemaProperties(key),
			'type'		: 'object',
			// 'required'  : []
		};
		return angular.extend(jss, mkss2jsonschemaProperties(key));
	};
});