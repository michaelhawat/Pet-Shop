const AppointmentService = require('../services/appointmentService');
const Appointment = require('../models/appointmentModule');

class AppointmentController{
    static async createAppointment(req,res){
        try{
        const {userId , petId,appDate,services} = req.body;
        if(!userId || !petId || !appDate|| !services){
            return res.status(400).json({message :"All fields are required"});
        }
        var appointment = new Appointment(0,userId,petId,appDate,services);
        const newappointment = await AppointmentService.createAppointment(appointment);
        return res.status(201).json({message:'Appointment added succesfully'});
    }catch(error){
        return res.status(500).json({message: 'Error creating appointments'});
    }
    }
    static async getAppointments(req, res) {
        try {
            const appointments = await AppointmentService.getAppointments();
            return res.status(200).json(appointments);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving appointments' });
        }
    }
    static async getAppByPetId(req,res){
        try{
            const {petId}= req.params;
            const appointment = await AppointmentService.getAppByPetId(petId);
            if(!appointment){
                return res.status(404).json({message:'Appointment not found'});

            }
            return res.status(200).json(appointment);

        }catch(error){
            return res.status(500).json({message:'Error retrieving appointment'})
        }
    }

    static async getAppByUserId(req, res) {
        
        try {
            const {userId} = req.params;
            const appointment = await AppointmentService.getAppByUserId(userId);
            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            return res.status(200).json(appointment);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving appointment' });
        }
    }

    static async updateAppointment(req, res) {
        try {
        const { appId } = req.params;
        const { userId, petId, appDate, services } = req.body;
        if (!userId || !petId || !appDate || !services) {
            return res.status(400).json({ message: 'All fields are required' });
        }
         var appointment = new Appointment(appId,userId, petId, appDate, services);
            const updatedAppointment = await AppointmentService.updateAppointment(appointment);
          if (!updatedAppointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            return res.status(200).json({ message: 'Appointment updated successfully' });
        } catch (error) {
           return res.status(500).json({ message: 'Error updating appointment' });
        }
    }

    static async deleteAppointment(req, res) {
        const { appId } = req.params;
        try {
            const deletedAppointment = await AppointmentService.deleteAppointment(appId);
            if (!deletedAppointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            return res.status(200).json({ message: 'Appointment deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting appointment' });
        }
    }

}
module.exports = AppointmentController;