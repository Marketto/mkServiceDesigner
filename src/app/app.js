import angular from 'angular';
// Material design css
import 'angular-material/angular-material.css';
import 'bootstrap/dist/css/bootstrap.css';
// Animation
import 'angular-animate';
// Materail Design lib
import 'angular-material';
// DnD List
import 'angular-drag-and-drop-lists';
// File saver
import 'angular-file-saver';
// File uploader
import 'ng-file-upload';

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

angular.module(MODULE_NAME, ['ngMaterial', 'dndLists', 'ngFileSaver', 'ngFileUpload'])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./sd/', true, /\.js$/));
requireAll(require.context('./filter/', true, /\.js$/));
requireAll(require.context('./factory/', true, /\.js$/));

export default MODULE_NAME;