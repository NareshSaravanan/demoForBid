'use strict';

describe('Component: productList', function() {
  // load the component's module
  beforeEach(module('directives.product-list'));

  var productListComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    productListComponent = $componentController('productList', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
