const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const habitSchema = new Schema({
    date: {type: Number, required: true},
    habitName: {type: String, required: true}, 
    completed: {type: Boolean, required: true}, 
}, {
    timestamps: true
}); 

const Habit = mongoose.model('Habit', habitSchema); 

module.exports = Habit; 