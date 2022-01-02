const mongoose = require('mongoose')
const Product = require('../models/Product')

//Add Product
const addProduct = (req, res) => {
    let product = new Product({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
    })
    product.save((err, prod) => {
        err && res.status(500).send(err.message)
        res.status(200).json(prod)
    })
}

//Get Products
const getProducts = (req,res) => {
    Product.find((err, products) => {
        err && res.status(500).send(err.message)
        res.status(200).json(products)
    })
}

//GetProductsByType
const getProductsByType = (req, res) => {
    Product.find({type: req.body.type}, (err, products) => {
       err && res.status(500).send(err.message)
       res.status(200).json(products)
    })
}

module.exports = {addProduct, getProducts, getProductsByType}