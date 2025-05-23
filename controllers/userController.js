const UserRepository = require("../repositories/userRepository");
const UserService = require("../services/userService");
const User = require("../models/userModel");
const Utils = require("../utils/Utils");
const e = require("express");

class UserController{
    static async createUser(req, res) {
        try {
            const { firstName, lastName, email, phone, newPassword,dob } = req.body;
           
            var user = new User(0, firstName, lastName, email, phone, newPassword,dob);
            const result = await UserService.createUser(user);
            res.status(200).json({ message: `user ${firstName} created successfully` });
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }
    static async signUp(req, res) {
        try {
            const { email,  password ,confirm } = req.body;
           
            var user = new User(0, "firstName", "lastName", email, "03-12345678", password,Utils.formatDay());
            const result = await UserService.createUser(user);
            res.redirect('/');
        } catch (error) {
          res.redirect('/signUp.ejs'  );
        }
    }
// static async userExist(req,res){
//     const {firstName,lastName} = req.body;
//     const result = await UserService.userExist(firstName,lastName);
//     return res.status(200).json(result);
// }
    static async getAllUsers(req, res) {
        try {
            const result = await UserService.readUsers();
           return  res.status(200).json(result);
        } catch (error) {
           return res.status(500).json({ status: 500, message: error.message });
        }
    }
static async loadUserForm(req, res){
        const {id} = req.params;
        // get the fresh data from the db
        // to make sure that we have the latest data.
        const result = await UserService.readUser(id);

        res.render('editUser', {user: result});
    }
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { firstName, lastName, email, phone ,dob} = req.body;
           
            var user = new User(id, firstName, lastName, email, phone ,0,dob);
            const result = await UserService.updateUser(user);
           
            res.redirect('/users.ejs');
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
           
            const result = await UserService.deleteUser(id);
            res.redirect("/users.ejs");
        } catch (error) {
            res.status(500).json({ status: 500, message:"Id is not correct" });
        }
    }

    static async changePassword(req, res) {
        try {
            const { id } = req.params;
            const { newPassword, oldPassword } = req.body;
           
            const result = await UserService.changePassword(id, newPassword, oldPassword);
            res.status(201).json({ message: `password of ${id} changed successfully` });
        } catch (error) {
            res.status(500).json({ status: 500, message:"Old Password is incorrect", error });
        }
    }
    static async registration(req,res){
        try {
            const {email, password} = req.body;
           
            const result = await UserService.registration(email, password);
            const user =  await UserService.userExist(email);
            if(user[1] == 1){
                res.redirect('/adminView.ejs'  );
            }
            else {
                res.redirect('/');
            } 
            } catch (error) {
                res.redirect('/signIn.ejs' );
            }  
     
    }
    static async getUser(req,res){
      try {

        const {id}= req.params;
        const result = await UserService.readUser(id);
       return res.status(200).json(result);
     } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
     }
 }
}

module.exports=UserController;