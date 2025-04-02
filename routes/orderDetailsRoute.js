const express = require('express');
const OrderDetailsController = require('../controllers/orderDetailsControllers');
const {orderDetailsIdValidator,orderDetailsValidator,orderIdValidator} = require('../validators/orderDetails.dto');

const router = express.Router();

router.post('/',orderDetailsValidator,OrderDetailsController.createOrderDetails);
router.put('/:odId', orderDetailsIdValidator,orderDetailsValidator,OrderDetailsController.updateOrderDetails);
router.delete('/:odId',orderDetailsIdValidator, OrderDetailsController.deleteOrderDetails);
router.get('/:odId', orderDetailsIdValidator,OrderDetailsController.getOrderDetailsById);
router.get('/order/:orderId',orderIdValidator, OrderDetailsController.getOrderDetailsByOrderId);
router.get('/product/:orderId',orderIdValidator, OrderDetailsController.getProductByOrderId);
router.get('/', OrderDetailsController.getOrderDetails);
router.get('/total/:odId', orderDetailsIdValidator,OrderDetailsController.getTotalAmount);

module.exports = router;