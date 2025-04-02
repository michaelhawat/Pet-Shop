const AppointmentRepository = require('../repositories/appointmentRepositories');

class AppointmentService{
static async createAppointment(appointment) {
    try {
        if(! await AppointmentRepository.petExist(appointment.petId)){
            throw new Error('Pet does not exist');
        }
        if(! await AppointmentRepository.appDateExists(appointment.appDate)){
            throw new Error('Appointment already exists');
        }
        if(! await AppointmentRepository.userExist(appointment.userId)){
            throw new Error('User does not exist');
        }
         
        return await AppointmentRepository.createAppointment(appointment);
    } catch (error) {
        throw new Error(`Error creating appointment: ${error.message}`);
    }
}

static async getAppByPetId(petId) {
    try {
        
        if(!await AppointmentRepository.petExist(petId) ){
            throw new Error('Pet does not exist');
        }

        return await AppointmentRepository.getAppByPetId(petId);
    } catch (error) {
        throw new Error(`Error fetching appointment by pet ID: ${error.message}`);
    }
}

static async getAppByUserId(userId) {
    try {
        if(! await AppointmentRepository.userExist(userId)){
            throw new Error('User does not exist');
        }
        return await AppointmentRepository.getAppByUserId(userId);
    } catch (error) {
        throw new Error(`Error fetching appointment by user ID: ${error.message}`);
    }
}

static async getAppointments() {
    try {
        return await AppointmentRepository.getAppointments();
    } catch (error) {
        throw new Error(`Error fetching appointments: ${error.message}`);
    }
}

static async updateAppointment(appointment) {
    try {
        if(! await AppointmentRepository.appIdExists(appointment.appId)){
            throw new Error('Appointment does not exist');
        }
        if(! await AppointmentRepository.petExist(appointment.petId)){
            throw new Error('Pet does not exist');
        }
        if(! await AppointmentRepository.appDateExists(appointment.appDate)){
            throw new Error('Appointment already exists');
        }
        if(! await AppointmentRepository.userExist(appointment.userId)){
            throw new Error('User does not exist');
        }
        return await AppointmentRepository.updateAppointment(appointment);
    } catch (error) {
        throw new Error(`Error updating appointment: ${error.message}`);
    }
}

static async deleteAppointment(appId) {
    try {
        if(! await AppointmentRepository.appIdExists(appId)){
            throw new Error('Appointment does not exist');
        }
        return await AppointmentRepository.deleteAppointment(appId);
    } catch (error) {
        throw new Error(`Error deleting appointment: ${error.message}`);
    }
}
static async getAppByDate(appDate) {
    try {
        if(! await AppointmentRepository.appDateExists(appDate)){
            throw new Error('Appointment does not exist');
        }
        return await AppointmentRepository.getAppByDate(appDate);
    } catch (error) {
        throw new Error(`Error fetching appointment by date: ${error.message}`);
    }
}
}
module.exports = AppointmentService;