const AppointmentService = require('../services/appointmentService');
const Appointment = require('../models/appointmentModule');

class AppointmentController{
    static async createAppointment(req,res){
        try{
        const {userId , petId,appDate,services} = req.body;
        
        var appointment = new Appointment(0,userId,petId,appDate,services);
        const newappointment = await AppointmentService.createAppointment(appointment);
   
        return res.status(201).json({message:'Appointment added succesfully'});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
    }
    static async getAppointments(req, res) {
        try {
            const appointments = await AppointmentService.getAppointments();
            return res.status(200).json(appointments);
        } catch (error) {
            return res.status(500).json({ error:error.message });
        }
    }
    static async getAppByPetId(req,res){
        try{
            const {petId}= req.params;
            const appointment = await AppointmentService.getAppByPetId(petId);
            
            return res.status(200).json(appointment);

        }catch(error){
            return res.status(500).json({error:error.message})
        }
    }

    static async getAppByUserId(req, res) {
        
        try {
            const {userId} = req.params;
            const appointment = await AppointmentService.getAppByUserId(userId);
           
            return res.status(200).json(appointment);
        } catch (error) {
            return res.status(500).json({ error:error.message });
        }
    }

    static async updateAppointment(req, res) {
        try {
        const { appId } = req.params;
        const { userId, petId, appDate, services } = req.body;
       
         var appointment = new Appointment(appId,userId, petId, appDate, services);
            const updatedAppointment = await AppointmentService.updateAppointment(appointment);
          
            return res.status(200).json({ message: 'Appointment updated successfully' });
        } catch (error) {
           return res.status(500).json({ error:error.message });
        }
    }

    static async deleteAppointment(req, res) {
        const { appId } = req.params;
        try {
            const deletedAppointment = await AppointmentService.deleteAppointment(appId);
            
            return res.status(200).json({ message: 'Appointment deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error:error.message });
        }
    }
    static async getAppByDate(req, res) {
        try {
            const { appDate } = req.body;
            const appointments = await AppointmentService.getAppByDate(appDate);
            return res.status(200).json(appointments);
        } catch (error) {
            return res.status(500).json({ error:error.message });
        }
    }

}
module.exports = AppointmentController;