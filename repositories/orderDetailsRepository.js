const db = require('../config/db');
const OrderDetails = require('../models/orderDetailsModels');
//const Order = require('../repositories/orderRepository');
//const Product = require('../repositories/productRepository');

class OrderDetailsRepository {
  static async createOrderDetails(orderDetails) {
    const sql = `INSERT INTO orderdetails 
    (order_id, product_id, quantity) 
    VALUES (?, ?, ?)`;
    const {affectedRows} = await db.query(sql, [orderDetails.orderId, orderDetails.productId,orderDetails.quantity]);

    return affectedRows;
  }

  static async updateOrderDetails(orderDetails) {
    const sql = `UPDATE orderdetails SET 
    order_id = ?,
    product_id = ?,
    quantity = ?
    WHERE orderdetails_id = ?`;
    const {affectedRows} = await db.query(sql, [orderDetails.orderId, orderDetails.productId,orderDetails.quantity, orderDetails.odId]);

    return affectedRows;
  }

  static async deleteOrderDetails(odId) {
    return await db.query('DELETE FROM orderdetails WHERE orderdetails_id = ?', [odId]);
  }

  static async getOrderDetailsById(odId) {
    const sql = `SELECT * FROM orderdetails WHERE orderdetails_id = ?`;
   const rows= await db.query(sql, [odId]);

    return rows;
  }
  static async getOrderDetailsByOrderId(orderId) {
    const sql = `SELECT * FROM orderdetails WHERE order_id = ?`;
    const rows = await db.query(sql, orderId);
    return rows;
  }
  static async getProductByOrderId(orderId) {
    
      const sql = `
          SELECT p.* FROM products p
          JOIN orderdetails od ON p.product_id = od.product_id
          WHERE od.order_id = ?
      `;
      
      const products = await db.query(sql, [orderId]);
      return  products;
  }

  static async getOrderDetails(){
  const sql = `SELECT * FROM orderdetails`;
  const rows = await db.query(sql);
    return rows;

  }

    static async getTotalAmount(odId) {
      try {
        
        const productQuery = `SELECT product_id FROM orderdetails WHERE orderdetails_id = ?`;
        const productRows = await db.query(productQuery, [odId]);
  
        const productId = productRows[0].product_id;
  
       
        const quantityQuery = `SELECT quantity FROM orderdetails WHERE orderdetails_id = ?`;
        const quantityRows = await db.query(quantityQuery, [odId]);
  
        const quantity = quantityRows[0].quantity;
  
        const priceQuery = `SELECT pd_price FROM products WHERE product_id = ?`;
        const priceRows = await db.query(priceQuery, [productId]);
  
        const productPrice = priceRows[0].pd_price;
  
        
        return productPrice * quantity;
      } catch (error) {
        console.error("Error in getTotalAmount:", error);
        return 0;
      }
    }
  
  

  }
  module.exports = OrderDetailsRepository;