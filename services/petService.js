const PetRepository = require('../repositories/petRepository');

class PetService{
    static async createPet(pet){
        return PetRepository.createPet(pet);
    }
    static async updatePet(pet){
        return PetRepository.updatePet(pet);
    }
    static async deletePet(petId){
        return PetRepository.deletePet(petId);
    }
    static async getPetByUserId(userId){
        return PetRepository.getPetByUserId(userId);
    }
    static async getPetById(petId){
        return PetRepository.getPetById(petId); 
    }
    static async getAllPets(){
        return PetRepository.getAllPets();
    }

}
module.exports = PetService;
