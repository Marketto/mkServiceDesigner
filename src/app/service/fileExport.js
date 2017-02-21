angular.module('app').service('fileExport',function(Blob, FileSaver){
	function exportBlob(plainData, filename, mimeType){
        var data = new Blob([plainData], { 
                type: (mimeType||'text/plain;charset=utf-8') 
            });
        FileSaver.saveAs(data, filename);
    }
    angular.extend(this, {
        'blob' : exportBlob,
        'json' : function(dataObject, filename){
            return exportBlob(JSON.stringify(dataObject,null,4), filename, 'application/json;charset=utf-8');
        }
    });
});