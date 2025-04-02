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
        console.log('error creating app');
       throw error;
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
static async getAppByDate(appDate) {
    try {
        const sql = `SELECT * FROM appointments WHERE app_date = ?`;
        const rows = await db.query(sql, [Utils.formatDateSQL(appDate)]);
        //console.log(rows);
        return rows;
    } catch (error) {
        console.error('Error fetching appointment by date:', error);
        throw error;
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
static async appDateExists(appDate) {   
    try {
        const sql = `SELECT * FROM appointments WHERE app_date = ?`;
        const rows = await db.query(sql, [Utils.formatDay(appDate)]);
        
        if(rows == 0)
        return true;
        else
        return false;
       
    } catch (error) {
        throw new Error('Error checking appointment date existence: ' + error.message);
    }
}
static async appIdExists(appId) {   
    try {
        const sql = `SELECT * FROM appointments WHERE appointment_id = ?`;
        const [rows] = await db.query(sql, [appId]);
        if(rows)
        return true;
        else
        return false;
       
    } catch (error) {
        throw new Error('Error checking appointment ID existence: ' + error.message);
    }
}
static async userExist(userId) {
    try {
        let sql = `SELECT * FROM users   WHERE user_id = ? `;
        const [rows] = await db.query(sql, [userId]);
       console.log(rows);   
       
        if(rows){
            return true  ;
            
        }
        else
        return false;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
}
static async  petExist(petId) {
    try {
        let sql = `SELECT * FROM pets    WHERE pet_id = ? `;
        const [rows] = await db.query(sql, [petId]);
       console.log(rows);   
       
        if(rows){
            return true;
            
        }
        else
        return false;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
}
}

module.exports = AppointmentRepository;