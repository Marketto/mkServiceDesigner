angular.module('app').controller('sdCtrl',function($scope, FileSaver, Blob, $fileReader){ //, $mdDialog
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
		ref.push({
			"$name" 		: 'property'+itemCounter, 
			"type" 			: "object", 
			"$object" 		: {"$children" : []}, 
			"$string"		: {
				"$domain" 		: []
			}
		});
	}
	this.exportJson = function(ref, filename){
	    var data = new Blob([JSON.stringify(ref,null,4)], { type: 'application/json;charset=utf-8' });
	    FileSaver.saveAs(data, filename);
	};
	this.importJson = function(file, dest){
		// $mdDialog.show(
		// 	$mdDialog.alert()
		// 		.clickOutsideToClose(false)
		// 		.title('Opening -')
		// 		.textContent('Loading project')
		// 		// You can specify either sting with query selector
		// 		.openFrom(angular.element(document.querySelector('#uploadButton')))
		// 		// or an element
		// 		.closeTo(angular.element(document.querySelector('#uploadButton')))
	 //    );
		 if(file && dest){
			$fileReader.readAsJson(file).then(function(data) {
				if(angular.isObject(dest)){
					for(var p in dest){
						delete dest[p];
					}
					for(var p in data){
						dest[p] = data[p];
					}
				}
			});
		}
	}
});