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

app.get("/api/notes", function (req, res) {
    readFileAsync("./db/db.json", "utf8")
        .then(function (data, err) {
            if (err)
                console.log(err);
            return res.json(JSON.parse(data));
        });
});

//any input displays index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

//function to set up note posts
app.post("/api/notes", function (req, res) {
    var newNote = req.body;

    //use promise to check for errors
    readFileAsync(".db/db.json", "utf8")
        .then(function (data, err) {
            if (err)
                console.log(err);
            return Promise.resolve(JSON.parse(data));

        //use promise to check the note and push it to the page
        }).then(function (data) {
            newNote.idx = getPrevIndex(data) + 1;
            (data.length > 0) ? data.push(newNote) : data = [newNote];
            return Promise.resolve(data);

        //write file to .json file
        }).then(function (data) {
            writeFileAsync("./db/db.json", JSON.stringify(data));
            res.JSON(newNote);

        //error catch
        }).catch(function (err) {
            if (err)
                throw err;
        });
});

//delete a note
app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;

    //use promise to check for errors
    readFileAsync("./db/db.json", "utf8")
        .then(function (data, err) {
            if (err)
                console.log(err);
            return Promise.resolve(JSON.parse(data));
        
        //finds the index of a piece of data and splices it out
        }).then(function (data) {
            data.splice(data.indexOf(data.find(function (element) {
                element.id = id;
            })), 1);
            return Promise.resolve(data);
        //writes note as string and stores in db.json, sends done message
        }).then(function (data) {
            writeFileAsync("./db/db.json", JSON.stringify(data));
            res.send("Done")
        //error catch
        }).catch(function (err) {
            if (err)
            throw err;
        });
});

//helper function to get index
function getPrevIndex(data) {
    if (data.length > 0)
    return data[data.length - 1].id;
    return 0;
}

//start server to begin listening
app.listen(PORT, function () {
    console.log("Note Taker is listening on PORT " + PORT);
})