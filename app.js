//Importing Express
const express = require('express');

//Importing bodyParser
const bodyParser = require('body-parser');



/*
 * Creating an instance of express 
 * for accessing HTTP methods like get, post, patch, etc
 */
const app = express();

const routes = require('./routes/Routes')

module.exports = app

app.use(bodyParser.json());

app.use("/", routes)