angular.module('app').filter('mkss2jsonschema',function(){
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

		if(nl){
			jssNode.properties = {};
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