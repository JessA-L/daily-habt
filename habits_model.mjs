import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT,
    { useNewUrlParser: true }
);

// Connect to the db
const db = mongoose.connection;
// call open event once database connection is successful
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Habits collection using Mongoose.');
    }
});

/**
 * Define habitDate schema
 */
const habitSchema = mongoose.Schema({
    name: { type: String, required: true},
    dates_accomp: { type: Array, required: true},
});

// Compile a model from the schema
const Habit = mongoose.model("Habit", habitSchema);

const createHabit = async (name, dates_accomp) => {
    const habit = new Habit({
        name: name,
        dates_accomp: dates_accomp
    });
    return habit.save();
}

const findHabits = async(filter) => {
    const query = Habit.find(filter);
    return query.exec();
}

const replaceHabit = async(_id, name, dates_accomp) => {
    const result = await Habit.replaceOne({_id: _id}, {
        name: name,
        dates_accomp: dates_accomp
    }, {runValidators: true});
    return result.modifiedCount;
}

export {createHabit, findHabits, replaceHabit}