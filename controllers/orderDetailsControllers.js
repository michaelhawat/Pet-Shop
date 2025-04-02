const OrderDetailsService = require('../services/orderDetailsService');
const OrderDetails = require('../models/orderDetailsModels');

class OrderDetailsController {
static async createOrderDetails(req, res) {
    try {
        const {orderId, productId, quantity} = req.body;
        var orderDetails = new OrderDetails(0, orderId, productId, quantity);
        const result = await OrderDetailsService.createOrderDetails(orderDetails);
        return res.status(200).json({message: 'Order detail created successfully'});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

static async updateOrderDetails(req, res) {
    try {
        const {odId} = req.params;
        const {orderId, productId, quantity} = req.body;
        var orderDetails = new OrderDetails(odId, orderId, productId, quantity);
        const result = await OrderDetailsService.updateOrderDetails(orderDetails);
        return res.status(200).json({message: 'Order detail updated successfully'});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

static async deleteOrderDetails(req, res) {
    try {
        const {odId} = req.params;
        const result = await OrderDetailsService.deleteOrderDetails(odId);
        return res.status(200).json({message: 'Order detail deleted successfully'});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

static async getOrderDetailsById(req, res) {
    try {
        const {odId} = req.params;
        const result = await OrderDetailsService.getOrderDetailsById(odId);
        return res.status(200).json({result});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

static async getOrderDetailsByOrderId(req, res) {
    try {
        const {orderId} = req.params;
        const result = await OrderDetailsService.getOrderDetailsByOrderId(orderId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

static async getProductByOrderId(req, res) {
    try {
        const {orderId} = req.params;
        const result = await OrderDetailsService.getProductByOrderId(orderId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

static async getOrderDetails(req, res) {
    try {
        const orderdetails = await OrderDetailsService.getOrderDetails();
        return res.status(200).json(orderdetails);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

static async getTotalAmount(req, res) {
    try {
        const {odId} = req.params;
        const result = await OrderDetailsService.getTotalAmount(odId);
        return res.status(200).json({message: `${result}$ is the total amount `});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}


}
module.exports = OrderDetailsController;