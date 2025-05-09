const{DataTypes,Model}= require('sequelize');
const sequelize = require('../config/db-sequelize');

class Product extends Model{}

Product.init({
    product_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    pd_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    pd_price:{
        type:DataTypes.DECIMAL,
        allowNull:false

    },
    category:{
        type:DataTypes.STRING,
        allowNull:true
    },
 }, {
        sequelize,
        modelName:'Product',
        tableName:'products',
        timestamps:false
    }
);
module.exports = Product;   