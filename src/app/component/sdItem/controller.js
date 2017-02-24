angular.module('app').controller('sdItemCtrl',function($scope, $element, $attrs){
	var $ctrl = this;
	
	angular.extend(this, {
		'getMode' 	: function(){
			return $attrs.list?'list':($attrs.item?'item':false);
		},
		'canRemove' 	: function(){
			return angular.isArray($ctrl.list);
		},
		'removeItem'	: function(item){
			if(angular.isFunction($ctrl.onRemove)){
				$ctrl.onRemove({
						'item' 	: item,
						'list'	: $ctrl.list
					});
			}
			$ctrl.list.splice($ctrl.list.indexOf(item),1);
		},
		'addChildItem' 	: function(item){
		//Checking structure
			item.$object = item.$object||{};
			item.$object.$children = item.$object.$children||[];
		//Pushing new Child Item
			var newChildItem = {};
			if(angular.isFunction($ctrl.onAdd)){
				$ctrl.onAdd({
					'item' 	: newChildItem,
					'list'	: item.$object.$children
				});
			}
			item.$object.$children.push(newChildItem);
		},
		'onAddWrapper' 		: angular.isFunction($ctrl.onAdd)?function(item,list){
			return $ctrl.onAdd({
					'item' 	: item,
					'list'	: list
				});
		}:undefined,
		'onRemoveWrapper'	: angular.isFunction($ctrl.onRemove)?function(item,list){
			return $ctrl.onRemove({
					'item' 	: item,
					'list'	: list
				});
		}:undefined
	});
	(function init(){
		if($attrs.list && !$attrs.item){
			$ctrl.list = $ctrl.list||[];
		}else if(!$attrs.list && $attrs.item){
			$ctrl.item = $ctrl.item||[];
		}else if(!$attrs.list && !$attrs.item){
			throw "Component sdItem: Missing required source param: no item or list provided";
		}
	})();
});