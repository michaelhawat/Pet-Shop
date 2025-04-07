const PaymentRepository = require('../repositories/paymentRepository');
const Payment = require('../models/paymentModel');

class PaymentService{
    static async createPayment(odId, userId, paymentMethod,paymentDate){
        try{
            if(! await PaymentRepository.odExist(odId) ){
               
                throw new Error("Order details Id doesn't exist");
            }
            if(! await PaymentRepository.userExist(userId)){
                throw new Error("User Id doesn't exist");
            }
            return PaymentRepository.createPayment(odId, userId, paymentMethod,paymentDate);
        }catch(error){
            throw new Error(`Error in createPayment: ${error.message}`);
        }
    }
    static async getPaymentById(paymentId){
        try{
            if(await Payment.findByPk(paymentId) == null){
                throw new Error("Payment Id doesn't exist");
            }
            return PaymentRepository.getPaymentById(paymentId);
        }catch(error){
            throw new Error(`Error in getPaymentById: ${error.message}`);
        }
    }
    static async getAllPayments(){
        try{
            return PaymentRepository.getAllPayments();
        }catch(error){
            throw new Error(`Error in getAllPayments: ${error.message}`);
        }
    }
    static async updatePayment(paymentId, odId, userId, paymentMethod,paymentDate){
        try{
            if(await Payment.findByPk(paymentId) == null){
                throw new Error("Payment Id doesn't exist");
            }
            if(!await PaymentRepository.userExist(userId)){
                throw new Error("User Id doesn't exist");
            }
            if(!await PaymentRepository.odExist(odId)){
               
                throw new Error("Order details Id doesn't exist");
            }
            
            return PaymentRepository.updatePayment(paymentId, odId, userId, paymentMethod,paymentDate);
        }catch(error){
            throw new Error(`Error in updatePayment: ${error.message}`);
        }
    }
    static async deletePayment(paymentId){
        try{
            if(await Payment.findByPk(paymentId) == null){
                throw new Error("Payment Id doesn't exist");
            }
            return PaymentRepository.deletePayment(paymentId);
        }catch(error){
            throw new Error(`Error in deletePayment: ${error.message}`);
        }
    }
    static async getAllPaymentsByUserId(userId){
        try{
            if(!await PaymentRepository.userExist(userId)) {
                throw new Error("User Id doesn't exist");
            }
            return PaymentRepository.getAllPaymentsByUserId(userId);
        }catch(error){
            throw new Error(`Error in getPaymentByUserId: ${error.message}`);
        }
    }
    static async getPaymentsByDate(paymentDate){    
        try{
            if(!await PaymentRepository.paymentDateExist(paymentDate)){
                throw new Error("Payment Date doesn't exist");
            }
            return PaymentRepository.getPaymentsByDate(paymentDate);
        }catch(error){
            throw new Error(`Error in getPaymentsByDate: ${error.message}`);
        }
    }                         
    static async getPaymentsByDateRange(startDate, endDate){
        try{
            
            
            return PaymentRepository.getPaymentsByDateRange(startDate, endDate);
        }catch(error){
            throw new Error(`Error in getPaymentsByDateRange: ${error.message}`);
        }
    }      
}
module.exports = PaymentService;