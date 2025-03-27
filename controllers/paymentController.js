const PaymentService = require('../services/paymentService');   
const Payment = require('../models/paymentModel');
const Utils = require('../utils/Utils');
class PaymentController{
    static async createPayment(req,res){
        try{
            const {odId, userId, paymentMethod} = req.body;
            const payment = await PaymentService.createPayment(odId, userId, paymentMethod,Utils.formatDay());
            return res.status(200).json({payment,message:`Payment has been created`});
        }catch(error){
            return res.status(500).json({status: 500, message: error.message});
        }
    }
    static async getPaymentById(req,res){
        const {paymentId} = req.params;
        try{
            const payment = await PaymentService.getPaymentById(paymentId);
            return res.status(200).json(payment);
        }catch(error){
            return res.status(500).json({status: 500, message: error.message});
        }
    }
    static async getAllPayments(req,res){
        try{
            const payments = await PaymentService.getAllPayments();
            return res.status(200).json(payments);
        }catch(error){
            return res.status(500).json({status: 500, message: error.message});
        }
    }
    static async updatePayment(req,res){    
        try{
            const {paymentId} = req.params;
            const {odId, userId, paymentMethod} = req.body;
            const payment = await PaymentService.updatePayment(paymentId, odId, userId, paymentMethod,Utils.formatDay());
            return res.status(200).json({message:`Payment ${paymentId} has been updated`});
        }catch(error){
            return res.status(500).json({status: 500, message: error.message});
        }
    }
    static async deletePayment(req,res){
        try{
            const {paymentId} = req.params;
            const payment = await PaymentService.deletePayment(paymentId);
            return res.status(200).json({message:`Payment ${paymentId} has been deleted`});
        }catch(error){
            return res.status(500).json({status: 500, message: error.message});
        }
    }
    static async getAllPaymentsByUserId(req,res){
        try{
            const {id} = req.params;
            const payments = await PaymentService.getAllPaymentsByUserId(id);
            return res.status(200).json(payments);
        }catch(error){
            return res.status(500).json({status: 500, message: error.message});
        }
    }
    static async getPaymentsByDate(req,res){
        try{
            const {paymentDate} = req.params;
            const payment = await PaymentService.getPaymentsByDate(paymentDate);
            return res.status(200).json(payment);
        }catch(error){
            return res.status(500).json({status: 500, message: error.message});
        }
    }
    static async getPaymentsByDateRange(req,res){
        try{
            const {startDate, endDate} = req.params;
            const payment = await PaymentService.getPaymentsByDateRange(startDate, endDate);
            return res.status(200).json(payment);
        }catch(error){
            return res.status(500).json({status: 500, message: error.message});
        }
    }
};
module.exports = PaymentController;