import 'dotenv/config';
import express from 'express';
import {body, validationResult} from 'express-validator';

const PORT = process.env.PORT; 

// create instance of express
const app = express();

app.use(express.json());

