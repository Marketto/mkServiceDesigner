angular.module('app').constant('loadMksdCtrl',
	['$scope', '$mdDialog', '$modalParams', '$fileReader', '$JSZip', function($scope, $mdDialog, $modalParams, $fileReader, $JSZip){
		$scope.fileName = $modalParams.file.name;
		var zip = new $JSZip();
			zip.loadAsync($modalParams.file).then(function(archive) {
				var sourceFileName = Object.keys(archive.files).find(function(f){
						return this[f].name === 'scope.json';
					},archive.files);
				archive.files[sourceFileName].async('blob').then(function(sourceFile) {
				$fileReader.readAsJson(sourceFile).then(function(data) {
					$mdDialog.hide(data);
				}, function (e) {
					$mdDialog.cancel();
			    	console.error("Error reading " + sourceFileName + " from "+ $modalParams.file.name +" : " + e.message);
			    });
			}, function (e) {
				$mdDialog.cancel();
		    	console.error("Error decompressing " + sourceFileName + " from "+ $modalParams.file.name +" : " + e.message);
		    });
		}, function (e) {
			$mdDialog.cancel();
			console.error("Error reading " + $modalParams.file.name + " : " + e.message);
		});
	}]
);