const mongoose = require('mongoose')
const Product = require('../models/Invoice')
const jwt = require('jsonwebtoken')

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

module.exports = {getInvoice}