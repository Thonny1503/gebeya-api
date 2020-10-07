const models = require('../models')

//Importing JWT
const jwt = require('jsonwebtoken');

const sequelize = require('sequelize');

//To add an order
function AddOrder(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            let date_ob = new Date()
            let hours = date_ob.getHours()
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let minutes = date_ob.getMinutes();
            let seconds = date_ob.getSeconds();

            const order_number = "PT-" + date + "" + month + "/" + hours + "" + minutes + "" + seconds;
            let datetime = new Date();
            console.log(datetime);
            const order = {
                order_number: order_number,
                status: 0,
                order_date: datetime,
                client_id: req.params.id
            }

            models.Order.create(order).then(result => {
                res.status(200).json({
                    message: "done",
                    order: result
                })
            }).catch(error => {
                res.status(500).json({
                    message: "something went wrong",
                    error: error
                })
            });
        }
    })
}


//Lowering the quantity after adding product in the cart
function lowerQte(product_id, quantity) {

    let product = {

    };
    models.Product.findByPk(product_id).then(result => {
        product = {
            productName: result.productName,
            description: result.description,
            price: result.price,
            quantity: result.quantity - quantity,
            imageUrl: result.imageUrl,
            vendor_name: result.vendor_name,
            category_name: result.category_name,
            id: result.id
        };

        console.log("ICI " + product.id);
        console.log("ICI là " + result.id);

        models.Product.update(product, {
            where: {
                id: product.id
            }
        }).then(result1 => {
            console.log(result1)
        }).catch(error1 => {
            console.log(error1)
        });

    }).catch(error => {
        console.log(error)
    });

}


//To add one product to a cart
function AddCart(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const cart = {
                product_id: req.body.product_id,
                price_product: req.body.price_product,
                quantity: req.body.quantity,
                order_id: req.body.order_id
            }

            models.Cart.create(cart).then(result => {
                res.status(200).json({
                    message: "done",
                    cart: result
                })
            }).catch(error => {
                res.status(500).json({
                    message: "something went wrong",
                    error: error
                })
            });

            lowerQte(req.body.product_id, req.body.quantity)
        }
    })
}

//highlighting the quantity after removing a product in the cart 
function highlightQte(product_id, quantity) {

    let product = {

    };
    models.Product.findByPk(product_id).then(result => {
        product = {
            productName: result.productName,
            description: result.description,
            price: result.price,
            quantity: result.quantity + quantity,
            imageUrl: result.imageUrl,
            vendor_name: result.vendor_name,
            category_name: result.category_name,
            id: result.id
        };

        console.log("ICI " + product.id);
        console.log("ICI là " + result.id);

        models.Product.update(product, {
            where: {
                id: product.id
            }
        }).then(result1 => {
            console.log(result1)
        }).catch(error1 => {
            console.log(error1)
        });

    }).catch(error => {
        console.log(error)
    });

}

//To delete a product from cart 
function removeFromCart(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const cart_id = req.body.id;

            models.Cart.destroy({
                where: {
                    id: cart_id
                }
            }).then(result => {
                res.status(200).json({
                    message: "done",
                    cart: result
                })
            }).catch(error => {
                res.status(500).json({
                    message: "something went wrong",
                    error: error
                })
            });
        }
        highlightQte(req.body.product_id, req.body.quantity);
    })
}

//Get detail of the cart
function getOrderDetail(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            models.Cart.findAll({
                attributes: ['product_id', 'price_product', 'quantity'],
                where: {
                    order_id: req.params.order
                }
            }).then(result => {
                res.status(200).json(result)
            }).catch(error => {
                res.status(500).json({
                    message: "something went wrong",
                    error: error
                })
            });
        }
    })

}

module.exports = {
    addOrder: AddOrder,
    addCart: AddCart,
    remove: removeFromCart,
    detail: getOrderDetail
}