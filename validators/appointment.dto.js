const {body , param , validationResult} = require("express-validator");
const Utils = require("../utils/Utils");

const appointmentValidator = [
 body('userId')
   .isInt()
   .withMessage('User ID must be an integer')
   .notEmpty()
   .withMessage('User ID is required'),
 body('petId')
   .isInt()
   .withMessage('Pet ID must be an integer')
   .notEmpty()
   .withMessage('Pet ID is required'),
body('appDate')
   .isString()
   .withMessage('Appointment date must be a valid date')
   .notEmpty()
   .withMessage('Appointment date is required'),
body('services')  
   .isIn(['Grooming', 'Vaccination', 'Training', 'Checkup']) 
   .withMessage('The services are Grooming, Vaccination, Training, Checkup ')   
    .notEmpty()
    .withMessage('Services are required'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }
        next();
    }
];
const appointmentIdValidator = [
    param('appId')
        .isInt()
        .withMessage('Appointment ID must be an integer')
        .notEmpty()
        .withMessage('Appointment ID is required'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }
        next();
    }
];
const petIdValidator = [
    param('petId')
        .isInt()
        .withMessage('Pet ID must be an integer')
        .notEmpty()
        .withMessage('Pet ID is required'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }
        next();
    }
];
const userIdValidator = [
    param('userId')
    .isInt()
    .withMessage('user ID must be an integer')
    .notEmpty()
    .withMessage('user ID is required'),
(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    next();
}
]
module.exports = {
    appointmentValidator,
    appointmentIdValidator,
    petIdValidator,
    userIdValidator
};