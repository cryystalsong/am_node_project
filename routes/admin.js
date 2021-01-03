const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/edit-product => POST
router.post('/edit-product/:productId', productsController.postEditProduct);

// /admin/edit-product => GET
router.get('/edit-product/:productId', productsController.getEditProduct);

// /admin/products => GET
router.get('/products', productsController.getProducts);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
