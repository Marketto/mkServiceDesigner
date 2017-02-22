angular.module('app').service('fileExport',function(Blob, FileSaver){
	function exportBlob(blobData, filename){
        return FileSaver.saveAs(blobData, filename);
    }

    function exportPlainText(plainData, filename, mimeType){
        var blobData = new Blob([plainData], { 
                type: (mimeType||'text/plain;charset=utf-8') 
            });
        return exportBlob(blobData, filename);
    }

    function exportJson(dataObject, filename){
        return exportPlainText(JSON.stringify(dataObject,null,4), filename, 'application/json;charset=utf-8');
    }

    angular.extend(this, {
        'blob'      : exportBlob,
        'plainText' : exportPlainText,
        'json'      : exportJson
    });
});