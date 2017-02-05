angular.module('app').controller('sdCtrl',function($scope, FileSaver, Blob){
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

	var itemCounter=0;
	this.removeItem = function(item, ref){
		ref.splice(ref.indexOf(item),1);
	}
	this.addItem = function(ref){
		itemCounter++;
		ref.push({"$name" : 'property'+itemCounter, "type" : "object", "$object" : {"$children" : []}})
	}
	this.exportJson = function(ref, filename){
	    var data = new Blob([JSON.stringify(ref,null,4)], { type: 'application/json;charset=utf-8' });
	    FileSaver.saveAs(data, filename);
	};
});