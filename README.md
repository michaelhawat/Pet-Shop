# 🐾 Pet Shop Management System

## 📌 Overview
This project is a **Node.js** application that interacts with a **MariaDB** database to manage a pet shop business. It includes features for pet services, pet boarding, product sales, and customer management. The backend follows best practices for structuring a scalable and secure service, incorporating database management, RESTful API development, and authentication.

## 🫠 Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [MariaDB](https://mariadb.com/) (v10.0 or later recommended)
- [Postman](https://www.postman.com/) (for API testing, optional)

## 📚 Project Structure
```
/pet-shop-backend
│── src
│   ├── config          # Configuration files (DB, dotenv, etc.)
│   ├── controllers     # Business logic for API endpoints
│   ├── models          # Database models and schema
│   ├── routes          # Express routes
│   ├── validators      # Validation, etc.
│   ├── utils           # Utility functions
│── .env                # Environment variables
│── package.json        # Dependencies and scripts
│── index.js            # Entry point of the application
|── .gitignore          # Git ignored files
|── pet_shop.sql        # Database schema
|── README.md           # Documentation
```

## 🚀 Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/michaelhawat/Pet-Shop.git
   cd pet-shop-backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3001
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=petshop_db
   ```

4. **Start MariaDB and create a database**
   ```sql
   CREATE DATABASE petshop_db;
   ```

5. **Run database migrations (if applicable)**
   ```sh
   npm run migrate
   ```

6. **Start the server**
   ```sh
   npm start
   ```
   dev mode:
   ```sh
   npm run dev
   ```
   The server will run on `http://localhost:3000`.

## 📌 API Endpoints
### **User Routes**
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| GET    | /               | Get all users                |
| POST   | /               | Create a new user            |
| PUT    | /:id            | Update user                  |
| GET    | /id/:id         | Get user by ID               |
| DELETE | /:id            | Delete user                  |
| GET    | /reg            | User registration            |
| PUT    | /newPassword/:id | Change user password        |

### **Pet Routes**
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| POST   | /               | Create a pet                 |
| PUT    | /:petId         | Update pet details           |
| DELETE | /:petId         | Delete pet                   |
| GET    | /               | Get all pets                 |
| GET    | /user/:id       | Get pets by user ID          |
| GET    | /:petId         | Get pet by ID                |

### **Appointment Routes**
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| POST   | /               | Create an appointment        |
| PUT    | /:appId         | Update an appointment        |
| DELETE | /:appId         | Delete an appointment        |
| GET    | /               | Get all appointments         |
| GET    | /pet/:petId     | Get appointments by pet ID   |
| GET    | /user/:userId   | Get appointments by user ID  |

### **Boarding Routes**
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| POST   | /               | Create boarding              |
| PUT    | /:boardingId    | Update boarding              |
| DELETE | /:boardingId    | Delete boarding              |
| GET    | /date           | Get boarding by date         |
| GET    | /pet/:petId     | Get boarding by pet ID       |
| GET    | /               | Get all boardings            |

### **Order Routes**
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| GET    | /               | Get all orders               |
| POST   | /:userId        | Create an order              |
| PUT    | /:orderId       | Update an order              |
| DELETE | /:orderId       | Delete an order              |
| GET    | /:orderId       | Get order by ID              |
| GET    | /userId/:userId | Get orders by user ID        |

### **Order Details Routes**
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| POST   | /               | Create order details         |
| PUT    | /:odId          | Update order details         |
| DELETE | /:odId          | Delete order details         |
| GET    | /               | Get all order details        |
| GET    | /:odId          | Get order details by ID      |
| GET    | /order/:orderId | Get order details by order ID |
| GET    | /product/:orderId | Get product by order ID   |
| GET    | /total/:odId    | Get total amount             |

### **Product Routes**
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| GET    | /               | Get all products             |
| GET    | /:pdId          | Get product by ID            |
| POST   | /               | Create a product             |
| PUT    | /:pdId          | Update product details       |
| DELETE | /:pdId          | Delete a product             |

### **Payment Routes**
| Method | Endpoint                 | Description                        |
|--------|---------------------------|------------------------------------|
| POST   | /                         | Create a payment                   |
| GET    | /                         | Get all payments                   |
| GET    | /:paymentId               | Get payment by ID                  |
| PUT    | /:paymentId               | Update payment                     |
| DELETE | /:paymentId               | Delete payment                     |
| GET    | /User/:id                 | Get all payments by user ID        |
| GET    | /date/:paymentDate        | Get payments by date               |
| GET    | /dates/:startDate/:endDate | Get payments by date range        |

## 🧮 Technologies Used
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MariaDB** - Relational database
- **Sequelize** - ORM for database interaction
- **dotenv** - Environment variable management
- **bcrypt** - A library to hash passwords and perform secure password comparisons.
- **body-parser** - Middleware for parsing incoming request bodies, available under the `req.body` property.
- **cors** - Middleware to enable Cross-Origin Resource Sharing (CORS) in your Express application.
- **express-validator**- Middleware that wraps validator.js to validate and sanitize input data.
- **jsonwebtoken** - Library for signing and verifying JSON Web Tokens (JWT) for authentication and authorization.
- **nodemon** - A tool that automatically restarts your Node.js application when file changes are detected
- **moment** - A library for parsing, validating, manipulating, and displaying dates in JavaScript.


## 📝 Best Practices Followed
✔️ Follows MVC architecture  
✔️ Uses environment variables for security  
✔️ Implements authentication & authorization  
✔️ Handles errors & input validation  
✔️ Uses async/await for better promise handling

## 📝 License
This project is licensed under the MIT License.

---
Feel free to contribute by opening issues or submitting pull requests! 🚀

