const {body , param,validationResult} = require("express-validator");

const  validatePet = [
    body("userId")
    .isInt()
    .withMessage("Invalid user id")
    .notEmpty()
    .withMessage("User id is required"),
    body("petName")
    .isString()
    .withMessage("PetName must be string")
    .notEmpty()
    .withMessage("PetName is required"),
    body("petType")
    .isIn(["Dog","Cat","Bird","Other"])
    .withMessage("Invalid pet type")
    .notEmpty()
    .withMessage("Pet type is required"),
    body("vaccinated")
    .isIn(["Yes","No"]) 
    .withMessage("Invalid vaccinated status"),
    body("petAge")
    .isInt()
    .withMessage("Pet age must be integer")
    .notEmpty()
    .withMessage("Pet age is required"),
    body("petGender")
    .isIn(["Male","Female"])
    .withMessage("Invalid pet gender"),
(req,res,next)=>{                       
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}
next();
}

]
const validatePetId = [
    param("petId")
    .isInt()
    .withMessage("Invalid pet id")
    .notEmpty()
    .withMessage("Pet id is required"),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]
module.exports = {validatePet,validatePetId};
