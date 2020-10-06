const models = require('../models')

//Importing JWT
const jwt = require('jsonwebtoken');

//Verifying token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();
    } else {
        res.sendStatus(403);
    }
}

function login(req, res) {

    const email = req.body.email;
    const password = req.body.password;

    models.Client.findAll({
        where: {
            email: email,
            password: password
        }
    }).then(result => {
        if (result) {
            const client = result;
            jwt.sign({
                client: client
            }, 'secretkey', (err, token) => {
                res.json({
                    token: token
                })
            }, {
                expiresIn: "300m"
            });
        } else {
            res.status(404).json({
                message: "Not found",
            })
        }

    }).catch(error => {
        res.status(500).json({
            message: "something went wrong",
            error: error
        })
    });

}

function saveProduct(req, res) {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const post = {
                productName: req.body.productName,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                imageUrl: req.body.imageUrl,
                vendor_name: req.body.vendor_name,
                category_name: req.body.category_name
            }

            models.Product.create(post).then(result => {
                res.status(200).json({
                    message: "done",
                    post: result
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

function findProduvtByID(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const id = req.params.id;

            models.Product.findByPk(id).then(result => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(404).json({
                        message: "Not found",
                    })
                }

            }).catch(error => {
                res.status(500).json({
                    message: "something went wrong",
                    error: error
                })
            });
        }
    })
}

function getAll(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            models.Product.findAll().then(result => {
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

function update(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const product_id = req.params.id;

            const updatedProduct = {
                productName: req.body.productName,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                imageUrl: req.body.imageUrl,
                vendor_name: req.body.vendor_name,
                category_name: req.body.category_name
            }

            models.Product.update(updatedProduct, {
                where: {
                    id: product_id
                }
            }).then(result => {
                res.status(200).json({
                    message: "done",
                    post: updatedProduct
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

function deleteProduct(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const product_id = req.params.id;

            models.Product.destroy({
                where: {
                    id: product_id
                }
            }).then(result => {
                res.status(200).json({
                    message: "done",
                    post: result
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

module.exports = {
    verifyToken: verifyToken,
    login: login,
    save: saveProduct,
    find: findProduvtByID,
    all: getAll,
    update: update,
    deleteProduct: deleteProduct
}