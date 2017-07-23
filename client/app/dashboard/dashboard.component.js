'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './dashboard.routes';

export class DashboardComponent {
  /*@ngInject*/

  constructor($http, $scope, socket,$location) {
    this.$http = $http;
    this.socket = socket;
    this.$location = $location;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  
  $onInit() {
    this.$http.get('http://192.168.1.71:5000/api/products')
      .then(response => {
        this.data = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }


}

export default angular.module('meanStackApp.dashboard', [uiRouter])
  .config(routes)
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: DashboardComponent,
    controllerAs: 'dashboardCtrl'
  })
  .name;
