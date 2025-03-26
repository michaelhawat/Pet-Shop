
const express = require("express");
const UserController = require("../contorllers/userController");
const {validateUser} = require('../validators/user.dto');
const {validateUserId} = require('../validators/user.dto');
const {validateUserReg} = require('../validators/user.dto');
const {validateUserPass} = require('../validators/user.dto');


const router = express.Router();

router.get('/',UserController.getAllUsers);
router.post('/',validateUser,UserController.createUser);
router.put('/:id',validateUserId,validateUser,UserController.updateUser);
router.get('/id/:id',validateUserId,UserController.getUser);
router.delete('/:id',validateUserId,UserController.deleteUser);
router.get('/reg',validateUserReg,UserController.registration);
router.put('/newPassword/:id',validateUserId,validateUserPass,UserController.changePassword);

module.exports=router;