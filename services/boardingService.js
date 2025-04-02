const BoardingRepository = require('../repositories/boardingRepository');

class BoardingService {
    static async createBoarding(boarding) {
        try {
           if (!await BoardingRepository.boardingExists(boarding.checkIn, boarding.petId)) {
              throw new Error('Boarding already exists');
             
           }
              if (!await BoardingRepository.petExist(boarding.petId)) {
                throw new Error('Pet does not exist');
            }
           
            return await BoardingRepository.createBoarding(boarding);
        } catch (error) {
            throw new Error(`Error in createBoarding: ${error.message}`);
        }
    }

    static async updateBoarding(boarding) {
        try {
            if (!await BoardingRepository.boardingIdExists(boarding.boardingId)) {
              throw new Error('Boarding Id does not exist');
            }
            console.log(boarding.boardingId);
            if (!await BoardingRepository.boardingExists(boarding.checkIn, boarding.petId)) {
                throw new Error('Boarding already exists');
               
             }
            if (!await BoardingRepository.petExist(boarding.petId)) {
                throw new Error('Pet does not exist');
            } 
            
            
             
             //console.log(await BoardingRepository.boardingIdExists(boarding.boardingId));
            return await BoardingRepository.updateBoarding(boarding);
        } catch (error) {
            throw new Error(`Error in updateBoarding: ${error.message}`);
        }
    }

    static async deleteBoarding(boardingId) {
        try {
            if (!await BoardingRepository.boardingIdExists(boardingId)) {
                throw new Error('Boarding Id does not exist');
            }
            return await BoardingRepository.deleteBoarding(boardingId);
        } catch (error) {
            throw new Error(`Error in deleteBoarding: ${error.message}`);
        }
    }

    static async getBoardingByDate(checkIn) {
        try {
            if (!await BoardingRepository.boardingDateExists(checkIn)) {
                throw new Error('No boarding in this date ');
            }
            return await BoardingRepository.getBoardingByDate(checkIn);
        } catch (error) {
            throw new Error(`Error in getBoardingByDate: ${error.message}`);
        }
    }

    static async getBoardingByPet(petId) {
        try {
            if (!await BoardingRepository.petExist(petId)) {
                throw new Error('Pet does not exist');
            }   
            return await BoardingRepository.getBoardingByPet(petId);
        } catch (error) {
            throw new Error(`Error in getBoardingByPet: ${error.message}`);
        }
    }

    static async getBoardings() {
        try {
            return await BoardingRepository.getBoardings();
        } catch (error) {
            throw new Error(`Error in getBoardings: ${error.message}`);
        }
    }
}
module.exports = BoardingService;