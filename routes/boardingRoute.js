const express = require("express");
const BoardingController = require("../controllers/boardingController");

const router = express.Router();

router.post('/',BoardingController.createBoarding);
router.put('/:boardingId',BoardingController.updateBoarding);
router.delete('/:boardingId',BoardingController.deleteBoarding);
router.get('/date',BoardingController.getBoardingByDate);
router.get('/pet/:petId',BoardingController.getBoardingByPet);
router.get('/',BoardingController.getBoardings);

module.exports=router;