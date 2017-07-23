'use strict';
const angular = require('angular');

export class productListComponent {
  bidObject : {};
  /*@ngInject*/
  constructor($location,$http) {
    this.$location = $location;
    this.message = 'World';
    this.$http = $http;
  }
  addBid(){
    debugger;
    this.$http.put('http://192.168.1.71:5000/api/products/'+this.model.name+'/bid',{
      user : this.model.user || "syed",
      price : this.bidObject.price
    }).then(response => {
          this.data = response.data;
          this.socket.syncUpdates('thing', this.awesomeThings);
        });
  }
  navigateToBidPage(){
   this.$location.path('/product/'+ this.model.name);
  }
}

export default angular.module('directives.product-list', [])
  .component('productList', {
    template: require('./product-list.html'),
    bindings: { model: '<' },
    controller: productListComponent,
    controllerAs: 'productListCtrl'
  })
  .name;
