const {DataTypes , Model } = require('sequelize');
const sequelize = require('../config/db-sequelize');
const Utils = require('../utils/Utils');

class Order extends Model{}

Order.init({
    order_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    order_date:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:Utils.formatDate()
    }
},{
    sequelize,
    modelName:'Order',
    tableName:'orders',
    timestamps:false
});
module.exports = Order;