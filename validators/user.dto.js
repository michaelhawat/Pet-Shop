const {body, param, validationResult} = require("express-validator");

const validateUser = [
    body('firstName')
        .isString()
        .withMessage('FirstName must be string')
        .notEmpty()
        .withMessage('FirstName is required'),
    body('lastName')
        .isString()
        .withMessage('LastName must be string')
        .notEmpty()
        .withMessage('LastName is required'),
    body('phone')
         .isInt()
         .withMessage('Phone must be an integer')
         .notEmpty()
         .withMessage('Phone is required'),

    body('password')
        .isStrongPassword()
        .withMessage('Must be strong password')
        .notEmpty()
        .withMessage('Password is required'),
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .notEmpty()
        .withMessage('Email is required'),
        body('dob')
        .isDate()
        .withMessage('Invalid date')
        .notEmpty()
        .withMessage('Date of birth is required'),
        (req, res, next) =>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }
            next();
        }
]
const validateUserId = [
    param('id').isInt().withMessage('ID must be integer'),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
]
const validateUserReg = [
    body('password')
        .isStrongPassword()
        .withMessage('Must be strong password')
        .notEmpty()
        .withMessage('Password is required'),
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .notEmpty()
        .withMessage('Email is required'),
        (req, res, next) =>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }
            next();
        }
]
const validateUserPass=[
    body('newPassword')
    .isStrongPassword()
    .withMessage('Must be strong password')
    .notEmpty()
    .withMessage('Password is required'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        next();
    }
]
module.exports = {
    validateUser,
    validateUserId,
    validateUserReg,
    validateUserPass
}