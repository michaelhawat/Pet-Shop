const PetController = require('../controllers/PetController');
const{ validatePet , validatePetId} = require('../validators/pet.dto');
const { validateUserId } = require('../validators/user.dto');
const express = require('express');

const router = express.Router();    

router.post('/',validatePet,PetController.createPet);
router.post('/edit/:petId',validatePet,validatePetId,PetController.updatePet);
router.post('/delete/:petId',validatePetId,PetController.deletePet);
router.get('/user/:id',validateUserId,PetController.getPetByUserId);
router.get('/',PetController.getAllPets);
router.get('/edit-Petform/:petId', PetController.loadPetForm);
router.get('/:petId',validatePetId,PetController.getPetById);

module.exports = router;