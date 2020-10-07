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

const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Gebeya api',
            version: '1.0.0'
        },
    },
    apis: ['./routes/Routes.js']
};

const swaggerSpec = swaggerDoc(options);

app.use(bodyParser.json());

//url to documentation
app.use('/api-documentation', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/", routes);