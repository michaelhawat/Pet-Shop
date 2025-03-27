const {body,param,validationResult}=require("express-validator");

const validatePayment=[
    body("odId")
    .isInt()
    .withMessage("orderdetail id must be valid")
    .notEmpty()
    .withMessage("orderdetail id is required"),
    body("userId")
    .isInt()
    .withMessage("user id must be valid")
    .notEmpty()
    .withMessage("user id is required"),
    body("paymentMethod")
    .isIn(["Cash","Card","Online"])
    .withMessage("payment method must be valid")
    .notEmpty()
    .withMessage("payment method is required"),
    
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        next();
    }
]
const validateDate=[
    param("paymentDate")
    .isDate()
    .withMessage("date must be valid")
    .notEmpty()
    .withMessage("date is required"),
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        next();
    }
]
const validateDateRange=[
    param("startDate")
    .isDate()
    .withMessage("start date must be valid")
    .notEmpty()
    .withMessage("start date is required"),
    param("endDate")
    .isDate()
    .withMessage("end date must be valid")
    .notEmpty()
    .withMessage("end date is required"),
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        next();
    }
]
const validatePaymentId=[
    param("paymentId")
    .isInt()
    .withMessage("id must be valid")
    .notEmpty()
    .withMessage("id is required"),
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        next();
    }
]
module.exports={validatePayment,validateDate,validateDateRange,validatePaymentId};
