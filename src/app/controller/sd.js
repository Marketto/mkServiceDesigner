angular.module('app').controller('sdCtrl',function($scope, loadMksdCtrl, fileExport, mkTools, $mdDialog, $JSZip){ //, $mdDialog
//PRIVATE
	var itemCounter=0;

//PUBLIC / SCOPE
	$scope.service = {
	// 	verbs : {
	// 	}
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

	// this.removeItem = function(item, ref){
	// 	ref.splice(ref.indexOf(item),1);
	// }
	// this.addItem = function(ref){
	// 	itemCounter++;
	// 	ref.push({
	// 		"$name" 		: 'property'+itemCounter, 
	// 		"type" 			: "object", 
	// 		"$object" 		: {"$children" : []}, 
	// 		"$string"		: {
	// 			"$domain" 		: []
	// 		}
	// 	});
	// }
	
	function onNewItem(item){
		item.type = item.type||'object';
		item.$name = item.$name||'property'+(++itemCounter);
		return item;
	}
	this.addItem = function(ref){
		ref.push(onNewItem({}));
	};
	this.onNewItem = onNewItem;
	this.export = fileExport.plainText;

	// this.importJson = function(file, dest){
	// 	// $mdDialog.show(
	// 	// 	$mdDialog.alert()
	// 	// 		.clickOutsideToClose(false)
	// 	// 		.title('Opening -')
	// 	// 		.textContent('Loading project')
	// 	// 		// You can specify either sting with query selector
	// 	// 		.openFrom(angular.element(document.querySelector('#uploadButton')))
	// 	// 		// or an element
	// 	// 		.closeTo(angular.element(document.querySelector('#uploadButton')))
	//  //    );
	// 	if(file && dest){
	// 		$fileReader.readAsJson(file).then(function(data) {
	// 		//Overwrite destination properties with source object ones
	// 			mkTools.overwrite(dest, data);
	// 		});
	// 	}
	// };
	this.exportJson = fileExport.json;

	this.importMksd = function(file, dest){
		if(file && dest){
			mkTools.replace(dest, {});
			$mdDialog.show({
		    	controller 				: loadMksdCtrl,
		      	templateUrl 			: 'view/loading.html',
		      	clickOutsideToClose 	: false,
		      	locals: {
			        '$modalParams' : {
			        	'file' : 	file
			        }
			    }
		    }).then(function(data){
			//Overwrite destination properties with source object ones
				angular.extend(dest, data);
		    });
		}
	};

	this.exportMksd = function(dataObject, filename){
        var zip = new $JSZip();
        zip.file('scope.json', JSON.stringify(dataObject));
        return zip.generateAsync({
                'type'                : "blob", 
                'compression'         : 'DEFLATE',
                'compressionOptions'  : {
                    'level'   : 9
                },
                'mimeType'            : 'application/x-mk-service-designer'
            }).then(function(blobData) {
                fileExport.blob(blobData, filename+'.mksd');
            });
	}
});