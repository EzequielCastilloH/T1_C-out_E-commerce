const mongoose = require('mongoose')
const Product = require('../models/Product')
const jwt = require('jsonwebtoken')

//Add Product
const addProduct = (req, res) => {
    const authorization = req.get('authorization')
    let token = ''
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    let decodedToken = {}
    try{
        decodedToken = jwt.verify(token,'awd')
    }catch(e){
        console.log(e)
    }
    if(!token || !decodedToken.id){
        return res.status(401).json({error: 'token missing or invalid'})
    }

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
    const authorization = req.get('authorization')
    let token = ' '
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    let decodedToken = {}
    try{
        decodedToken = jwt.verify(token,'awd')
    }catch(e){
        console.log(e)
    }
    if(!token || !decodedToken.id){
        return res.status(401).json({error: 'token missing or invalid'})
    }
    Product.find((err, products) => {
        err && res.status(500).send(err.message)
        res.status(200).json(products)
    })
}

//GetProductsByType
const getProductsByType = (req, res) => {
    const authorization = req.get('authorization')
    let token = ''
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    let decodedToken = {}
    try{
        decodedToken = jwt.verify(token,'awd')
    }catch(e){
        console.log(e)
    }
    if(!token || !decodedToken.id){
        return res.status(401).json({error: 'token missing or invalid'})
    }
    Product.find({type: req.body.type}, (err, products) => {
       err && res.status(500).send(err.message)
       res.status(200).json(products)
    })
}

//Update Price of Product
const updatePriceProduct = (req, res) => {
    const authorization = req.get('authorization')
    let token = ''
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    let decodedToken = {}
    try{
        decodedToken = jwt.verify(token,'awd')
    }catch(e){
        console.log(e)
    }
    if(!token || !decodedToken.id){
        return res.status(401).json({error: 'token missing or invalid'})
    }
    
    try{
        Product.findOneAndUpdate({name: req.body.name},{price: req.body.price},(err,prod) => {
            err && res.status(501).send(err.message)
            res.status(200).send(prod)
        })
    }catch(e){
        res.status(404).send({error: "Product is not found"})
    }
}

//Update Quantity of Product
const updateQuantityProduct = (req, res) => {
    const authorization = req.get('authorization')
    let token = ''
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    let decodedToken = {}
    try{
        decodedToken = jwt.verify(token,'awd')
    }catch(e){
        console.log(e)
    }
    if(!token || !decodedToken.id){
        return res.status(401).json({error: 'token missing or invalid'})
    }
    try{
        Product.findOneAndUpdate({name: req.body.name},{quantity: req.body.quantity}, (err, prod) => {
            err && res.status(501).send(err.message)
            res.status(200).send(prod)
        })
    }catch(e){
        res.status(404).send({error: "Product is not found"})
    }
}

const updateQuantityProductShop = (req, res) => {
    const authorization = req.get('authorization')
    let token = ''
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    let decodedToken = {}
    try{
        decodedToken = jwt.verify(token,'awd')
    }catch(e){
        console.log(e)
    }
    if(!token || !decodedToken.id){
        return res.status(401).json({error: 'token missing or invalid'})
    }
    try{
        let newQ = req.body.quantity - req.body.newQuantity
        Product.findOneAndUpdate({name: req.body.name},{quantity: newQ}, (err, prod) => {
            err && res.status(501).send(err.message)
            res.status(200).send(prod)
        })
    }catch(e){
        res.status(404).send({error: "Product is not found"})
    }
}

//Delete Product
const deleteProduct = (req,res) => {
    const authorization = req.get('authorization')
    let token = ' '
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    let decodedToken = {}
    try{
        decodedToken = jwt.verify(token,'awd')
    }catch(e){
        console.log(e)
    }
    if(!token || !decodedToken.id){
        return res.status(401).json({error: 'token missing or invalid'})
    }
    try{
        Product.findOneAndDelete({name: req.body.name}, (err, prod) => {
            err && res.status(501).send(err.message)
            res.status(200).send(prod)
        })
    }catch(e){
        res.status(404).send({error: "Product is not found"})
    }
}

module.exports = {addProduct, getProducts, getProductsByType, updatePriceProduct, deleteProduct, updateQuantityProduct, updateQuantityProductShop}