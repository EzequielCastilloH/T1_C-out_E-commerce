const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Invoiceschema = new Schema({
    date: {type: String},
    products: {type: Array},
    subTotal: {type: Number},
    iva: {type: Number},
    total: {type: Number}
})

module.exports = Invoice = mongoose.model('Invoice',Invoiceschema)