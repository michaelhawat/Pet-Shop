const db = require('../config/db');
const OrderDetails = require('../models/orderDetailsModels');
//const Order = require('../repositories/orderRepository');
//const Product = require('../repositories/productRepository');

class OrderDetailsRepository {
  static async createOrderDetails(orderDetails) {
    try {
      const sql = `INSERT INTO orderdetails 
      (order_id, product_id, quantity) 
      VALUES (?, ?, ?)`;
      const { affectedRows } = await db.query(sql, [orderDetails.orderId, orderDetails.productId, orderDetails.quantity]);

      return affectedRows;
    } catch (error) {
      console.error("Error in createOrderDetails:", error);
      throw new Error(error);
    }
  }

  static async updateOrderDetails(orderDetails) {
    try {
      const sql = `UPDATE orderdetails SET 
      order_id = ?,
      product_id = ?,
      quantity = ?
      WHERE orderdetails_id = ?`;
      const { affectedRows } = await db.query(sql, [orderDetails.orderId, orderDetails.productId, orderDetails.quantity, orderDetails.odId]);

      return affectedRows;
    } catch (error) {
      console.error("Error in updateOrderDetails:", error);
      throw new Error(error);
    }
  }

  static async deleteOrderDetails(odId) {
    try {
      return await db.query('DELETE FROM orderdetails WHERE orderdetails_id = ?', [odId]);
    } catch (error) {
      console.error("Error in deleteOrderDetails:", error);
      throw new Error(error);
    }
  }

  static async getOrderDetailsById(odId) {
    try {
      const sql = `SELECT * FROM orderdetails WHERE orderdetails_id = ?`;
      const rows = await db.query(sql, [odId]);

      return rows;
    } catch (error) {
      console.error("Error in getOrderDetailsById:", error);
      throw new Error(error);
    }
  }

  static async getOrderDetailsByOrderId(orderId) {
    try {
      const sql = `SELECT * FROM orderdetails WHERE order_id = ?`;
      const rows = await db.query(sql, orderId);
      return rows;
    } catch (error) {
      console.error("Error in getOrderDetailsByOrderId:", error);
      throw new Error(error);
    }
  }

  static async getProductByOrderId(orderId) {
    try {
      const sql = `
          SELECT p.* FROM products p
          JOIN orderdetails od ON p.product_id = od.product_id
          WHERE od.order_id = ?
      `;
      const products = await db.query(sql, [orderId]);
      return products;
    } catch (error) {
      console.error("Error in getProductByOrderId:", error);
      throw new Error(error);
    }
  }

  static async getOrderDetails() {
    try {
      const sql = `SELECT * FROM orderdetails`;
      const rows = await db.query(sql);
      return rows;
    } catch (error) {
      console.error("Error in getOrderDetails:", error);
      throw new Error(error);
    }
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
        throw new Error(error);
      }
    }
  static async orderDetailsExist(odId) {
    try {
      const sql = `SELECT * FROM orderdetails WHERE orderdetails_id = ?`;
      const [rows] = await db.query(sql, [odId]);

      if (rows) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking if order details exist:", error);
      throw new Error(error);
    }
  

  }
  static async orderIdExist(orderId) {
    try {
      const sql = `SELECT * FROM orders WHERE order_id = ?`;
      const [rows] = await db.query(sql, [orderId]);

      if (rows) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking if order ID exists:", error);
      throw new Error(error);
    }
  }
  static async productIdExist(productId) {
    try {
      const sql = `SELECT * FROM products WHERE product_id = ?`;
      const [rows] = await db.query(sql, [productId]);

      if (rows) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking if product ID exists:", error);
      throw new Error(error);
    }
  }
  
}
  module.exports = OrderDetailsRepository;