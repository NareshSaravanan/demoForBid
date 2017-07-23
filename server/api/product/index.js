import {Router} from 'express';
var router = new Router();
// var bodyParser = require('body-parser');
 var expressWs = require('express-ws')(router);
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());





/** Products - Rest enpoint implementation  **/
var productsService = require('./products-service');

router.get('/api/products', function (req, res) {
    res.send(productsService.getProducts());
});

router.get('/api/products/:productName', function (req, res) {
    var productName = req.params.productName;
    if(productsService.isValidProduct(productName)) {
        res.send(productsService.getProduct(productName));
    } else {
        res.status("500").send("Invalid product !!");
    } 
});

router.put('/api/products/:productName/bid', function (req, res) {
    var productName = req.params.productName,
        bid = {
          user: req.body.user,
          price: req.body.price
        }; 
        product = productsService.getProduct(productName); 
    if(product) {
        productsService.bid(productName, bid);
        res.send(product);
        sendProductUpdate(product);
    } else {
        res.status("500").send("Invalid product !!");
    }
});

sendProductUpdate = function (product) {
    var aWss = expressWs.getWss('/ws');
    aWss.clients.forEach(function (client) {
      client.send(JSON.stringify(product));
    });
}

/**  Webscoket Implementation **/

router.ws('/ws', function(ws, req) {
  ws.on('message', function(msg) {
    readWriteAsync(msg);
  });
  //Send all products for when ws connection open
  ws.send(JSON.stringify(productsService.getProducts()));
  //Do ping - pong to keep connection live
  ws.on('pong', heartbeat);
});

function heartbeat() {
  console.log('hearbeat');
  this.isAlive = true;
}

//Do ping - pong to keep connection live
const interval = setInterval(function ping() {
  var wss = expressWs.getWss('/ws');
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping('', false, true);
  });
}, 30000);

router.listen(router.get('port'), function() {
  console.log('Node router is running on port', router.get('port'));
});

module.exports = router;
