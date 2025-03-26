const PetRepository = require('../repositories/petRepository');

class PetService{
    static async createPet(pet) {
        try {
            if(!await PetRepository.idExist(pet.userId))
                throw new Error("This user does not exist");
             if(!await PetRepository.Exists(pet)){
            return await PetRepository.createPet(pet);
              } else
            throw new Error("This pet already exists");
        } catch (error) {
            throw new Error(`Error creating pet: ${error.message}`);
        }
    }
    static async updatePet(pet) {
        try {
            if(!await PetRepository.PetidExist(pet.petId))
                throw new Error("This Pet does not exist");
            if(!await PetRepository.idExist(pet.userId))
                throw new Error("This user does not exist");
            if(!await PetRepository.Exists(pet)){
            return await PetRepository.updatePet(pet);
        }
        else
        throw new Error("This pet already exists");
        } catch (error) {
            throw new Error(`Error updating pet: ${error.message}`);
        }
    }
    static async deletePet(petId) {
        try {
            if(!await PetRepository.PetidExist(petId))
                throw new Error("This Pet does not exist");
            return await PetRepository.deletePet(petId);
        } catch (error) {
            throw new Error(`Error deleting pet: ${error.message}`);
        }
    }
    static async getPetByUserId(userId) {
        try {
            if(!await PetRepository.idExist(userId))
                throw new Error("This user does not exist");
            return await PetRepository.getPetByUserId(userId);
        } catch (error) {
            throw new Error(`Error fetching pet by user ID: ${error.message}`);
        }
    }
    static async getPetById(petId) {
        try {
            if (!await PetRepository.PetidExist(petId)) {
                throw new Error("This Pet does not exist");
            }
            return await PetRepository.getPetById(petId);
        } catch (error) {
            throw new Error(`Error fetching pet by ID: ${error.message}`);
        }
    }
    static async getAllPets() {
        try {
            return await PetRepository.getAllPets();
        } catch (error) {
            throw new Error(`Error fetching all pets: ${error.message}`);
        }
    }

}
module.exports = PetService;
