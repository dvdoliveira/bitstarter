var express = require('express');
var app = express.createServer(express.logger());

var fs  = require('fs');
var inputfile = fs.readFileSync('index.html');
var buf = new Buffer(inputfile);
var out = buf.toString(0,buffer.length);

app.get('/', function(req, res) {
  res.set('Content-Type', 'text/html');
  res.send('out');
});

Var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

