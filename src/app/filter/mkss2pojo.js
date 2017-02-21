angular.module('app').filter('mkss2pojo',function($cacheFactory, $filter){
	var filterCache = $cacheFactory('mkss2pojo');
	function mkss2pojoProperties($children){
		function pojoPropertyType(node){
			var pojoType;
			switch(node.type){
				case 'object':
					pojoType = $filter('capitalize')(node.$name);
					break;
				case 'string':
					((node.$string||{}).maxLength === 1)?'char':'String';
					break;
				case 'integer':
					var typeProperties = node.$integer||{};
					pojoType = (typeProperties.minimum >= -32768 && typeProperties.maximum <= 32767)?((typeProperties.minimum >= -128 && typeProperties.maximum <= 127)?'byte':'short'):'int';
					break;
				case 'number':
					pojoType = 'float';
					break;
				case 'boolean':
					pojoType = 'boolean';
					break;
			}
			if(node.$listOf){
				pojoType = "List<"+pojoType+">";
			}
			return pojoType;
		}
		return ($children||[]).map(function(p){
			return '\t\tprivate ' + pojoPropertyType(p) + ' '+ p.$name +';';
		}).join('\n');
	}
	function mkss2pojoClasses($children){
		return "\t"+$children.filter(function(node){
				return node.type === 'object';
			}).map(function(node){
				var className = $filter('capitalize')((node||{}).$name);
				return '\t'+[
						'public static class ' + className + ' extends GenericBean {',
			               	mkss2pojoProperties(((node||{}).$object||{}).$children||[]),
			            '\t}',
			            mkss2pojoClasses(((node||{}).$object||{}).$children||[])
			        ].join("\n").trim();
			}).join("\n").trim();
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
		var mainClassName = $filter('capitalize')($filter('endPointLastPart')(endPoint)),
			pojo = [
				'@SuppressWarnings({ "serial" })',
				'public class ' + mainClassName + 'BeanREST extends GenericBean {',
				'private ' + mainClassName + 'BeanREST.' + mainClassName + 'Detail detail;',
		            '\tpublic ' + mainClassName + 'BeanREST() {',
			            '\t\tsuper();',
			            '\t\tthis.detail = new ' + mainClassName + 'BeanREST.' + mainClassName + 'Detail();',
		            '\t}',
		            '',
			            '\tpublic ' + $filter('capitalize')($filter('endPointLastPart')(endPoint)) + 'BeanREST.' + $filter('capitalize')($filter('endPointLastPart')(endPoint)) + 'Detail getDetail() {',
			            '\t\treturn detail;',
		            '\t}',
		            '',
		            '\t@XmlRootElement()',
	            	'\tpublic static class ' + mainClassName + 'Detail extends GenericBean {',
	                	mkss2pojoProperties(key),
	                '\t}',
	                mkss2pojoClasses(key),
				'}'
			].join('\n').trim();

	//Storing in cache
		filterCache.put(cacheKey, pojo);
		return pojo;
	};
});