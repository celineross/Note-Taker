var fs = require("fs");

//parses data from notes, stores and retrieves notes using fs
fs.readFile("./db/db.json", "utf8", function(err, data) {
    var getNotes = JSON.parse(data);
    return getNotes;
});

