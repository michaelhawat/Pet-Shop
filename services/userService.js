//const { error } = require("console");
const UserRepository = require("../repositories/userRepository");

class UserService{

    static async createUser(user)
    {
       return  UserRepository.createUser(user);
    }
   

    static async updateUser(user)
    {
      return  UserRepository.updateUser(user);
    }
//static async userExist(firstName,lastName){
  //  return UserRepository.userExist(firstName,lastName);
//}
    static async deleteUser(id)
    {

       return UserRepository.deleteUser(id);
    }
static async changePassword(id, newPassword, oldPassword){
    return UserRepository.changePassword(id, newPassword, oldPassword);
}

    static async registration( email ,password){
        
            return UserRepository.authenticate( email,  password);
      
    }
    static async readUsers(){
        return UserRepository.readUsers(); 
    }
     
    static async readUser(id){
        return UserRepository.readUser(id);
    }

    // static async readUserByFN(fn){
    //     return UserRepository.readUserByFN(fn);
    // }

}

module.exports = UserService;