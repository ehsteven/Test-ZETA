const express_products = require('express');
const router_products = express_products.Router();
const { getProducts: getProducts_controller, createProduct: createProduct_controller, getProductById: getProductById_controller, updateProduct: updateProduct_controller, deleteProduct: deleteProduct_controller } = require('../controller/productController');
const verifyToken_middleware = require('../middleware/authMiddleware');
const isAdmin_middleware = require('../middleware/roleMiddleware');

// Rutas públicas
router_products.get('/', getProducts_controller);
router_products.get('/:id', getProductById_controller)

// Rutas protegidas (solo para administradores)
router_products.post('/', verifyToken_middleware, isAdmin_middleware, createProduct_controller);
router_products.put('/:id', verifyToken_middleware, isAdmin_middleware, updateProduct_controller);
router_products.delete('/:id', verifyToken_middleware, isAdmin_middleware, deleteProduct_controller);

module.exports = router_products;