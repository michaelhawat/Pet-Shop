const express = require('express');
const productController = require("../contorllers/productController");
const { validateProduct ,validateProductId} = require("../validators/product.dto");

const router = express.Router();


// Get all products
router.get('/', productController.getAllProducts);

// Get a single product by ID
router.get('/:pdId',validateProductId, productController.getProductById);

// Create a new product
router.post('/', validateProduct,productController.createProduct);

// Update a product by ID
router.put('/:pdId',validateProduct,validateProductId, productController.updateProduct);

// Delete a product by ID
router.delete('/:pdId',validateProductId, productController.deleteProduct);

module.exports = router;