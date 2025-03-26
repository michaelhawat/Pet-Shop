const AppointmentRepository = require('../repositories/appointmentRepositories');

class AppointmentService{
   
       static async createAppointment(appointment){
        return await AppointmentRepository.createAppointment(appointment);
    }

   static async getAppByPetId(petId){
    return await AppointmentRepository.getAppByPetId(petId);
   }

    static async getAppByUserId(userId) {
        return await AppointmentRepository.getAppByUserId(userId);
    }
    static async getAppointments(){
        return await AppointmentRepository.getAppointments();
    }

    static async updateAppointment(appointment) {
        return await AppointmentRepository.updateAppointment(appointment);
    }

    static async deleteAppointment(appId) {
        return await AppointmentRepository.deleteAppointment(appId);
    }
}
module.exports = AppointmentService;