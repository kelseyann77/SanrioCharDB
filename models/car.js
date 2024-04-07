var mongoose = require("mongoose");

// Replaced carSchema with sanrioSchema
// var sanrioSchema = new mongoose.Schema({
//     character_name: String,
//     species: String, 
//     creation_year: Number,
//     birthday: Date
// });

// sanrioSchema.statics.listAllCars = function() {
//     return this.find({});
// };

// var sanrioChar = mongoose.model('car', sanrioSchema);

// module.exports = sanrioChar;

var carSchema = new mongoose.Schema({
    make: String,
    model: String, 
    year: Number,
    color: String
});

carSchema.statics.listAllCars = function() {
    return this.find({});
};

var carModel = mongoose.model('car', carSchema);

module.exports = carModel;