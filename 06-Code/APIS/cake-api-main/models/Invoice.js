const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Invoiceschema = new Schema({
    name: {type: String},
    date: {type: String},
    quantity: {type: Number},
    totalMoney: {type: Number},
})

module.exports = Invoice = mongoose.model('Invoice',Invoiceschema)

/*
    Tomas el producto
    guardas en invoice
    actualizas la cantidad del producto en products
*/