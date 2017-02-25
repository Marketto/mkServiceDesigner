angular.module('app').service('mkTools', function(){
    angular.extend(this,{
        //Overwrite destination properties with source object ones
        'overwrite' : function(dest, src){
            if(angular.isObject(dest) && angular.isObject(src)){
                for(var p in src){
                    dest[p] = src[p];
                }
            }
        },
        'replace' : function(dest, src){
            if(angular.isObject(dest) && angular.isObject(src)){
                var propertyList = [];
                for(var p in dest){
                    propertyList.push(p);
                }
                for(var p in src){
                    if(propertyList.indexOf(p)<0){
                        propertyList.push(p);
                    }
                }
                for(var i = propertyList.length-1; i>=0; i--){
                    dest[propertyList[i]] = src[propertyList[i]];
                }
            }
        }
    });
});