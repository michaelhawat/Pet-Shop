const express = require("express");
const OrderController = require("../controllers/orderController");
const {validateOrder,validateUserId,validateOrderId} = require("../validators/order.dto");
const router = express.Router();

    router.get('/',OrderController.getOrders);
    router.post('/:userId',validateUserId,OrderController.creatOrder);
    router.put('/:orderId',validateOrder,validateOrderId,OrderController.updateOrder);
    router.delete('/:orderId',validateOrderId,OrderController.deleteOrder);
    router.get('/:orderId',validateOrderId,OrderController.getOrderById);
    router.get('/userId/:userId',validateUserId,OrderController.getOrderByUserId);

    module.exports=router;  

