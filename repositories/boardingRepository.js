const db = require('../config/db');
const Utils = require('../utils/Utils');
const Boardings = require('../models/boardingModel');
const { EmptyResultError } = require('sequelize');

class BoardingRepository {
static async createBoarding(boarding) {
    try {
        const sql = `INSERT INTO boarding
        (pet_id, check_in_date, check_out_date) 
        VALUES (?, ?, ?)`;
        const { affectedRows } = await db.query(sql, [boarding.petId, boarding.checkIn, boarding.checkOut]); 
        return affectedRows;
    } catch (error) {
        console.error('Error creating boarding:', error);
        throw error;
    }
}

static async updateBoarding(boarding) {
    try {
        const sql = `UPDATE boarding SET
        pet_id = ?,
        check_in_date = ?,
        check_out_date = ?
        WHERE boarding_id = ?`;

        const { affectedRows } = await db.query(sql, [boarding.petId, boarding.checkIn, boarding.checkOut, boarding.boardingId]);
        return affectedRows;
    } catch (error) {
        console.error('Error updating boarding:', error);
        throw error;
    }
}

static async deleteBoarding(boardingId) {
    try {
        const sql = `DELETE FROM boarding WHERE boarding_id = ?`;

        const { affectedRows } = await db.query(sql, [boardingId]);
        return affectedRows;
    } catch (error) {
        console.error('Error deleting boarding:', error);
        throw error;
    }
}

static async getBoardingByDate(checkIn) {
    try {
        const sql = `SELECT * FROM boarding WHERE check_in_date = ?`;
        const rows = await db.query(sql, [Utils.formatDateSQL(checkIn)]);
        const exist =await this.boardingDateExists(checkIn);
            if(!rows.user_id == exist[1] || !exist ) {
            throw new Error('boarding aleready exist');
            }  
        console.log(rows);
        return rows;
    } catch (error) {
        console.error('Error fetching boarding by date:', error);
        throw error;
    }
}

static async getBoardingByPet(petId) {
    try {
        const sql = `SELECT * FROM boarding WHERE pet_id = ?`;
        const [rows] = await db.query(sql, [petId]);
        return rows;
    } catch (error) {
        console.error('Error fetching boarding by pet:', error);
        throw error;
    }
}

static async getBoardings() {
    try {
        const sql = `SELECT * FROM boarding`;
        const rows = await db.query(sql);
        return [rows];
    } catch (error) {
        console.error('Error fetching all boardings:', error);
        throw error;
    }
}

static async boardingExists(checkIn,petId) {
    try {
        
        const sql =`SELECT * FROM boarding WHERE check_in_date = ? AND  pet_id = ?`;
        const rows = await db.query(sql,[checkIn,petId])

       console.log(rows);
        if (rows == 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Error checking if boarding exists:', error);
        throw error;
    }
}
static async boardingExists(checkIn,petId) {
    try {
        
        const sql =`SELECT * FROM boarding WHERE check_in_date = ? AND  pet_id = ?`;
        const rows = await db.query(sql,[checkIn,petId])
       console.log(rows);
        if (rows == 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Error checking if boarding exists:', error);
        throw error;
    }
}
static async boardingDateExists(checkIn) {
    try {
        const sql = `SELECT * FROM boarding WHERE check_in_date = ?`;
        const rows = await db.query(sql, [checkIn]); // Destructure rows correctly
        console.log(rows);
        if (rows) { // Check if rows is not empty
            return [true, rows.boarding_id]; // Access the first row's boarding_id
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking if boarding exists:', error);
        throw error;
    }
}

static async boardingIdExists(boardingId) {
    try {
        const sql = `SELECT * FROM boarding WHERE boarding_id = ?`;
        const [rows] = await db.query(sql, [boardingId]);
       
        if(rows)
            return true;
        else
        return false;
    } catch (error) {
        console.error('Error checking if boarding ID exists:', error);
        throw error;
    }
}

static async  petExist(petId) {
    try {
        let sql = `SELECT * FROM pets WHERE pet_id = ? `;
        const [rows] = await db.query(sql, [petId]);
       console.log(rows);   
       
        if(rows){
            return [true ];
            
        }
        else
        return false;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
}
}

module.exports = BoardingRepository;