const BoardingRepository = require('../repositories/boardingRepository');

class BoardingService{
    static async createBoarding(boarding){
        return await BoardingRepository.createBoarding(boarding);
    }
    static async updateBoarding(boarding){
        return await BoardingRepository.updateBoarding(boarding);
    }
    static async deleteBoarding(boardingId){
        return await BoardingRepository.deleteBoarding(boardingId);
    }
    static async getBoardingByDate(checkIn){
        return await BoardingRepository.getBoardingByDate(checkIn);
    }
    static async getBoardingByPet(petId){
        return await BoardingRepository.getBoardingByPet(petId);
    }
    static async getBoardings(){
        return await BoardingRepository.getBoardings();
    }
}
module.exports = BoardingService;