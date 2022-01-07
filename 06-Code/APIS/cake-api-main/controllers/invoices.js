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
    let invoice = new Invoice({
        name: req.body.name,
        date: req.body.date,
        quantity: req.body.newQuantity,
        totalMoney: req.body.totalMoney
    })
    invoice.save((err,inv) => {
        err && res.status(500).send(err.message)
        res.status(200).send(inv)
    })
}

module.exports = {getInvoice,addInvoice}