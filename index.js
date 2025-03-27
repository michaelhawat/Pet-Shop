const moment = require("moment");
const pool=require("../Web project/config/db");
const bcrypt = require("bcrypt");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require('./routes/userRoute');
const boardingRoutes = require('./routes/boardingRoute');
const orderRoutes =require('./routes/orderRoute');
const petRoutes = require('./routes/petRoute');
const appRoutes =require('./routes/appointmnentRoute');
const orderDetails = require('./routes/orderDetailsRoute');
const productRoutes = require("./routes/productRoute");
const paymentRoutes = require("./routes/paymentRoute");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/pets',petRoutes);
app.use('/api/app', appRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orderDetails', orderDetails);
app.use('/api/boardings',boardingRoutes);
app.use('/api/products',productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT;


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
/*const   testConnection =async ()=>{
    try{
   await pool.getConnection();
   console.log("connected to mariadb")
    }
    catch{
console.log("nor connected");
    }
}
testConnection();
*/
