import 'dotenv/config';
import * as habits from './habits_model.mjs';
import express from 'express';

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
                res.status(200).json(habit)
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

app.put('/habits/:_id', (req, res) => {
    habits.replaceHabit(
        req.params._id,
        req.body.name,
        req.body.dates_accomp
    )

    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({
                _id: req.params._id,
                name: req.body.name,
                dates_accomp: req.body.dates_accomp
            })
        } else {
            res.status(404).json({ Error: 'Document not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request to update a document failed'});
    });
});

//Add New Habit
app.post('/habits', (req,res) => {
    habits.createHabit(
        req.body.name,
        req.body.dates_accomp
    )
    .then(habit => {
        res.status(201).json(habit);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({error: 'Invalid Request'});
    })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`); 
});
