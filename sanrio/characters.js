var mongoose = require("mongoose");

var sanrioSchema = new mongoose.Schema({
    name: String,
    species: String, 
    creation_year: Number,
    birthday: Date
});

sanrioSchema.statics.listAllCharacters = function() {
    return this.find({});
};

var sanrioChar = mongoose.model('character', sanrioSchema);

module.exports = sanrioChar;