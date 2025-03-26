const OrderDetailsService = require('../services/orderDetailsService');
const OrderDetails = require('../models/orderDetailsModels');

class OrderDetailsController {
static async createOrderDetails(req, res) {
    const {orderId, productId, quantity} = req.body;
    if(!orderId || !productId || !quantity) {
        return res.status(400).json({message: 'All fields are required'});
    }

var orderDetails = new OrderDetails(0, orderId, productId, quantity);
    const result = await OrderDetailsService.createOrderDetails(orderDetails);
   return res.status(200).json({message: 'Order detail created successfully'});
}
static async updateOrderDetails(req, res) {
    const {odId} = req.params;
    const {orderId, productId, quantity} = req.body;
    if(!odId || !orderId || !productId || !quantity) {
        return res.status(400).json({message: 'All fields are required'});
    }
    var orderDetails = new OrderDetails(odId, orderId, productId, quantity);   
  
    const result = await OrderDetailsService.updateOrderDetails(orderDetails);
    return res.status(200).json({message: 'Order detail updated successfully'});


}
static async deleteOrderDetails(req, res) {
    const odId = req.params;
    if(!odId) {
        return res.status(400).json({message: 'Order Detail Id are required'});
    }
    const result = await OrderDetailsService.deleteOrderDetails(odId);
    return res.status(200).json({message: 'Order detail deleted successfully'});
}
static async getOrderDetailsById(req, res) {
    const {odId} = req.params;
    if(!odId) {
        return res.status(400).json({message: 'Order Detail Id are required'});
    }
    const result = await OrderDetailsService.getOrderDetailsById(odId);
    return res.status(200).json({result});
}
static async getOrderDetailsByOrderId(req, res) {
    const {orderId} = req.params;
    if(!orderId) {
        return res.status(400).json({message: 'Order Id are required'});
    }
    const result = await OrderDetailsService.getOrderDetailsByOrderId(orderId);
    return res.status(200).json(result);
}
static async getProductByOrderId(req, res) {
    const {orderId} = req.params;
    if(!orderId) {
        return res.status(400).json({message: 'Order Id are required'});
    }
    const result = await OrderDetailsService.getProductByOrderId(orderId);
    return res.status(200).json(result);
}
static async getOrderDetails(req, res) {
    const orderdetails = await OrderDetailsService.getOrderDetails();
    return res.status(200).json(orderdetails);
}
static async getTotalAmount(req, res) {
    const {odId} = req.params;
    if(!odId) {
        return res.status(400).json({message: 'Product Id are required'});
    }
    const result = await OrderDetailsService.getTotalAmount(odId);
    return res.status(200).json({message:`${result}$ is the total amount `});
}


}
module.exports = OrderDetailsController;