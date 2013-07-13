var express = require('express');
var app = express();

var fs = require('fs');

app.get('/', function(request, response) {
var inputfile = fs.readFileSync("index.html", "utf8");
  response.send(inputfile);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


