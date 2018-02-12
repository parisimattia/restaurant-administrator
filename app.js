var express = require ('express');
var app = express ();
var client = require ('./routes/client')
var admin = require ('./routes/admin')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/client', client);

app.use(function(req,res,next){
  if(req.query.token == 'admin'){
    next();
  }else {
    res.status(401).send({message : 'Autentication failed'});
  }
})

app.use('/admin', admin);

var port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log("App is running on port " + port);
});

module.exports = app;
