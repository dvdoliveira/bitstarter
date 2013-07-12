var express = require('express');
var app = express.createServer(express.logger());

var fs  = require('fs');
var inputfile = fs.readFileSync('index.html');
var buf = new Buffer(inputfile);
var out = buf.toString(0,buffer.length);

app.get('/', function(request, response) {
  response.send(inputfile);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

