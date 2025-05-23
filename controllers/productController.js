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
        const  {pdName , pdPrice ,category,description} = req.body;

        var product = new Product (0,pdName,pdPrice,category,description);
               const  newProduct = await productService.createProduct(pdName,pdPrice,category,description);
              res.redirect('/products.ejs')
      } catch (error) {
        return res.status(500).json({status: 500, message: error.message});      }
        
        
    }
static async loadPdForm(req, res){
        const {pdId} = req.params;
        // get the fresh data from the db
        // to make sure that we have the latest data.
        const result = await productService.getProductById(pdId);

        res.render('editPd', {product: result });
    }
    static async updateProduct(req, res) {
   try
   { const {pdId} = req.params;
    const {pdName,pdPrice,category,description} = req.body;
           
            
            const product = new Product(pdId,pdName,pdPrice,category,description);
                const updatedProduct = await productService.updateProduct(pdId,pdName,pdPrice,category,description);
        res.redirect('/products.ejs');
      }
catch(error){
    return res.status(500).json({status: 500, message: error.message});}
            
            }

    static async deleteProduct(req, res) {
       try {
        const {pdId}= req.params;
          
            const deletedProduct = await productService.deleteProduct(pdId);

res.redirect('/products.ejs');        
       } catch (error) {
        return res.status(500).json({status: 500, message: error.message});       }
    
}

static async productsView(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.render('products.ejs', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
}
module.exports =  ProductController;