const {body,param,validationResult} = require('express-validator');

const validateBoarding = [
    body('petId')
    .isInt()
    .withMessage('Pet ID must be integer')
    .notEmpty()
    .withMessage('Pet ID is required'),
    body('checkIn')
    .isDate()
    .withMessage('Check in date must be date')
    .notEmpty()
    .withMessage('Check in date is required'),
    body('checkOut')
    .isDate()
    .withMessage('Check out date must be date')
    .notEmpty()
    .withMessage('Check out date is required'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
]
const validateBoardingId = [
    param('boardingId')
    .isInt()
    .withMessage('Boarding ID must be integer')
    .notEmpty()
    .withMessage('Boarding ID is required'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
]
module.exports = {
    validateBoarding,
    validateBoardingId
}