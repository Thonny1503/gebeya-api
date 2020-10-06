/*
 * Here we will define all the routes regarding post 
 */

//Importing express
const express = require('express');

//Importing the controller
const apiController = require('../controllers/app.controller');

//Declaring a variable to acces the router method 
const router = express.Router();

router.post("/login", apiController.login);
router.post("/save", apiController.verifyToken, apiController.save);
router.get("/find/:id", apiController.verifyToken, apiController.find);
router.get("/findAll", apiController.verifyToken, apiController.all);
router.patch("/update/:id", apiController.verifyToken, apiController.update);
router.delete("/delete/:id", apiController.verifyToken, apiController.deleteProduct);

module.exports = router;