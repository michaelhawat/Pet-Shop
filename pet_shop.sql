-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.4.0-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for pet_shop
CREATE DATABASE IF NOT EXISTS `pet_shop` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `pet_shop`;

-- Dumping structure for table pet_shop.appointments
CREATE TABLE IF NOT EXISTS `appointments` (
  `appointment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `pet_id` int(11) NOT NULL,
  `app_date` datetime DEFAULT NULL,
  `services` set('Vaccination','Grooming','Training','Medical_Report','') DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `user_id` (`user_id`),
  KEY `pet_id` (`pet_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`pet_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table pet_shop.appointments: ~4 rows (approximately)
INSERT INTO `appointments` (`appointment_id`, `user_id`, `pet_id`, `app_date`, `services`) VALUES
	(1, 2, 1, '2025-03-05 05:00:00', 'Training'),
	(2, 1, 1, '2025-05-05 07:00:00', 'Training'),
	(4, 1, 1, '2025-05-05 07:00:00', 'Vaccination,Training');

-- Dumping structure for table pet_shop.boarding
CREATE TABLE IF NOT EXISTS `boarding` (
  `boarding_id` int(11) NOT NULL AUTO_INCREMENT,
  `pet_id` int(11) NOT NULL,
  `check_in_date` datetime NOT NULL,
  `check_out_date` datetime NOT NULL,
  PRIMARY KEY (`boarding_id`),
  KEY `pet_id` (`pet_id`),
  CONSTRAINT `boarding_ibfk_1` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`pet_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table pet_shop.boarding: ~2 rows (approximately)
INSERT INTO `boarding` (`boarding_id`, `pet_id`, `check_in_date`, `check_out_date`) VALUES
	(1, 1, '2025-03-05 06:00:00', '2025-03-07 12:00:00'),
	(2, 1, '2025-03-07 07:00:00', '2025-03-08 09:00:00'),
	(3, 1, '2025-04-04 04:30:00', '2025-04-05 05:00:00');

-- Dumping structure for table pet_shop.orderdetails
CREATE TABLE IF NOT EXISTS `orderdetails` (
  `orderdetails_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`orderdetails_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table pet_shop.orderdetails: ~3 rows (approximately)
INSERT INTO `orderdetails` (`orderdetails_id`, `order_id`, `product_id`, `quantity`) VALUES
	(2, 2, 1, 10),
	(3, 1, 1, 50),
	(6, 1, 3, 10);

-- Dumping structure for table pet_shop.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table pet_shop.orders: ~3 rows (approximately)
INSERT INTO `orders` (`order_id`, `user_id`, `order_date`) VALUES
	(1, 1, '2025-02-26 11:40:37'),
	(2, 2, '2025-02-27 00:00:00'),
	(5, 33, '2025-03-23 10:54:00');

-- Dumping structure for table pet_shop.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `orderdetails_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_method` enum('Cash','Card','Online','check') NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `orderdetails_id` (`orderdetails_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`orderdetails_id`) REFERENCES `orderdetails` (`orderdetails_id`) ON DELETE CASCADE,
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table pet_shop.payments: ~0 rows (approximately)

-- Dumping structure for table pet_shop.pets
CREATE TABLE IF NOT EXISTS `pets` (
  `pet_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `pet_name` varchar(50) NOT NULL,
  `pet_type` enum('Dog','Cat','Bird','Other') NOT NULL,
  `vaccinated` enum('Yes','No') DEFAULT 'No',
  `pet_age` int(11) NOT NULL,
  `pet_gender` enum('Male','Female') DEFAULT 'Male',
  PRIMARY KEY (`pet_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table pet_shop.pets: ~4 rows (approximately)
INSERT INTO `pets` (`pet_id`, `user_id`, `pet_name`, `pet_type`, `vaccinated`, `pet_age`, `pet_gender`) VALUES
	(1, 1, 'kingo', 'Dog', 'Yes', 3, 'Male'),
	(2, 2, 'boykas', 'Dog', 'Yes', 4, 'Male'),
	(3, 30, 'Cookie', 'Cat', 'Yes', 2, 'Female'),
	(4, 24, 'Budy', 'Dog', 'Yes', 2, 'Male');

-- Dumping structure for table pet_shop.products
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `pd_name` varchar(100) NOT NULL,
  `pd_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table pet_shop.products: ~4 rows (approximately)
INSERT INTO `products` (`product_id`, `pd_name`, `pd_price`) VALUES
	(1, 'showergel', 7.00),
	(3, 'brush', 5.00),
	(4, 'dry-food', 10.00),
	(5, 'Chain', 13.00);

-- Dumping structure for table pet_shop.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table pet_shop.users: ~7 rows (approximately)
INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `phone`, `password`, `dob`) VALUES
	(1, 'mik', 'ha', 'mikha@gmail.com', '0909090', '$2b$10$3BHhZ5pcBxaoReApWchDGOcgX3N7NxLu7M0/FEb0ZgVHjohBT8cvC', '2025-03-22'),
	(2, 'michael', 'hawat', 'micahelhawata@gmail.com', '71227103', '$2b$10$9IROvDs.Zql2TygRuuVa5uXYQDZfTb8qsExWrrzeoapuxxoUVXsR6', '2025-03-22'),
	(24, 'michaelll', 'hawat', 'michael.hawat@gmail.com', '71227103', '$2b$10$nuNS0rDzs7ZJwCz7Xu34PunkQCGHTA/U65IWcbawaPrtI3Pr.1ECq', '2025-03-22'),
	(25, 'michael', 'hawat', 'michael.hawat@std.balamand.edu.lbb', '712271', '$2b$10$lQsBkbQPVEn7P/nkFEQNHeGeRygOHGUSfeXqohIFbGRrM6e/l7WLa', '2025-06-17'),
	(30, 'michael', 'hawat', 'michael.hawat@std.balamand.edu.lb', '712271', '$2b$10$wXnry4kgjhrLRZjG.5QzKuOtGvlGxoPMdFMwjLfgMtqTkyhjfw9k.', '2025-06-17'),
	(33, 'marck', 'hawat', 'marcl.hawat@gmail.com', '0991234', '$2b$10$/Aa1OvtTkBWI.KmlGQFRhek8jKrHCvIwH6vsoxbiTkU7W5JvXtWqO', '2005-02-24'),
	(34, 'marckk', 'hawat', 'marck.hawat@gmail.com', '0991234', '$2b$10$UQ4tbngrCkNJCqG4NXnweOwlR6SqejI4PeOIf.e4CT2G9UHwnFuJ6', '2005-02-24');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
