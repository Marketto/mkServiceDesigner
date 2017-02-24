angular.module('app').component('sdItem',{
    templateUrl: 'sdItem/template/list.html',
    controller: 'sdItemCtrl',
    bindings: {
    	list 	: "=?",
    	item 	: "=?",
    	onAdd 	: "&?",
    	onRemove: "&?"
    /*TODO*
     	disable remove
    	allowed types 
    */
    }
});