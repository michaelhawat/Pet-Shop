
const OrderService = require("../services/orderService");
const Order = require("../models/orderModel");

class OrderController{

static async creatOrder (req,res){
    try {
    const {userId}= req.params;
    
  
    var order = new Order(0,userId,0);    
   
        const result = await OrderService.createOrder(userId);
        res.status(200).json({result,message:`succesfuly ordered`});
    } catch (error) {
        return res.status(500).json({status: 500, message: error.message});
    }

    
 }
static async updateOrder(req,res){
    try {
        const {orderId} = req.params;
        const {userId} = req.body;
        const result = await OrderService.updateOrder(orderId,userId);
        return res.status(200).json({message:`Order ${orderId} have been updated`});
    } catch (error) {
        return res.status(500).json({status: 500, message: error.message});
    }
}
static async getOrders(req,res){
   try
   { const orders = await OrderService.getOrders();
   return res.status(200).json(orders);
}
catch (error) {
    return res.status(500).json({status: 500, message: error.message});
}
}
static async getOrderById(req,res){
    const {orderId} = req.params;
    try{
    const order = await OrderService.getOrderById(orderId);
    return res.status(200).json(order);}
    catch (error) {
        return res.status(500).json({status: 500, message: error.message});
}
}
static async getOrderByUserId(req,res){
   try{ 
    const {userId} = req.params;
   
    const order = await OrderService.getOrderByUserId(userId);
    return res.status(200).json(order);}
    catch (error) {
        return res.status(500).json({status: 500, message: error.message});
    }
}

static async deleteOrder(req,res){  
   try
    { const {orderId} = req.params;
   const result = await OrderService.deleteOrder(orderId);

    return res.status(200).json({message:`the ${orderId} have been deleted`});
    }
    catch (error) {
        return res.status(500).json({status: 500, message: error.message});
    }   
}
}
module.exports = OrderController;