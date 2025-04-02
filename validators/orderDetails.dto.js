const {param , body , vallidationResult, validationResult} = require("express-validator");

const orderDetailsValidator = [
    body('orderId')
    .isInt()
    .withMessage('Order ID must be an integer')
    .notEmpty()
    .withMessage('Order ID is required'),
    body('productId')
    .isInt()
    .withMessage('Product ID must be an integer')
    .notEmpty()
    .withMessage('Product ID is required'),
    body('quantity')
    .isInt()
    .withMessage('Quantity must be an integer')
    .notEmpty()
    .withMessage('Quantity is required'),
    (req,res,next)=> {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array()})
        }
        next();
    }
]
const orderDetailsIdValidator = [
    param('odId')
    .isInt()
    .withMessage('Order Details ID must be an integer')
    .notEmpty()
    .withMessage('Order Details ID is required'),
    (req,res,next)=> {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array()})
        }
        next();
    }
]
const orderIdValidator = [  
    param('orderId')
    .isInt()
    .withMessage('Order ID must be an integer')
    .notEmpty()
    .withMessage('Order ID is required'),
    (req,res,next)=> {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array()})
        }
        next();
    }
]

module.exports = {
    orderDetailsValidator,
    orderDetailsIdValidator,
    orderIdValidator
}