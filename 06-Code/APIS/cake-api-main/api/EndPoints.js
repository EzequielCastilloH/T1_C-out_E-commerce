const UserController = require('../controllers/users')
const ProductController = require('../controllers/products')
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
router.put("/products/update", ProductController.updatePriceProduct)
router.delete("/products/delete", ProductController.deleteProduct)
router.put("/products/updateprice", ProductController.updateQuantityProduct)

module.exports = router