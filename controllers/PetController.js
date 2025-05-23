const PetService = require('../services/petService');   
const Pet = require('../models/petModel');
const UserController = require('./userController');
const UserService = require('../services/userService');

class PetController{

static async createPet(req, res) {
    try {
        const { userId, petName, petType, vaccinated, petAge, petGender } = req.body;
        const pet = new Pet(0, userId, petName, petType, vaccinated, petAge, petGender);
        const result = await PetService.createPet(pet);
        return res.status(201).json({ message: "Pet created successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
static async loadPetForm(req, res){
        const {petId} = req.params;
        // get the fresh data from the db
        // to make sure that we have the latest data.
        const result = await PetService.getPetById(petId);
const user = await UserService.readUser(result.userId);
        res.render('editPets', {pets: result , user : user});
    }
static async updatePet(req, res) {
    try {
        const { petId } = req.params;
        const { userId, petName, petType, vaccinated, petAge, petGender } = req.body;
        const pet = new Pet(petId, userId, petName, petType, vaccinated, petAge, petGender);
        const result = await PetService.updatePet(pet);
        res.redirect('/pets.ejs');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

static async deletePet(req, res) {
    try {
        const { petId } = req.params;
        const result = await PetService.deletePet(petId);
        res.redirect('/pets.ejs');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

static async getPetByUserId(req, res) {
    try {
        const { id } = req.params;
        const pets = await PetService.getPetByUserId(id);
        return res.status(200).json(pets);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
static async getPetById(req,res){
    try {
        const {petId} = req.params;
        const pet = await PetService.getPetById(petId);
        return res.status(200).json(pet);
    } catch (error) {
        
        return res.status(500).json({message: error.message});
    }
}

static async getAllPets(req, res) {
    try {
        const pets = await PetService.getAllPets();
        return res.status(200).json(pets);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

}
module.exports = PetController;
