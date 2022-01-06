const UserController = require('../controllers/users')
const ProductController = require('../controllers/products')
const InvoiceController = require('../controllers/invoices')
const express = require('express')

const router = express.Router()

//EndPoints for users
router.get("/all", UserController.findAllUsers)
router.post("/login", UserController.login)
router.post("/add",UserController.register)

//EndPoints for products
router.post("/addProduct", ProductController.addProduct)
router.get("/products", ProductController.getProducts)
router.post("/products/cakes", ProductController.getProductsByType)
router.put("/products/update", ProductController.updateQuantityProduct)
router.delete("/products/delete", ProductController.deleteProduct)
router.put("/products/updateprice", ProductController.updatePriceProduct)

//EndPoints for invoices
router.get("/invoice", InvoiceController.getInvoice)

module.exports = router