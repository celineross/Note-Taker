const { response } = require("express");
//this should be the only file that I'm changing
//everything else is written
//connect everything together

var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
    console.log("Note Taker is listening on PORT " + PORT);
})