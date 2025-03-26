const productRepository = require('../repositories/productRepository');

class ProductService {
    static async getAllProducts() {
        return await productRepository.getAllProducts();
    }

    static async getProductById(pdId) {
        return await productRepository.getProductById(pdId);
    }

    static async createProduct(pdName,pdPrice) {
        return await productRepository.createProduct(pdName,pdPrice);
    }

    static async updateProduct(pdId,pdName,pdPrice) {
        return await productRepository.updateProduct(pdId,pdName,pdPrice);
    }

    static async deleteProduct(pdId) {
        return await productRepository.deleteProduct(pdId);
    }
}

module.exports = ProductService;
