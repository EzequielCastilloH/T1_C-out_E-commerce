const mongoose = require('mongoose')
const Product = require('../models/Invoice')
const jwt = require('jsonwebtoken')
const Invoice = require('../models/Invoice')

//getInvoice
const getInvoice = (req,res) => {
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
    Product.find((err, invoices) => {
        err && res.status(500).send(err.message)
        res.status(200).json(invoices)
    })
}

//add invoice
const addInvoice = (req, res) => {
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
    const products = req.body.productsToShop
    let invoice = new Invoice({
        date: req.body.date,
        products: modifyProducts(products),
        subTotal: calculateSubTotal(products),
        iva: calculateIva(products),
        total: calculateTotal(products)
    })
    invoice.save((err,inv) => {
        err && res.status(500).send(err.message)
        res.status(200).send(inv)
    })
}

const modifyProducts = (products) => {
    products.map(p => {
        p.total = calculatePriceForProduct(p)
    })
    return products
}

const calculateSubTotal = (products) => {
    let subtotal = 0
    products.map(p => {
        subtotal = subtotal + p.total
    })
    return subtotal
}

const calculateIva = (products) => {
    const subTotal = calculateSubTotal(products)
    return subTotal * 0.12
}

const calculateTotal = (products) => {
    const subTotal = calculateSubTotal(products)
    const iva = calculateIva(products)
    return subTotal + iva
}

const calculatePriceForProduct = (product) => {
    return product.newQuantity*product.prodPrice
}

module.exports = {getInvoice,addInvoice}