const productRepository = require('../repositories/productRepository');
const Product = require('../models/productModel');

class ProductService {
    static async getAllProducts() {
        try {
            return await productRepository.getAllProducts();
        } catch (error) {
            console.error('Error in getAllProducts:', error);
            throw error;
        }
    }

    static async getProductById(pdId) {
        try {
            if( await Product.findByPk(pdId) == null)
                
                    throw new Error("Product Id don't exist");
            return await productRepository.getProductById(pdId);
        } catch (error) {
            console.error('Error in getProductById:', error);
            throw error;
        }
    }

    static async createProduct(pdName, pdPrice) {
        try {
            return await productRepository.createProduct(pdName, pdPrice);
        } catch (error) {
            console.error('Error in createProduct:', error);
            throw error;
        }
    }

    static async updateProduct(pdId, pdName, pdPrice) {
        try {
            if( await Product.findByPk(pdId) == null)
            
                throw new Error("Product Id don't exist");
            return await productRepository.updateProduct(pdId, pdName, pdPrice);
        } catch (error) {
            console.error('Error in updateProduct:', error);
            throw error;
        }
    }

    static async deleteProduct(pdId) {
        try {
            if(await Product.findByPk(pdId)==null)
                throw new Error("Id doesn't exist");
            return await productRepository.deleteProduct(pdId);
        } catch (error) {
            console.error('Error in deleteProduct:', error);
            throw error;
        }
    }
}

module.exports = ProductService;
