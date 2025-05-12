
const express = require("express");
const UserController = require("../controllers/userController");
const {validateUser} = require('../validators/user.dto');
const {validateUserId} = require('../validators/user.dto');
const {validateUserReg} = require('../validators/user.dto');
const {validateUserPass} = require('../validators/user.dto');


const router = express.Router();

router.get('/',UserController.getAllUsers);
router.post('/',validateUser,validateUserPass,UserController.createUser);
router.post('/signUp',validateUserReg,UserController.signUp);
router.put('/:id',validateUserId,validateUser,UserController.updateUser);
router.get('/id/:id',validateUserId,UserController.getUser);
router.delete('/:id',validateUserId,UserController.deleteUser);
router.post('/signIn',validateUserReg,UserController.registration);
router.put('/newPassword/:id',validateUserId,validateUserPass,UserController.changePassword);

module.exports=router;