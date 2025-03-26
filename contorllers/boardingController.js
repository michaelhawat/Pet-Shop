const Boarding = require('../models/boardingModel');
const BoardingService = require('../services/boardingService');

class BoardingController {
    static async createBoarding(req, res) {
        const { petId, checkIn, checkOut } = req.body;
        if (!petId || !checkIn || !checkOut) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        var boarding = new Boarding(0, petId, checkIn, checkOut);
         const newboarding = await BoardingService.createBoarding(boarding);
         return res.status(201).json({message : 'Boarding created successfully'});
}

static async updateBoarding(req, res) { 
    const {boardingId} = req.params;
    const { petId, checkIn, checkOut } = req.body;
    if (!boardingId || !petId || !checkIn || !checkOut) {
        return res.status(400).json({ message: 'All fields are required' });
    }
     var boarding  = new Boarding(boardingId, petId, checkIn, checkOut);
     const updateBoarding = await BoardingService.updateBoarding(boarding);
     return res.status(200).json({message : `Boarding ${boardingId} updated successfully`});


}
static async deleteBoarding(req, res) { 
    const {boardingId} = req.params;
    if (!boardingId) {
        return res.status(400).json({ message: 'Boarding Id is required' });
    }
  
     const boarding = await BoardingService.deleteBoarding(boardingId);
     return res.status(200).json({message : `Boarding ${boardingId} deleted successfully`});

}
static async getBoardingByDate(req, res) { 
    const {checkIn} = req.body;
    if (!checkIn) {
        return res.status(400).json({ message: 'Check in date is required' });
    }
  
     const boarding = await BoardingService.getBoardingByDate(checkIn);
     return res.status(200).json(boarding);
}
static async getBoardingByPet(req, res) { 
    const {petId} = req.params;
    if (!petId) {
        return res.status(400).json({ message: 'Pet Id is required' });
    }
  
     const boarding = await BoardingService.getBoardingByPet(petId);
     return res.status(200).json(boarding);
}
static async getBoardings(req, res) { 
     const boarding = await BoardingService.getBoardings();
     return res.status(200).json(boarding);
} 

}
module.exports = BoardingController;
