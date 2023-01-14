mongoose = require("mongoose"); 

/**
 * Define the schema
 */
const habitSchema = mongoose.Schema({
    date: {type: Number, required: true},
    habit: {type: String, required: true}, 
    completed: {type: Boolean, required: true}
});

/**
 * Compile the model from the schema
 */
const Habit = mongoose.model("Habit", habitSchema); 