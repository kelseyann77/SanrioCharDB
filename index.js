var express = require('express');
var mongoose = require('mongoose');
var app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).catch(error => console.log("Something went wrong: " + error));

// Replaced carModel with sanrioChar
// Replaced /models/car (car.js) with 
// var carModel = require("./models/car");
var sanrioChar = require("./sanrio/characters");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());

app.get("/form", function(req, res){
    res.render("pages/form");
});


// app.get("/garage", function(req,res) {
app.get("/collection", function(req,res) {
    // carModel.listAllCars().then(function(cars){
    sanrioChar.listAllCharacters().then(function(characters){
        res.render("pages/collection", {characters:characters});
    }).catch(function(error){ 
        res.error("Something went wrong!" + error );
    });
    
})

// app.post('/car', function(req, res){
app.post('/character', function(req, res){
    console.log("Character: " + JSON.stringify(req.body.character));
    // var newCar = new carModel(req.body.car);
    var newCharacter = new sanrioChar(req.body.character);
    
    newCharacter.save().then(function(){
        res.send("Added new character to database!");
    }).catch(function(err){
        res.err("Failed to add new character to database!");
    });
});

app.listen(port, function() {
  console.log("App listening on port " + port + " !");
});