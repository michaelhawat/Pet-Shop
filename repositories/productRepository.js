const db = require('../config/db');

const Product = require('../models/productModel');


class ProductRepository {
 /**
 * Retrieve all products from the database
 * @returns {Array} List of products
 * @throws {Error} if there is an error fetching products
 */ 
static async getAllProducts() {
    try {
        return await Product.findAll();
        
    } catch (error) {
        throw new Error(error);
    }
}

  /**
 * Retrieve a specific product by its ID
 * @param {number} pdId - Product ID
 * @returns {object} Product data
 * @throws {Error} if there is an error fetching the product
 */

static async getProductById(pdId){
    try {

        
        return await Product.findByPk(pdId);
    } catch (error) {
        throw new Error(error);
    }
}
/**
 * Create a new product in the database
 * @param {string} pdName - Product name
 * @param {number} pdPrice - Product price
 * @returns {object} Created product data
 * @throws {Error} if there is an error creating the product
 */
static async createProduct(pdName,pdPrice,category,description){
try {
    const newProduct = await Product.create({
        pd_name: pdName,
        pd_price:pdPrice,
        category:category,
        description:description
    });
    return newProduct;
} catch (error) {
    throw new Error(error); 
}
}
/**
 * Update an existing product in the database
 * @param {number} pdId - Product ID
 * @param {string} pdName - New product name
 * @param {number} pdPrice - New product price
 * @returns {number} affectedRows
 * @throws {Error} if there is an error updating the product
 */

static async updateProduct(pdId,pdName,pdPrice,category,description){
    try {
        
        const updateProduct = await Product.update({
            pd_name:pdName,
            pd_price : pdPrice
            ,category:category,
            description:description
        },
            {
                where:{product_id : pdId}
        }
        );
        return updateProduct;
}
catch(error){
    throw new Error(error);
}
}
/**
 * Delete a product from the database
 * @param {number} pdId - Product ID
 * @returns {number} affectedRows
 * @throws {Error} if there is an error deleting the product
 */
static async deleteProduct(pdId) {
    try {
       
        return await Product.destroy({
         where : {product_id :pdId}
        }
    );
    } catch (error) {
        throw   new Error(error);
    }
}

}
module.exports = ProductRepository;