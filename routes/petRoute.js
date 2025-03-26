const PetController = require('../contorllers/PetController');
const{ validatePet , validatePetId} = require('../validators/pet.dto');
const { validateUserId } = require('../validators/user.dto');
const express = require('express');

const router = express.Router();    

router.post('/',validatePet,PetController.createPet);
router.put('/:petId',validatePet,validatePetId,PetController.updatePet);
router.delete('/:petId',validatePetId,PetController.deletePet);
router.get('/user/:id',validateUserId,PetController.getPetByUserId);
router.get('/',PetController.getAllPets);
router.get('/:petId',validatePetId,PetController.getPetById);

module.exports = router;