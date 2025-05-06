const moment = require("moment");
const pool=require("../Web project/config/db");
const bcrypt = require("bcrypt");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");
const userRoutes = require('./routes/userRoute');
const boardingRoutes = require('./routes/boardingRoute');
const orderRoutes =require('./routes/orderRoute');
const petRoutes = require('./routes/petRoute');
const appRoutes =require('./routes/appointmnentRoute');
const orderDetails = require('./routes/orderDetailsRoute');
const productRoutes = require("./routes/productRoute");
const paymentRoutes = require("./routes/paymentRoute");
const UserService = require("./services/userService");
const path = require('path');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());
const PetService = require('./services/petService');

app.use('/api/pets',petRoutes);
app.use('/api/app', appRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orderDetails', orderDetails);
app.use('/api/boardings',boardingRoutes);
app.use('/api/products',productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use(express.static('public'));

const PORT = process.env.PORT;

app.get('/', async (req, res) => {    
    // const users = await UserService.readUsers();
     //const pets = await PetService.getAllPets();
     try{
     res.render('home.ejs', { message : 'Welcome to the Home Page' });
     }catch(err){
         console.error(err);
         res.status(500).send('Internal Server Error');
 }
 });
app.get('/users.ejs', async (req, res) => {    
   const users = await UserService.readUsers();
    const pets = await PetService.getAllPets();
    res.render('users.ejs', { message : 'Welcome to the Home Page' , users : users , pets : pets});

});

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
