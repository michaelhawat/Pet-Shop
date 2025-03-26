const db = require('../config/db');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Utils = require('../utils/Utils');
const Token = require('../utils/Token');
//const AppointmentRepository = require('../repositories/appointmentRepositories');

class UserRepository{
    static async createUser(user) {
        try {
            const sql = `INSERT INTO users 
            (first_name, last_name , email, phone, password,dob)
            VALUES (?, ?, ?, ?, ?,?)`;
            const hashedPassword = await Utils.hashedPassword(user.password);
            const exist = await this.userExist(user.email);
            
            if(!exist){
            const {affectedRows} = await db.query(sql, 
                [user.firstName,user.lastName,user.email,user.phone ,hashedPassword,user.dob]);

            return affectedRows;
            }
            else 
            throw new Error("There is a user that havethe same email");
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async updateUser(user) {
        try {
            const sql = `UPDATE users SET 
            first_name = ?,
            last_name = ?,
            email = ?,
            phone = ?,
            password = ?,
            dob = ?
            WHERE user_id = ?`;
            if(!await this.idExist(user.id)){
                throw new Error("User Id not found");
            }
            const hashedPassword = await Utils.hashedPassword(user.password);
            const exist = await this.userExist(user.email);
            console.log(exist[1]);
            if(user.id == exist[1] || !exist){
            const {affectedRows} = await db.query(sql, 
                [user.firstName,user.lastName,user.email,user.phone ,hashedPassword, user.dob,user.id]);

            return affectedRows;
            }
            else 
            throw new Error("There is a user that have the same email");
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            const exist = await this.idExist(id);
            console.log(exist);
            if(exist)
            return await db.query('DELETE FROM users WHERE user_id = ?', [id]);
        else
        throw new Error("User Id not found");
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    static async authenticate(email, password) {
        try {
            const sqlGet = `SELECT password FROM users WHERE email = ?`;
            const [rows] = await db.query(sqlGet, [email]);

           
            
            if (rows.length === 0) {
                throw new Error("User not found");
            }

            const hash  = rows.password;
           

           
            const match = await this.testBcrypt(password,hash);
           

            if (!match) {
                throw new Error("Old password is incorrect");
            }
            const token = Token.generateToken({
              
                email: email,
                password : password
            });

            console.log("Generated Token:", Token.verifyToken(token));

            let sql = `SELECT * FROM users WHERE 
            email = ? AND password = ?`;

            const [result] = await db.query(sql, [email, hash]);
            
            return result  ;

        } catch (error) {
            console.error('Error authenticating user:', error);
            throw error;
        }
    }

    static async idExist(id) {
        try {
            let sql = `SELECT * FROM users WHERE user_id = ?`
            const [rows] = await db.query(sql, [id]);
          
            if(rows ){
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking if ID exists:', error);
            throw error;
        }
    }

    static async userExist(email) {
        try {
            let sql = `SELECT * FROM users WHERE email = ? `;
            const [rows] = await db.query(sql, [email]);
           console.log(rows);   
           
            if(rows){
                return [true , rows.user_id];
                
            }
            else
            return false;
        } catch (error) {
            console.error('Error checking if user exists:', error);
            throw error;
        }
    }

    static async changePassword(id, newPassword, oldPassword) {
        try {
            
            const sqlGet = `SELECT password FROM users WHERE user_id = ?`;
            const [rows] = await db.query(sqlGet, [id]);

            console.log(oldPassword);
            
            if (rows.length === 0) {
                throw new Error("User not found");
            }

            const hash  = rows.password;
            console.log(hash);

           
            const match = await this.testBcrypt(oldPassword,hash);
           

            if (!match) {
                throw new Error("Old password is incorrect");
            }
             console.log(newPassword);
            
            const newHashedPassword = await Utils.hashedPassword(newPassword);

            const sqlUpdate = `UPDATE users SET password = ? WHERE user_id = ?`;
            const { affectedRows } = await db.query(sqlUpdate, [newHashedPassword, id]);

            return affectedRows; 
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    
}
static async testBcrypt(password, hash){
    

    const match = await bcrypt.compare(password, hash); // Compare with correct password
    console.log("Match:", match);
    return match;

   
}



    static async readUsers() {
        try {
            const rows = await db.query('SELECT * FROM users');
            return rows.map(User.fromRow);
        } catch (error) {
            console.error('Error reading users:', error);
            throw error;
        }
    }
   
    
    static async readUser(id) {
        try {
        if(!await this.idExist(id)){
            throw new Error("User Id not found");
        }
            const sql = `SELECT * FROM users WHERE user_id = ${id}`;
            const [rows] = await db.query(sql,[id]);
    
            return rows;
    } catch (error) {
        console.error('Error reading users:', error);
        throw error;
    }
    }
/*
    static async readUserByFN(fn)
    {
        const sql = `SELECT * FROM users WHERE user_first_name = ?`;
        const [rows] = await db.query(sql, [fn]);

        return rows;
    }*/

   
}

module.exports = UserRepository;