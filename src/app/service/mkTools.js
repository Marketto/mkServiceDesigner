angular.module('app').service('mkTools', function(){
    angular.extend(this,{
        //Overwrite destination properties with source object ones
        'overwrite' : function(dest, src){
            if(angular.isObject(dest) && angular.isObject(src)){
                for(var p in dest){
                    delete dest[p];
                }
                for(var p in src){
                    dest[p] = src[p];
                }
            }
        }
    });
});