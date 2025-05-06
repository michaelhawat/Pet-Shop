const db = require('../config/db');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Utils = require('../utils/Utils');
const Token = require('../utils/Token');
//const AppointmentRepository = require('../repositories/appointmentRepositories');

class UserRepository{
    /**
     * create a new user in the database
     * @param {object} user 
     * @returns {number} affectedRows
     * @throws {Error} if user already exists
     * @throws {Error} if there is an error creating the user
     */
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
    /** 
    * Update an existing user in the database
    * @param {object} user 
    * @returns {number} affectedRows
    * @throws {Error} if user ID does not exist
    * @throws {Error} if email is already taken by another user
    */
   

    static async updateUser(user) {
        try {
            const sql = `UPDATE users SET 
            first_name = ?,
            last_name = ?,
            email = ?,
            phone = ?, 
            dob = ?
            WHERE user_id = ?`;
            if(!await this.idExist(user.id)){
                throw new Error("User Id not found");
            }
           // const hashedPassword = await Utils.hashedPassword(user.password);
            const exist = await this.userExist(user.email);
            console.log(exist[1]);
            if(user.id == exist[1] || !exist){
            const {affectedRows} = await db.query(sql, 
                [user.firstName,user.lastName,user.email,user.phone , user.dob,user.id]);

            return affectedRows;
            }
            else 
            throw new Error("There is a user that have the same email");
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
 /**
     * Delete a user from the database
     * @param {number} id - User ID
     * @returns {object} result of deletion query
     * @throws {Error} if user ID is not found
     */
    static async deleteUser(id) {
        try {
            
            return await db.query('DELETE FROM users WHERE user_id = ?', [id]);
          
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
/**
     * Authenticate a user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {object} user data if authentication is successful
     * @throws {Error} if user is not found or password is incorrect
     */
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
            
            return ["Login succesfuly " ,Token.verifyToken(token)]  ;

        } catch (error) {
            console.error('Error authenticating user:', error);
            throw error;
        }
    }
 /**
     * Check if a user ID exists in the database
     * @param {number} id - User ID
     * @returns {boolean} true if user exists, false otherwise
     * @throws {Error} if there is an error checking the user ID
     */
    
    static async idExist(id) {
        try {
            let sql = `SELECT * FROM users WHERE user_id = ?`
            const [rows] = await db.query(sql, [id]);
          console.log(rows);
            if(rows ){
                return true;
            }
            else
            return false;
        } catch (error) {
            console.error('Error checking if ID exists:', error);
            throw error;
        }
    }
/**
     * Check if a user exists in the database by email
     * @param {string} email - User email
     * @returns {Array} [true, user_id] if user exists, false otherwise
     * @throws {Error} if there is an error checking the user
     */
    
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
 /**
     * Change the password of a user
     * @param {number} id - User ID
     * @param {string} newPassword - New password
     * @param {string} oldPassword - Old password
     * @returns {number} affectedRows
     * @throws {Error} if user ID is not found or old password is incorrect
     */
    
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


/**
     * Retrieve all users from the database
     * @returns {Array} List of users
     * @throws {Error} if there is an error fetching users
     */
    
    static async readUsers() {
        try {
            const rows = await db.query('SELECT * FROM users');
            return rows.map(User.fromRow);
        } catch (error) {
            console.error('Error reading users:', error);
            throw error;
        }
    }
   
    /**
     * Retrieve a specific user from the database
     * @param {number} id - User ID
     * @returns {object} User data
     * @throws {Error} if user ID is not found
     */

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