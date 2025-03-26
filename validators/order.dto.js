const {body, param, validationResult} = require("express-validator");

const validateOrder = [

    body('userId').isInt().withMessage('User ID must be integer'),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
]
const validateUserId = [
    param('userId').isInt().withMessage('User ID must be integer'),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
]
const validateOrderId = [
    param('orderId').isInt().withMessage('Order ID must be integer'),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
]
    module.exports = {  
       validateOrder,
        validateUserId,
        validateOrderId
    }
