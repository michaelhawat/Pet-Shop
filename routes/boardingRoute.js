const express = require("express");
const BoardingController = require("../controllers/boardingController");
const {validateBoarding,validateBoardingId} = require('../validators/boarding.dto');
const router = express.Router();

router.post('/',validateBoarding,BoardingController.createBoarding);
router.put('/:boardingId',validateBoardingId,validateBoarding,BoardingController.updateBoarding);
router.delete('/:boardingId',validateBoardingId,BoardingController.deleteBoarding);
router.get('/date/:checkIn',BoardingController.getBoardingByDate);
router.get('/pet/:petId',BoardingController.getBoardingByPet);
router.get('/',BoardingController.getBoardings);

module.exports=router;