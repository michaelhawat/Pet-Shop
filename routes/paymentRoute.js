const PaymentController = require('../controllers/paymentController');
const express = require('express');
const {validateUserId} = require('../validators/user.dto');
const router = express.Router();
const {validatePayment,validatePaymentId,validateDate,validateDateRange} = require('../validators/payment.dto');

router.post('/',validatePayment,PaymentController.createPayment);
router.get('/',PaymentController.getAllPayments);
router.get('/:paymentId',validatePaymentId,PaymentController.getPaymentById);
router.put('/:paymentId',validatePaymentId,validatePayment,PaymentController.updatePayment);
router.delete('/:paymentId',validatePaymentId,PaymentController.deletePayment);
router.get('/User/:id',validateUserId,PaymentController.getAllPaymentsByUserId);
router.get('/date/:paymentDate',validateDate,PaymentController.getPaymentsByDate);
router.get('/dates/:startDate/:endDate',validateDateRange,PaymentController.getPaymentsByDateRange);

module.exports = router;