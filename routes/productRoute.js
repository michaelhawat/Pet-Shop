const express = require('express');
const productController = require("../controllers/productController");
const { validateProduct ,validateProductId} = require("../validators/product.dto");

const router = express.Router();


// Get all products
router.get('/', productController.getAllProducts);

// Get a single product by ID
router.get('/:pdId',validateProductId, productController.getProductById);

// Create a new product
router.post('/create', validateProduct,productController.createProduct);
router.get('/edit-form/:pdId',validateProductId, productController.loadPdForm);
// Update a product by ID
router.post('/edit/:pdId',validateProduct,validateProductId, productController.updateProduct);

// Delete a product by ID
router.post('/delete/:pdId',validateProductId, productController.deleteProduct);

 router.get('productsView',productController.productsView);
module.exports = router;