angular.module('app').controller('sdCtrl',function($scope, FileSaver, Blob, $fileReader){ //, $mdDialog
//PRIVATE
	var itemCounter=0;
	
	function exportBlob(ref, filename, mimeType){
		var data = new Blob([ref], { type: (mimeType||'text/plain')+';charset=utf-8' });
	    FileSaver.saveAs(data, filename);
	};

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
	this.export = exportBlob;
	this.exportJson = function(ref, filename){
		return exportBlob(JSON.stringify(ref,null,4), filename, 'application/json');
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