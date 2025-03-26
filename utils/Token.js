const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

class Token {
    static generateToken(user) {
        return jwt.sign(user, JWT_SECRET, {
        expiresIn: "1h",
        });
    }
    
    static verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET); 
          
    }
    catch (error) {
        console.log("Error verifying token:", error);
        return null;
    }
}
}
module.exports = Token;