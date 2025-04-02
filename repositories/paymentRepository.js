const db = require("../config/db");
const Utils = require("../utils/Utils");
const Payment = require("../models/paymentModel");
const { Op } = require("sequelize");

class PaymentRepository {
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
    static async getPaymentById(paymentId) {
        try {
            const payment = await Payment.findByPk(paymentId);
            return payment;
        } catch (error) {
            throw new Error(error);
        }
    };
    static async getAllPayments() {
        try {
            const payments = await Payment.findAll();
            return payments;
        } catch (error) {
            throw new Error(error);
        }
    };
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
static async getPaymentsByDate(paymentDate) {
        try {
            const sql = `SELECT * FROM payments WHERE payment_date = ?`;
            const payments = await db.query(sql, [paymentDate]);
            return [payments];
        } catch (error) {
            throw new Error(error);
        }
    };
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