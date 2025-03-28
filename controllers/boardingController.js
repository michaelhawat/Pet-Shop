const Boarding = require('../models/boardingModel');
const BoardingService = require('../services/boardingService');

class BoardingController {
    static async createBoarding(req, res) {
        try {
            const { petId, checkIn, checkOut } = req.body;
            var boarding = new Boarding(0, petId, checkIn, checkOut);
            const newboarding = await BoardingService.createBoarding(boarding);
            return res.status(201).json({ message: 'Boarding created successfully' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async updateBoarding(req, res) {
        try {
            const { boardingId } = req.params;
            const { petId, checkIn, checkOut } = req.body;
            var boarding = new Boarding(boardingId, petId, checkIn, checkOut);
            const updateBoarding = await BoardingService.updateBoarding(boarding);
            return res.status(200).json({ message: `Boarding ${boardingId} updated successfully` });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async deleteBoarding(req, res) {
        try {
            const { boardingId } = req.params;
            const boarding = await BoardingService.deleteBoarding(boardingId);
            return res.status(200).json({ message: `Boarding ${boardingId} deleted successfully` });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getBoardingByDate(req, res) {
        try {
            const { checkIn } = req.params;
            const boarding = await BoardingService.getBoardingByDate(checkIn);
            return res.status(200).json(boarding);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getBoardingByPet(req, res) {
        try {
            const { petId } = req.params;
            const boarding = await BoardingService.getBoardingByPet(petId);
            return res.status(200).json(boarding);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getBoardings(req, res) {
        try {
            const boarding = await BoardingService.getBoardings();
            return res.status(200).json(boarding);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}
module.exports = BoardingController;
