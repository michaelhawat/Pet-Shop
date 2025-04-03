const db = require('../config/db');
const Appointment = require('../models/appointmentModule');
const Utils = require('../utils/Utils');


class AppointmentRepository{
    /**
     * Create a new appointment record in the database
     * @param {object} appointment - Appointment details
     * @returns {number} affectedRows
     * @throws {Error} if there is an error creating the appointment
     */
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
/**
     * Update an existing appointment record in the database
     * @param {object} appointment - Appointment details
     * @returns {number} affectedRows
     * @throws {Error} if there is an error updating the appointment
     */
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
/**
     * Delete an appointment record from the database
     * @param {number} appId - Appointment ID
     * @returns {number} affectedRows
     * @throws {Error} if there is an error deleting the appointment
     */
static async deleteAppointment(appId) {
    try {
    const sql = `DELETE FROM appointments WHERE appointment_id = ?`;

        const {affectedRows} = await db.query(sql, [appId]);
        return affectedRows;

    } catch (error) {
        throw new Error('Error deleting appointment: ' + error.message);
    }
}
/**
     * Retrieve appointments by a specific date
     * @param {string} appDate - Date of appointment
     * @returns {Array} List of appointments on the specified date
     * @throws {Error} if there is an error retrieving appointments
     */
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
 /**
     * Retrieve appointments by a specific user ID
     * @param {number} userId - User ID
     * @returns {Array} List of appointments associated with the user
     * @throws {Error} if there is an error retrieving appointments
     */
static async getAppByUserId(userId) {
    try {
    const sql = `SELECT * FROM appointments WHERE user_id = ?`;
    
        const affectedRows = await db.query(sql, [userId]);
        return affectedRows;

    } catch (error) {
        throw new Error('Error fetching appointments by user ID: ' + error.message);
    }
}
/**
     * Retrieve appointments by a specific pet ID
     * @param {number} petId - Pet ID
     * @returns {Array} List of appointments associated with the pet
     * @throws {Error} if there is an error retrieving appointments
     */
static async getAppByPetId(petId) {
    try {
    const sql = `SELECT * FROM appointments WHERE pet_id = ?`;
    
        const affectedRows = await db.query(sql, [petId]);
        return affectedRows;
    } catch (error) {
        throw new Error('Error fetching appointments by pet ID: ' + error.message);
    }
}
/**
     * Retrieve all appointments
     * @returns {Array} List of all appointments
     * @throws {Error} if there is an error retrieving appointments
     */
static async getAppointments(){
    try{
        const sql = `SELECT * FROM appointments `;
        const affectedRows = await db.query(sql);
        return affectedRows;
    }catch(error){
        throw new Error('Error geting the Appointments');
    }
}
  /**
     * Check if an appointment date exists in the database
     * @param {string} appDate - Appointment date
     * @returns {boolean} true if appointment date exists, false otherwise
     * @throws {Error} if there is an error checking for appointment date existence
     */
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
/**
     * Check if an appointment ID exists in the database
     * @param {number} appId - Appointment ID
     * @returns {boolean} true if appointment ID exists, false otherwise
     * @throws {Error} if there is an error checking for appointment ID existence
     */
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
/**
     * Check if a user exists in the database
     * @param {number} userId - User ID
     * @returns {boolean} true if user exists, false otherwise
     * @throws {Error} if there is an error checking for user existence
     */
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
/**
     * Check if a pet exists in the database
     * @param {number} petId - Pet ID
     * @returns {boolean} true if pet exists, false otherwise
     * @throws {Error} if there is an error checking for pet existence
     */
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