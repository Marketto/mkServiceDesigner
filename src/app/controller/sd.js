angular.module('app').controller('sdCtrl',function($scope, $fileReader, fileExport, mkTools){ //, $mdDialog
//PRIVATE
	var itemCounter=0;

//PUBLIC / SCOPE
	$scope.service = {
		verbs : {
		}
	};

//PUBLIC / CONTROLLER
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
	this.export = fileExport.blob;
	this.exportJson = fileExport.json;
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
			//Overwrite destination properties with source object ones
				mkTools.overwrite(dest, data);
			});
		}
	}
});