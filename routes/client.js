var express = require ('express');
var router = express.Router ();
var orders = require ('restaurant-package');

router.use(function(req,res,next){
  if(req.query.token == 'Pippo' || req.query.token == 'Caio' || req.query.token == 'Sempronio'){
    next();
  } else {
    res.status(401).send({message : 'Autentication failed'});
  }
})

router.post('/', function(req,res){
  if (req.body.hasOwnProperty('list') && req.body.hasOwnProperty('bill')){
      res.status(201).json(orders.newOrder({client : req.query.token, list : req.body.list, bill : req.body.bill}))
  } else {
    res.status(400).json({message : 'ERROR'})
  }
})

router.get('/', function (req,res){
  res.status(200).json(orders.ordersByClients(req.query.token));
})

module.exports = router;
