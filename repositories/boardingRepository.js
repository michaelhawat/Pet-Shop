const db = require('../config/db');
const Utils = require('../utils/Utils');
const Boardings = require('../models/boardingModel');

class BoardingRepository {
 static async createBoarding(boarding) {
const sql = `INSERT INTO boarding
 (pet_id, check_in_date, check_out_date) 
VALUES (?, ?, ?)`;
const { affectedRows } = await db.query(sql, [boarding.petId, boarding.checkIn, boarding.checkOut]); 
return affectedRows;

 }
static async updateBoarding(boarding) {
const sql = `UPDATE boarding SET
 pet_id = ?,
 check_in_date = ?,
 check_out_date = ?
 WHERE boarding_id = ?`;

 const { affectedRows } = await db.query(sql, [boarding.petId, boarding.checkIn, boarding.checkOut, boarding.boardingId]);
    return affectedRows;
    }

    static async deleteBoarding(boardingId) {
        const sql =`DELETE FROM boarding WHERE boarding_id = ?`;

        const { affectedRows } = await db.query(sql, [boardingId]);
        return affectedRows;
    }

    static async getBoardingByDate(checkIn) {
        const sql = `SELECT * FROM boarding WHERE check_in_date = ?`;
        const [rows] = await db.query(sql, [Utils.formatDateSQL(checkIn)]);
        return rows;
    }
    static async getBoardingByPet(petId) {
        const sql = `SELECT * FROM boarding WHERE pet_id = ?`;
        const [rows] = await db.query(sql, [petId]);
        return rows;
    }
    static async getBoardings() {
        const sql = `SELECT * FROM boarding`;
        const [rows] = await db.query(sql);
        return rows;
    }


}
module.exports = BoardingRepository;