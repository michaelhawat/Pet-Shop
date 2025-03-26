const db = require('../config/db');
const Appointment = require('../models/appointmentModule');
const Utils = require('../utils/Utils');


class AppointmentRepository{
static async createAppointment(appointment){
    try {
    const sql = `INSERT INTO appointments (user_id, pet_id, app_date, services) VALUES (?, ?, ?, ?)`;

        const {affectedRows} = await db.query(sql,  [appointment.userId, appointment.petId, Utils.formatDateSQL(appointment.appDate), appointment.services]);
        return affectedRows;

    } catch (error) {
       throw new Error('Error creating appointment: ' + error.message);
    }
}

static async updateAppointment(appointment) {
    try {
    const sql = `UPDATE appointments SET
    user_id =? ,
     pet_id=? ,
     app_date=? ,
      services=? 

      WHERE appointment_id = ?`;
    
        const {affectedRows} = await db.query(sql, [appointment.userId, appointment.petId, Utils.formatDateSQL(appointment.appDate), appointment.services,appointment.appId]);

        return affectedRows;
    } catch (error) {
        throw new Error('Error updating appointment: ' + error.message);
    }
}

static async deleteAppointment(appId) {
    try {
    const sql = `DELETE FROM appointments WHERE appointment_id = ?`;

        const {affectedRows} = await db.query(sql, [appId]);
        return affectedRows;

    } catch (error) {
        throw new Error('Error deleting appointment: ' + error.message);
    }
}

static async getAppByUserId(userId) {
    try {
    const sql = `SELECT * FROM appointments WHERE user_id = ?`;
    
        const affectedRows = await db.query(sql, [userId]);
        return affectedRows;

    } catch (error) {
        throw new Error('Error fetching appointments by user ID: ' + error.message);
    }
}

static async getAppByPetId(petId) {
    try {
    const sql = `SELECT * FROM appointments WHERE pet_id = ?`;
    
        const affectedRows = await db.query(sql, [petId]);
        return affectedRows;
    } catch (error) {
        throw new Error('Error fetching appointments by pet ID: ' + error.message);
    }
}
static async getAppointments(){
    try{
        const sql = `SELECT * FROM appointments `;
        const affectedRows = await db.query(sql);
        return affectedRows;
    }catch(error){
        throw new Error('Error geting the Appointments');
    }
}
}

module.exports = AppointmentRepository;