import 'dotenv/config';
import * as habits from './habits_model.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';

const port = process.env.PORT;

// create instance of express
const app = express();

app.use(express.json())

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`); 
});