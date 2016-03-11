var express = require('express');
var app = express();
var fx = require('./lib/currency');

app.get('/', function (req, res) {
    fx.rate('TWD').then(function(ret){
        console.log(ret);
        var d = new Date(); 
        res.send(d+'<p>'+JSON.stringify(ret)+'</p>'); 
    });

});

app.listen(process.env.PORT || 5000);