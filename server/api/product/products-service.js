var productsService = (function () {

    var products = require('../data/products');

    var getProducts = function () {
        return products;
    }
    
    var getProduct = function (productName) {
        return products.find(function findCherries(product) { 
            return product.name === productName;
        });
    }

    var bid =  function (productName, bid) {
        var product = getProduct(productName);
        if (!product.activites) {
            product.activites = [];
        }
        product.lastBid = bid;
        product.activites.push(bid);
    }

    var isValidProduct = function (productName) {
        return !!getProduct(productName);
    }

    return {
        getProducts: getProducts,
        getProduct: getProduct,
        bid: bid,
        isValidProduct:isValidProduct
    }

})();

module.exports = productsService;