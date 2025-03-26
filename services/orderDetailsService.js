const OrderDetailsRepository = require('../repositories/orderDetailsRepository');

class OrderDetailsService {
static async createOrderDetails(orderDetails) {
    return await OrderDetailsRepository.createOrderDetails(orderDetails);
}

static async updateOrderDetails(orderDetails) {
    return await OrderDetailsRepository.updateOrderDetails(orderDetails);
}
static async deleteOrderDetails(odId) {
    return await OrderDetailsRepository.deleteOrderDetails(odId);
}
static async getOrderDetailsById(odId) {
    return await OrderDetailsRepository.getOrderDetailsById(odId);
}
static async getOrderDetailsByOrderId(orderId) {
    return await OrderDetailsRepository.getOrderDetailsByOrderId(orderId);
}
static async getProductByOrderId(orderId) {
    return await OrderDetailsRepository.getProductByOrderId(orderId);
}
static async getOrderDetails(){
    return await OrderDetailsRepository.getOrderDetails();
}
static async getTotalAmount(odId) {
    return await OrderDetailsRepository.getTotalAmount(odId);
}



}
module.exports = OrderDetailsService;