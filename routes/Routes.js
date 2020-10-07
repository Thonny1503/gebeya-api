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
 * components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 * /save:
 *   post:
 *      security:
 *          bearerAuth: []
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
 *                              type: integer
 *                              description: 'Price '
 *                          quantity:
 *                              type: number
 *                              description: "Quantity "
 *                          imageURL:
 *                              type: string
 *                              description: "Image path"
 *                          vendor_name:
 *                              type: string
 *                              description: "Vendor name"
 *                          category_name:
 *                              type: string
 *                              description: "Category "
 *      responses:
 *          200:
 *              description: correct
 *          500:
 *              description: wrong
 */
router.post("/save", apiController.verifyToken, apiController.save);

/**
 * @swagger
 * components:
 *     securitySchemes:
 *       bearerAuth:
 *              type: http 
 *              scheme: bearer 
 *              bearerFormat: JWT
 * /find/{id}:
 *   get:
 *      components:
 *          securitySchemes:
 *              bearerAuth:
 *                  type: http
 *                  scheme: bearer
 *                  bearerFormat: JWT
 *      security:
 *          bearerAuth: []
 *      summary: find
 *      description: "Find a product by ID"
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: "Product ID"
 *              required: true
 *              schema:
 *                  type: integer 
 *                  format: int64   
 *      responses:
 *          200:
 *              description: correct
 *          500:
 *              description: wrong
 */
router.get("/find/:id", apiController.verifyToken, apiController.find);

/**
 * @swagger
 * /findAll:
 *   get:
 *      security:
 *          bearerAuth: []
 *      summary: findAll
 *      description: "Find all products"
 *      responses:
 *          200:
 *              description: correct
 *          500:
 *              description: wrong
 */
router.get("/findAll", apiController.verifyToken, apiController.all);

/**
 * @swagger
 * 
 * /update/{id}:
 *   patch:
 *      security:
 *          bearerAuth: []
 *      summary: udpate
 *      parameters:
 *              -   name: id
 *                  in: path
 *                  description: "Product ID"
 *                  required: true
 *                  schema:
 *                      type: integer
 *              -   name: 
 *                  description : 'request body'
 *                  in: body
 *                  schema:
 *                      properties:
 *                          productName:
 *                              type: string
 *                              description: 'Product name'
 *                          description:
 *                              type: string
 *                              description: 'Product description'
 *                          price:
 *                              type: integer
 *                              description: 'Price '
 *                          quantity:
 *                              type: number
 *                              description: "Quantity "
 *                          imageURL:
 *                              type: string
 *                              description: "Image path"
 *                          vendor_name:
 *                              type: string
 *                              description: "Vendor name"
 *                          category_name:
 *                              type: string
 *                              description: "Category "
 *                  
 *      description: "Update a product"                  
 *      responses:
 *          200:
 *              description: correct
 *          500:
 *              description: wrong
 */
router.patch("/update/:id", apiController.verifyToken, apiController.update);

/**
 * @swagger
 * 
 * /delete/{id}:
 *   delete:
 *      security:
 *          bearerAuth: []
 *      summary: delete
 *      description: "delete a product by ID"
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: "Product ID"
 *              required: true
 *              schema:
 *                  type: integer    
 *      responses:
 *          200:
 *              description: correct
 *          500:
 *              description: wrong
 */
router.delete("/delete/:id", apiController.verifyToken, apiController.deleteProduct);

/**
 * @swagger
 * 
 * /addOrder/{id}:
 *   get:
 *      security:
 *          bearerAuth: []
 *      summary: order
 *      description: "Add an order with ID client"
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: "client id"
 *              required: true
 *              schema:
 *                  type: integer    
 *      responses:
 *          200:
 *              description: correct
 *          500:
 *              description: wrong
 */
router.get("/addOrder/:id", apiController.verifyToken, orderController.addOrder);

/**
 * @swagger
 * 
 * /addToCart:
 *   post:
 *      security:
 *          bearerAuth: []
 *      summary: add
 *      description: "Add a product to cart"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          product_id:
 *                              type: integer 
 *                              description: 'Product id'
 *                          price_product:
 *                              type: integer
 *                              description: 'Price '
 *                          quantity:
 *                              type: number
 *                              description: "Quantity "
 *                          order_id:
 *                              type: number
 *                              description: "Order id"
 *      responses:
 *          200:
 *              description: correct
 *          500:
 *              description: wrong
 */
router.post("/addToCart", apiController.verifyToken, orderController.addCart);

/**
 * @swagger
 * 
 * /remove:
 *   delete:
 *      security:
 *          bearerAuth: []
 *      summary: delete
 *      description: "remove a product to cart"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          id:
 *                              type: integer 
 *                              description: 'cart id'
 *                          quantity:
 *                              type: number
 *                              description: "Quantity "
 *                          product_id:
 *                              type: number
 *                              description: "Product id"
 *      responses:
 *          200:
 *              description: correct
 *          500:
 *              description: wrong
 */
router.delete("/remove", apiController.verifyToken, orderController.remove);


/**
 * @swagger
 * 
 * /getOrder/{order}:
 *   get:
 *      security:
 *          bearerAuth: []
 *      summary: get 
 *      description: "Get order details"
 *      parameters:
 *          -   name: order
 *              in: path
 *              description: "order id"
 *              required: true
 *              schema:
 *                  type: integer  
 *                  format: int64  
 *      responses:
 *          200:
 *              description: correct
 *          500:
 *              description: wrong
 */
router.get("/getOrder/:order", apiController.verifyToken, orderController.detail)
module.exports = router;