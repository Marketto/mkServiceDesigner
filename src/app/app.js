import angular from 'angular';
// Material design css
import 'angular-material/angular-material.css';
// Animation
import angularAnimate from 'angular-animate';
// Materail Design lib
import angularMaterial from 'angular-material';
// DnD List
import dndLists from 'angular-drag-and-drop-lists';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngMaterial', 'dndLists'])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./sd/', true, /\.(?:js|html)$/));

export default MODULE_NAME;