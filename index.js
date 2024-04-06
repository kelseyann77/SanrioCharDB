var express = require('express');
var mongoose = require('mongoose');
var app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).catch(error => console.log("Something went wrong: " + error));

// Replaced carModel with sanrioChar
var sanrioChar = require("./sanrio/characters");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());

app.get("/form", function(req, res){
    res.render("pages/form");
});

app.get("/garage", function(req,res) {
    sanrioChar.listAllCars().then(function(cars){
        res.render("pages/garage", {cars:cars});
    }).catch(function(error){ 
        res.error("Something went wrong!" + error );
    });
    
})

app.post('/car', function(req, res){
    console.log("Car: " + JSON.stringify(req.body.car));
    var newCar = new sanrioChar(req.body.car);
    
    newCar.save().then(function(){
        res.send("Added new car to database!");
    }).catch(function(err){
        res.err("Failed to add new car to database!");
    });
});

app.listen(port, function() {
  console.log("App listening on port " + port + " !");
});