const db = require("../config/db");
const moment = require("moment");
const Order = require("../models/orderModel");
const Utils = require("../utils/Utils");

class OrderRepository { 

static async createOrder(userId){

try {
    const addOrder =await Order.create({
        user_id: userId,
        order_date: Utils.formatDate()
    });
    return addOrder;
} catch (error) {
    console.log(error);
    throw new Error(error);
}
}
static async updateOrder(orderId,userId){
    try {
        if( await Order.findByPk(orderId) == null)
        {
            throw new Error("order Id don't exist");
        }
        return await Order.update({
            user_id:userId,
            order_date:Utils.formatDate()
        },{
            where:{
                order_id:orderId
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}
static async getOrders(){
    try {
        return await Order.findAll();
    } catch (error) {
        throw new Error(error);
    }
}
static async getOrderById(orderId){
    try {
        if( await Order.findByPk(orderId) == null)
            {
                throw new Error("Order Id don't exist");
            }
        return await Order.findByPk(orderId);
    } catch (error) {
        throw new Error(error);
    }
}
static async getOrderByUserId(userId){
   try {
    
       const user =  await Order.findAll({
           where:{
               user_id:userId
           }
       });
         if(user.length == 0)
         {
              throw new Error("User don't have orders");
         }
         return user;
       
   }
   catch (error) {
       throw new Error(error);
   }
}
static async deleteOrder(orderId){
    
   try {
    if( await Order.findByPk(orderId) == null)
    {
        throw new Error("order Id don't exist");
    }
       return await Order.destroy({
           where:{
               order_id:orderId
           }
       });

   }
   catch (error) {
       throw new Error(error);
   }
}


}
module.exports = OrderRepository;