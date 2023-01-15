import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT,
    { useNewUrlParser: true }
);

// Connect to the db
const db = mongoose.connection;
// call open event once database connection is successful
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define habitDate schema
 */
const habitDateSchema = mongoose.Schema({
    date: { type: String, required: true},
    habit_name: { type: String, required: true},
});

// Compile a model from the schema
const Habit = mongoose.model("Habit", habitSchema);