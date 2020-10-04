//required dependencies
var express = require("express");
var path = require("path");

//connect route files
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

//setting up express
var app = express();
var PORT = process.env.PORT || 8080;

//data parsing for express
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//start server to begin listening
app.listen(PORT, function() {
    console.log("Note Taker is listening on PORT " + PORT);
})