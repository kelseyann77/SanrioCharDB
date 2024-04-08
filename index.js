var express = require('express');
var mongoose = require('mongoose');
var app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).catch(error => console.log("Something went wrong: " + error));

var sanrioChar = require("./sanrio/characters");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public")); 

// Take user to index home page with "/" or "/index"
app.get("/", function(req, res){
    res.render("pages/index");
});
app.get("/index", function(req, res){
    res.render("pages/index");
});

app.get("/form", function(req, res){
    res.render("pages/form");
});

app.get("/collection", function(req,res) {
    sanrioChar.listAllCharacters().then(function(characters){
        res.render("pages/collection", {characters:characters});
    }).catch(function(error){ 
        res.error("Something went wrong!" + error );
    });
    
})

app.get("/query", function(req, res){
    res.render("pages/query");
});

app.get("/before", function(req, res) {
    const creationYear = req.query.creationYear; // Retrieve the value of creationYear from the query parameters
    sanrioChar.find({ creation_year: { $lt: creationYear } }).then(function(characters) {
        res.render("pages/collection", { characters: characters });
    }).catch(function(error) {
        res.err("Failed to perform query!");
    });
});

app.get("/after", function(req, res) {
    const creationYear = req.query.creationYear; // Retrieve the value of creationYear from the query parameters
    sanrioChar.find({ creation_year: { $gt: creationYear } }).then(function(characters) {
        res.render("pages/collection", { characters: characters });
    }).catch(function(error) {
        res.err("Failed to perform query!");
    });
});

app.post('/character', function(req, res){
    console.log("Character: " + JSON.stringify(req.body.character));
    var newCharacter = new sanrioChar(req.body.character);
    
    newCharacter.save().then(function(){
        res.render("pages/form_added");
    }).catch(function(err){
        res.err("Failed to add new character to database!");
    });
});

app.listen(port, function() {
  console.log("App listening on port " + port + " !");
});