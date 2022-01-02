const mongoose = require('mongoose')
const Product = require('../models/Invoice')

//getInvoice
const getInvoice = (req, res) => {
    Invoice.find((err, invoices) => {
        err && res.statusCode(500).send(err.message)
        res.statusCode(200).json(invoices)
    })
}

export default getInvoice