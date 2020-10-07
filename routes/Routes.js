/*
 * Here we will define all the routes regarding post 
 */

//Importing express
const express = require('express');

//Importing the controller
const apiController = require('../controllers/app.controller');

const orderController = require('../controllers/order.controller');

//Declaring a variable to acces the router method 
const router = express.Router();


/**
 * @swagger
 * 
 * /login:
 *   post:
 *      summary: login
 *      description: "log a client"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          password:
 *                               type: string 
 *                               description: "password of client"
 *                          email:
 *                              type: string
 *                              description: "email of client"
 *      responses:
 *          200:
 *              description: correct
 *          500:
 *              description: wrong
 */
router.post("/login", apiController.login);

/**
 * @swagger
 * 
 * /save:
 *   post:
 *      summary: Save
 *      description: "Save a product"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          productName:
 *                              type: string 
 *                              description: 'Product name'
 *                          description:
 *                              type: string
 *                              description: 'Product description'
 *                          price:
 *                              type:double
 *                              description: 'Price '
 *                          quantity:
 *                              type:int
 *                              description: "Quantity "
 *                          imageURL:
 *                              type:string
 *                              description: "Image path"
 *                          vendor_name:
 *                              type:string
 *                              description: "Vendor name"
 *                          category_name:
 *                              type:string
 *                              description: "Category "
 *      responses:
 *          200:
 *              description: correct
 *          500:
 *              description: wrong
 */

router.post("/save", apiController.verifyToken, apiController.save);
router.get("/find/:id", apiController.verifyToken, apiController.find);
router.get("/findAll", apiController.verifyToken, apiController.all);
router.patch("/update/:id", apiController.verifyToken, apiController.update);
router.delete("/delete/:id", apiController.verifyToken, apiController.deleteProduct);
router.get("/addOrder/:id", apiController.verifyToken, orderController.addOrder);
router.post("/addToCart", apiController.verifyToken, orderController.addCart);
router.delete("/remove", apiController.verifyToken, orderController.remove);
router.get("/getOrder/:order", apiController.verifyToken, orderController.detail)
module.exports = router;