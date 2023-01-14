import 'dotenv/config';
import * as habits from './habits_model.mjs';
import express from 'express';
import {body, validationResult} from 'express-validator';

const port = process.env.PORT;

// create instance of express
const app = express();

app.use(express.json());

/**
 * Add a new habit to the db with the specified date, name, and completion status.
 */
// app.post();

/**
 * Retrieves all habits currently in the db.
 */
app.get('/habits', (req, res) => {
    let filter = {};
    habits.findHabits(filter, '', 0)
        .then(habit => {
            if (habit !== null) {
                res.status(200).json(exercise)
            } else {
                res.status(404).json({ Error: "Not found" })
            }
        }) 
        // catch and log errors in retrieving habits
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed.' })
        });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`); 
});
