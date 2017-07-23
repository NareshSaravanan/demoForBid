'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('product', {
      url: '/product/:productName',
      template: '<product></product>'
    });
}
