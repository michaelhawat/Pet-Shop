//const { error } = require("console");
const UserRepository = require("../repositories/userRepository");

class UserService{

    static async createUser(user) {
        try {
            return await UserRepository.createUser(user);
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    static async updateUser(user) {
        try {
            return await UserRepository.updateUser(user);
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    static async deleteUser(id) {
        try {
            if (!await UserRepository.idExist(id)) {
                throw new Error("User Id not found");
            }
            return await UserRepository.deleteUser(id);
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    static async changePassword(id, newPassword, oldPassword) {
        try {
            
            return await UserRepository.changePassword(id, newPassword, oldPassword);
        } catch (error) {
            throw new Error(`Error changing password: ${error.message}`);
        }
    }

    static async registration(email, password) {
        try {
            return await UserRepository.authenticate(email, password);
        } catch (error) {
            throw new Error(`Error during registration: ${error.message}`);
        }
    }

    static async readUsers() {
        try {
            return await UserRepository.readUsers();
        } catch (error) {
            throw new Error(`Error reading users: ${error.message}`);
        }
    }

    static async readUser(id) {
        try {
            return await UserRepository.readUser(id);
        } catch (error) {
            throw new Error(`Error reading user: ${error.message}`);
        }
    }
    static async userExist(email){
        try {
            return await UserRepository.userExist(email);
        } catch (error) {
            throw new Error(`Error checking user existence: ${error.message}`);
        }
    }

    

}

module.exports = UserService;