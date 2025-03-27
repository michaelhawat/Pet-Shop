const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db-sequelize');

class Payment extends Model{}

Payment.init({
    payment_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    orderdetails_id:{
type:DataTypes.INTEGER,
allowNull:false
},
user_id:{
    type:DataTypes.INTEGER,
    allowNull:false
},
payment_method:{    
    type:DataTypes.STRING,
    allowNull:false
},
payment_date:{
    type:DataTypes.DATE,
    allowNull:false
},

}, {
    sequelize,
    modelName:'Payment',
    tableName:'payments',
    timestamps:false
}
);


module.exports = Payment;