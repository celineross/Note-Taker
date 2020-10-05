//required dependencies
var express = require("express");
var path = require("path");
var util = require("util");
var fs = require("fs");

//setting up express
var app = express();
var PORT = process.env.PORT || 8080;

//set up promises for later use
var readFileAsync = util.promisify(fs.readFile);
var writeFileAsync = util.promisify(fs.writeFile);

//data parsing for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//display homepage
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

//display notes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("/notes", function (req, res) {
    readFileAsync("./db/db.json", "utf8")
        .then(function (data, err) {
            if (err)
                console.log(err);
            return res.json(JSON.parse(data));
        })
})


//start server to begin listening
app.listen(PORT, function () {
    console.log("Note Taker is listening on PORT " + PORT);
})