const productService = require('../services/productService');
const Product = require('../models/productModel');
    
class ProductController {
    static async getAllProducts(req, res) {
       try {
            const products = await productService.getAllProducts();
            return res.status(200).json(products);
              }
              catch(error){
                return res.status(500).json({status: 500, message: error.message});              }
    }

    static async getProductById(req, res) {
      try {
        const{pdId} = req.params;     
           
        const product = await productService.getProductById(pdId);
         return res.status(200).json({product});
      } catch (error) {
        return res.status(500).json({status: 500, message: error.message});
      }
    }

   static  async createProduct(req, res) {
      try {
        const  {pdName , pdPrice} = req.body;

        var product = new Product (0,pdName,pdPrice);
               const  newProduct = await productService.createProduct(pdName,pdPrice);
              return  res.status(201).json({message:`${pdName} has created succesfuly`});
      } catch (error) {
        return res.status(500).json({status: 500, message: error.message});      }
        
        
    }

    static async updateProduct(req, res) {
   try
   { const {pdId} = req.params;
    const {pdName,pdPrice} = req.body;
           
            
            const product = new Product(pdId,pdName,pdPrice);
                const updatedProduct = await productService.updateProduct(pdId,pdName,pdPrice);
        return res.status(200).json({message:`${pdName} has updated succesfuly`});}
catch(error){
    return res.status(500).json({status: 500, message: error.message});}
            
            }

    static async deleteProduct(req, res) {
       try {
        const {pdId}= req.params;
          
            const deletedProduct = await productService.deleteProduct(pdId);

           return res.status(200).json({ message: 'Product deleted successfully' });
        
       } catch (error) {
        return res.status(500).json({status: 500, message: error.message});       }
    
}
}

module.exports =  ProductController;