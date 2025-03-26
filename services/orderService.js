const OrderRepository = require("../repositories/orderRepository");

class OrderService{

    static async createOrder(userId)
    {
        return OrderRepository.createOrder(userId);
    }
    static async updateOrder(orderId,userId)
    {
        return OrderRepository.updateOrder(orderId,userId);
    }
    static async getOrders(){
        return OrderRepository.getOrders();
    }
    static async getOrderById(orderId){
        return OrderRepository.getOrderById(orderId);
    }
    static async getOrderByUserId(userId){
        return OrderRepository.getOrderByUserId(userId);
    }
    static async deleteOrder(orderId){
        return OrderRepository.deleteOrder(orderId);
    }
}
module.exports = OrderService;