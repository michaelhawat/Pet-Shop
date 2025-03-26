const db = require('../config/db');

const Product = require('../models/productModel');


class ProductRepository {

static async getAllProducts() {
    try {
        return await Product.findAll();
        
    } catch (error) {
        throw new Error(error);
    }
}
static async getProductById(pdId){
    try {

        
        return await Product.findByPk(pdId);
    } catch (error) {
        throw new Error(error);
    }
}
static async createProduct(pdName,pdPrice){
try {
    const newProduct = await Product.create({
        pd_name: pdName,
        pd_price:pdPrice
    });
    return newProduct;
} catch (error) {
    throw new Error(error); 
}
}

static async updateProduct(pdId,pdName,pdPrice){
    try {
        
        const updateProduct = await Product.update({
            pd_name:pdName,
            pd_price : pdPrice
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