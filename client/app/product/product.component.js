'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './product.routes';

export class ProductComponent {
  /*@ngInject*/
  constructor($http, $scope,$stateParams) {
    this.$http = $http;
    this.productName = $stateParams.productName
  } 

  $onInit() {
    this.$http.get('http://192.168.1.71:5000/api/products/'+this.productName)
      .then(response => {
        this.data = response.data;
      });
  }
}

export default angular.module('meanStackApp.product', [uiRouter])
  .config(routes)
  .component('product', {
    template: require('./product.html'),
    controller: ProductComponent,
    controllerAs: 'productCtrl'
  })
  .name;
