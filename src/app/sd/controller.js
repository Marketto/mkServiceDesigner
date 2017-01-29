angular.module('app').controller('sdCtrl',function($scope){
	$scope.service = {
		verbs : {
		}
	};
	this.verbs = {
		'get' : [
			'response'
		],
		'post' : [
			'request',
			'response'
		],
		'put' : [
			'request',
			'response'
		],
		'delete' : [
			'response'
		],
	};

	// this.getNewSchema = function(endPoint, verb, type){
	// 	return {
	// 		'$schema' 	: "http://json-schema.org/schema#",
	// 		'$id'		: endPoint + '.' + verb + '.' + type + '.json',
	// 		'properties': {},
	// 		'type'		: 'object',
	// 		'required'  : []
	// 	};
	// };

	this.addItem = function(ref){
		ref.push({"name" : 'property'+ref.length, type: "container"})
	}
});