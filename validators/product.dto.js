const { body, param, validationResult } = require("express-validator");

const validateProduct = [
    body('pdName')
        .isString()
        .withMessage('Invalid product name')
        .notEmpty()
        .withMessage('Product name is required'),
    body('pdPrice')
        .isDecimal()
        .withMessage('Invalid product price')
        .notEmpty()
        .withMessage('Product price is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

]
const validateProductId = [
    param('pdId')
        .isInt()
        .withMessage('Invalid product id')
        .notEmpty()
        .withMessage('Product id is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]
module.exports = { validateProduct, validateProductId };


