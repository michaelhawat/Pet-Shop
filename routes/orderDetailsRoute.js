const express = require('express');
const OrderDetailsController = require('../controllers/orderDetailsControllers');

const router = express.Router();

router.post('/', OrderDetailsController.createOrderDetails);
router.put('/:odId', OrderDetailsController.updateOrderDetails);
router.delete('/:odId', OrderDetailsController.deleteOrderDetails);
router.get('/:odId', OrderDetailsController.getOrderDetailsById);
router.get('/order/:orderId', OrderDetailsController.getOrderDetailsByOrderId);
router.get('/product/:orderId', OrderDetailsController.getProductByOrderId);
router.get('/', OrderDetailsController.getOrderDetails);
router.get('/total/:odId', OrderDetailsController.getTotalAmount);

module.exports = router;