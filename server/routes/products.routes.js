const Router = require('express')
const router = new Router()
const productsController = require('../controller/products.controller')


router.post('/products', productsController.createProducts)
router.get('/products', productsController.getProducts)
router.get('/products/:id', productsController.getOneProducts)
router.put('/products', productsController.updateProducts)
router.delete('/products/:id', productsController.deleteProducts)

module.exports = router