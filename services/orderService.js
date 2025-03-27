const OrderRepository = require("../repositories/orderRepository");
const Order = require("../models/orderModel");

class OrderService {

    static async createOrder(userId) {
        try {
            if (await Order.findOne ({where : {user_id : userId}})== null) {
                throw new Error("User Id doesn't exist");
            }
            return OrderRepository.createOrder(userId);
        } catch (error) {
            throw new Error(`Error in createOrder: ${error.message}`);
        }
    }

    static async updateOrder(orderId, userId) {
        try {
            if (await Order.findByPk(orderId) == null) {
                throw new Error("Order Id doesn't exist");
            }
            if (await Order.findOne ({where : {user_id : userId}}) == null) {
                throw new Error("User Id doesn't exist");
            }
            return OrderRepository.updateOrder(orderId, userId);
        } catch (error) {
            throw new Error(`Error in updateOrder: ${error.message}`);
        }
    }

    static async getOrders() {
        try {
            return OrderRepository.getOrders();
        } catch (error) {
            throw new Error(`Error in getOrders: ${error.message}`);
        }
    }

    static async getOrderById(orderId) {
        try {
            if (await Order.findByPk(orderId) == null) {
                throw new Error("Order Id doesn't exist");
            }
            return OrderRepository.getOrderById(orderId);
        } catch (error) {
            throw new Error(`Error in getOrderById: ${error.message}`);
        }
    }

    static async getOrderByUserId(userId) {
        try {
            if(await Order.findOne ({where : {user_id : userId}}) == null){
                throw new Error("User Id doesn't exist");
            }
            return OrderRepository.getOrderByUserId(userId);
        } catch (error) {
            throw new Error(`Error in getOrderByUserId: ${error.message}`);
        }
    }

    static async deleteOrder(orderId) {
        try {
            if (await Order.findByPk(orderId) == null) {
                throw new Error("Order Id doesn't exist");
            }
            return OrderRepository.deleteOrder(orderId);
        } catch (error) {
            throw new Error(`Error in deleteOrder: ${error.message}`);
        }
    }
}
module.exports = OrderService;