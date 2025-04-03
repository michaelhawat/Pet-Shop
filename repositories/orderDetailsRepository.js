const db = require('../config/db');
const OrderDetails = require('../models/orderDetailsModels');
//const Order = require('../repositories/orderRepository');
//const Product = require('../repositories/productRepository');

class OrderDetailsRepository {
   /**
     * Create a new order details record in the database
     * @param {object} orderDetails - Order details
     * @returns {number} affectedRows
     * @throws {Error} if there is an error creating the order details
     */
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
/**
     * Update an existing order details record in the database
     * @param {object} orderDetails - Order details
     * @returns {number} affectedRows
     * @throws {Error} if there is an error updating the order details
     */
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
/**
     * Delete an order details record from the database
     * @param {number} odId - Order details ID
     * @returns {number} affectedRows
     * @throws {Error} if there is an error deleting the order details
     */
  static async deleteOrderDetails(odId) {
    try {
      return await db.query('DELETE FROM orderdetails WHERE orderdetails_id = ?', [odId]);
    } catch (error) {
      console.error("Error in deleteOrderDetails:", error);
      throw new Error(error);
    }
  }
/**
     * Retrieve order details by a specific ID
     * @param {number} odId - Order details ID
     * @returns {Array} Order details record
     * @throws {Error} if there is an error retrieving the order details
     */
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
 /**
     * Retrieve order details by a specific order ID
     * @param {number} orderId - Order ID
     * @returns {Array} List of order details associated with the order
     * @throws {Error} if there is an error retrieving the order details
     */
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
/**
     * Retrieve products by a specific order ID
     * @param {number} orderId - Order ID
     * @returns {Array} List of products associated with the order
     * @throws {Error} if there is an error retrieving the products
     */
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
/**
     * Retrieve all order details
     * @returns {Array} List of all order details
     * @throws {Error} if there is an error retrieving order details
     */
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
/**
     * Calculate the total amount for a given order detail ID
     * @param {number} odId - Order details ID
     * @returns {number} Total amount
     * @throws {Error} if there is an error calculating the total amount
     */
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
     /**
     * Check if an order details record exists in the database
     * @param {number} odId - Order details ID
     * @returns {boolean} true if order details exist, false otherwise
     * @throws {Error} if there is an error checking for order details existence
     */
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
   /**
     * Check if an order ID exists in the database
     * @param {number} orderId - Order ID
     * @returns {boolean} true if order ID exists, false otherwise
     * @throws {Error} if there is an error checking for order ID existence
     */
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
      /**
     * Check if a product ID exists in the database
     * @param {number} productId - Product ID
     * @returns {boolean} true if product ID exists, false otherwise
     * @throws {Error} if there is an error checking for product ID existence
     */
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