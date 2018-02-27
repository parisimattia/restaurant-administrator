var express = require ('express');
var router = express.Router ();
var orders = require ('restaurant-package');

router.get ('/', function(req,res){
  if (req.query.client == undefined){
    res.status(200).json(orders.ordersList());
  } else if (req.query.client == 'Pippo' || req.query.client == 'Caio' || req.query.client == 'Sempronio'){
    res.status(200).json(orders.ordersByClients(req.query.client));
  } else {
    res.status(400).json({message : 'Error'})
  }
})

router.get ('/total', function(req,res){
  res.status(200).json(orders.profit());
})

router.get('/:status', function (req,res){
  if (req.params.status == 'new'
      ||req.params.status == 'ready'
      || req.params.status == 'closed'){
    res.status(200).json(orders.getOrderByStatus(req.params.status));
  } else{
    res.status(400).json({message : 'Error, invalid status'});
  }
})

router.delete('/:code', function (req,res){
  var index = orders.getOrderIndex(req.params.code);

  if (Number.isInteger(parseInt(req.params.code)) && req.params.code >= 0 && index != null && index!= "error"){
    res.status(200).json(orders.deleteOrder(req.params.code));
  } else if (products.getOrderIndex(req.params.code) == null){
    res.status(404).json({ message : 'Source not found'});
  } else {
    res.status(400).json({message : 'Invalid id'});
  }
})

router.put('/:code', function (req,res){
  var index = orders.getOrderIndex(req.params.code);

  if (Number.isInteger(parseInt(req.params.code)) && req.params.code >= 0  && index != null && index != "error"
      &&  (req.query.status == 'ready'|| req.query.status == 'closed')){
    res.status(200).json(orders.setOrder(req.params.code,req.query.status));
  } else if (index == null){
    res.status(404).json({ message : 'Source not found'});
  } else {
    res.status(400).json({ message : 'ERROR!'})
  }
})

module.exports = router;
