const db = require("../config/db");
const Utils = require("../utils/Utils");
const Payment = require("../models/paymentModel");
const { Op } = require("sequelize");

class PaymentRepository {
    /**
 * Create a new payment record in the database
 * @param {number} odId - Order details ID
 * @param {number} userId - User ID
 * @param {string} paymentMethod - Payment method used
 * @param {string} paymentDate - Date of payment
 * @throws {Error} if there is an error creating the payment
 */
    static async createPayment(odId, userId, paymentMethod,paymentDate) {
        try {
            const addPayment = await Payment.create({
                orderdetails_id:odId,
                user_id:userId,
                payment_method: paymentMethod,
                payment_date: paymentDate
            });
            //return addPayment;
        } catch (error) {
            throw new Error(error);
        }
    };
    /**
 * Retrieve a payment record by its ID
 * @param {number} paymentId - Payment ID
 * @returns {object} Payment data
 * @throws {Error} if there is an error retrieving the payment
 */
    static async getPaymentById(paymentId) {
        try {
            const payment = await Payment.findByPk(paymentId);
            return payment;
        } catch (error) {
            throw new Error(error);
        }
    };
    /**
 * Retrieve all payment records
 * @returns {Array} List of all payments
 * @throws {Error} if there is an error retrieving payments
 */
    static async getAllPayments() {
        try {
            const payments = await Payment.findAll();
            return payments;
        } catch (error) {
            throw new Error(error);
        }
    };
    /**
 * Update an existing payment record in the database
 * @param {number} paymentId - Payment ID
 * @param {number} odId - Order details ID
 * @param {number} userId - User ID
 * @param {string} paymentMethod - Payment method used
 * @param {string} paymentDate - Date of payment
 * @returns {number} affectedRows
 * @throws {Error} if there is an error updating the payment
 */
    static async updatePayment(paymentId, odId, userId, paymentMethod,paymentDate) {
        try {
            const payment = await Payment.update({
                orderdetails_id: odId,
                user_id: userId,
                payment_method: paymentMethod,
                payment_date: paymentDate
            }, {
                where: {
                    payment_id: paymentId
                }
            });
            
            return payment;
        } catch (error) {
            throw new Error(error);
        }
    };
    /**
 * Delete a payment record from the database
 * @param {number} paymentId - Payment ID
 * @returns {number} affectedRows
 * @throws {Error} if there is an error deleting the payment
 */
    static async deletePayment(paymentId) {
        try {
            const payment = await Payment.destroy({
                where: {
                    payment_id: paymentId
                }
            });
            return payment;
        } catch (error) {
            throw new Error(error);
        }
    };
/**
 * Retrieve all payments made by a specific user
 * @param {number} userId - User ID
 * @returns {Array} List of payments associated with the user
 * @throws {Error} if there is an error retrieving payments
 */
    static async getAllPaymentsByUserId(userId) {
        try {
            const payments = await Payment.findAll({
                where: {
                    user_id: userId
                }
            });
            return payments;
        } catch (error) {
            throw new Error(error);
        }
    };
    /**
 * Retrieve all payments made on a specific date
 * @param {string} paymentDate - Date of payment
 * @returns {Array} List of payments on the specified date
 * @throws {Error} if there is an error retrieving payments
 */
static async getPaymentsByDate(paymentDate) {
        try {
            const sql = `SELECT * FROM payments WHERE payment_date = ?`;
            const payments = await db.query(sql, [paymentDate]);
            return [payments];
        } catch (error) {
            throw new Error(error);
        }
    };
    /**
 * Retrieve all payments within a specified date range
 * @param {string} startDate - Start date of the range
 * @param {string} endDate - End date of the range
 * @returns {Array} List of payments within the date range
 * @throws {Error} if there is an error retrieving payments
 */
    static async getPaymentsByDateRange(startDate, endDate) {
        try {
            const payments = await Payment.findAll({
                where: {
                    payment_date: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
            return payments;
        } catch (error) {
            throw new Error(error);
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
            let sql = `SELECT * FROM users WHERE user_id = ? `;
            const rows = await db.query(sql, [userId]);
           console.log(rows);   
           
            if(rows.length > 0){
                return true ;
                
            }
            else
            return false;
        } catch (error) {
            console.error('Error checking if user exists:', error);
            throw error;
        }
    }
    /**
 * Check if order details exist in the database
 * @param {number} odId - Order details ID
 * @returns {boolean} true if order details exist, false otherwise
 * @throws {Error} if there is an error checking for order details existence
 */
static async odExist(odId) {    
        try {
            let sql = `SELECT * FROM orderdeatils WHERE orderdetails_id = ? `;
            const rows = await db.query(sql, [odId]);
            console.log(rows);   
            if(rows.length > 0){
                return true ;
                
            }
            else
            return false;
        } catch (error) {
            console.error('Error checking if orderdetails exists:', error);
            throw error;
        }
    }
    /**
 * Check if a payment date exists in the database
 * @param {string} paymentDate - Date of payment
 * @returns {boolean} true if payment date exists, false otherwise
 * @throws {Error} if there is an error checking for payment date existence
 */
    static async paymentDateExist(paymentDate) {
        try {
            let sql = `SELECT * FROM payments WHERE payment_date = ? `;
            const rows = await db.query(sql, [paymentDate]);
            console.log(rows);   
            if(rows.length > 0){
                return true ;
                
            }
            else
            return false;
        } catch (error) {
            console.error('Error checking if payment date exists:', error);
            throw error;
        }
    }
}
module.exports = PaymentRepository;