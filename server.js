//Importing HTTP
const http = require('http');

//Importing the application
const app = require('./app')

//Defining a port
const port = 5000

//Creating the server
const server = http.createServer(app);

//Adding a listener to the port 
server.listen(port);