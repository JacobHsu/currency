var express = require('express');
var app = express();
var fx = require('./lib/currency');

fx.rate('TWD').then(console.log);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 5000);