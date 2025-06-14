const express_products = require('express');
const router_products = express_products.Router();
const { getProducts: getProducts_controller, getProductById: getProductById_controller, createProduct: createProduct_controller, updateProduct: updateProduct_controller, deleteProduct: deleteProduct_controller } = require('../controller/productController');

// Rutas públicas
router_products.get('/', getProducts_controller);
router_products.get('/:id', getProductById_controller);


module.exports = router_products;
