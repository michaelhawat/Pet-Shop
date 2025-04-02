const OrderDetailsRepository = require('../repositories/orderDetailsRepository');

class OrderDetailsService {
static async createOrderDetails(orderDetails) {
    try {
        if(! await  OrderDetailsRepository.orderIdExist(orderDetails.orderId)){
            throw new Error('Order ID does not exist');
        }
        if(! await  OrderDetailsRepository.productIdExist(orderDetails.productId)){
            throw new Error('Product ID does not exist');
        }
        return await OrderDetailsRepository.createOrderDetails(orderDetails);
    } catch (error) {
        console.error('Error in createOrderDetails:', error);
        throw error;
    }
}

static async updateOrderDetails(orderDetails) {
    try {
        if(! await  OrderDetailsRepository.orderIdExist(orderDetails.orderId)){
            throw new Error('Order ID does not exist');
        }
        if(! await  OrderDetailsRepository.productIdExist(orderDetails.productId)){
            throw new Error('Product ID does not exist');
        }
        if(! await  OrderDetailsRepository.orderDetailsExist(orderDetails.odId)){
            throw new Error('Order Details ID does not exist');
        }
        return await OrderDetailsRepository.updateOrderDetails(orderDetails);
    } catch (error) {
        console.error('Error in updateOrderDetails:', error);
        throw error;
    }
}

static async deleteOrderDetails(odId) {
    try {
        if(! await  OrderDetailsRepository.orderDetailsExist(odId)){
            throw new Error('Order Details ID does not exist');
        }
        return await OrderDetailsRepository.deleteOrderDetails(odId);
    } catch (error) {
        console.error('Error in deleteOrderDetails:', error);
        throw error;
    }
}

static async getOrderDetailsById(odId) {
    try {
        if(! await  OrderDetailsRepository.orderDetailsExist(odId)){
            throw new Error('Order Details ID does not exist');
        }
        return await OrderDetailsRepository.getOrderDetailsById(odId);
    } catch (error) {
        console.error('Error in getOrderDetailsById:', error);
        throw error;
    }
}

static async getOrderDetailsByOrderId(orderId) {
    try {
        if(! await  OrderDetailsRepository.orderIdExist(orderId)){
            throw new Error('Order ID does not exist');
        }
        return await OrderDetailsRepository.getOrderDetailsByOrderId(orderId);
    } catch (error) {
        console.error('Error in getOrderDetailsByOrderId:', error);
        throw error;
    }
}

static async getProductByOrderId(orderId) {
    try {
        if(! await  OrderDetailsRepository.orderIdExist(orderId)){
            throw new Error('Order ID does not exist');
        }
        return await OrderDetailsRepository.getProductByOrderId(orderId);
    } catch (error) {
        console.error('Error in getProductByOrderId:', error);
        throw error;
    }
}

static async getOrderDetails() {
    try {
        return await OrderDetailsRepository.getOrderDetails();
    } catch (error) {
        console.error('Error in getOrderDetails:', error);
        throw error;
    }
}

static async getTotalAmount(odId) {
    try {
        if(! await  OrderDetailsRepository.orderDetailsExist(odId)){
            throw new Error('Order Details ID does not exist');
        }
        return await OrderDetailsRepository.getTotalAmount(odId);
    } catch (error) {
        console.error('Error in getTotalAmount:', error);
        throw error;
    }
}



}
module.exports = OrderDetailsService;