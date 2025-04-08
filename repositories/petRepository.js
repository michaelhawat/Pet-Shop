const Pet = require('../models/petModel');
const db = require('../config/db');

class PetRepository{
    /**
 * Create a new pet in the database
 * @param {object} pet - Pet object containing user ID, name, type, vaccination status, age, and gender
 * @returns {number} affectedRows
 * @throws {Error} if there is an error creating the pet
 */
    static async createPet(pet) {
        try {
            const sql = `INSERT INTO pets 
            (user_id, pet_name, pet_type, vaccinated, pet_age, pet_gender)
            VALUES (?,?,?,?,?,?)`;
            
            const { affectedRows } = await db.query(sql, [pet.userId, pet.petName, pet.petType, pet.vaccinated, pet.petAge, pet.petGender]);
            return affectedRows;
             
               
        } catch (error) {
            console.error('Error creating pet:', error);
            throw error;
        }
    }
    /**
 * Check if a user ID exists in the pets table
 * @param {number} id - User ID
 * @returns {boolean} true if user ID exists, false otherwise
 * @throws {Error} if there is an error checking the user ID
 */
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
    /**
 * Check if a pet ID exists in the database
 * @param {number} petId - Pet ID
 * @returns {boolean} true if pet ID exists, false otherwise
 * @throws {Error} if there is an error checking the pet ID
 */
    static async PetidExist(petId) {
        try {
            let sql = `SELECT * FROM pets WHERE pet_id = ?`;
            const [rows] = await db.query(sql, [petId]);
             
            if(rows ){
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking if ID exists:', error);
            throw error;
        }
    }
    /**
 * Check if a pet with the same details already exists in the database
 * @param {object} pet - Pet object containing user ID, name, type, vaccination status, age, and gender
 * @returns {boolean} true if pet exists, false otherwise
 * @throws {Error} if there is an error checking for pet existence
 */
    static async Exists(pet) {
        try {
            const sql = `SELECT * FROM pets WHERE user_id = ? AND pet_name = ? AND pet_type = ? AND vaccinated = ? AND pet_age = ? AND pet_gender = ?`;
            const [rows] = await db.query(sql, [pet.userId, pet.petName, pet.petType, pet.vaccinated, pet.petAge, pet.petGender]);
           console.log(rows);
            if(rows)
            return true;
        else 
        return false;
}catch (error) {    
    console.error('Error creating pet:', error);
    throw error;
}
}   
 /**
 * Retrieve a pet by its ID
 * @param {number} petId - Pet ID
 * @returns {object} Pet data
 * @throws {Error} if there is an error retrieving the pet
 */
static async getPetById(petId) {
        try {
            
            const sql = `SELECT * FROM pets WHERE pet_id = ?`;
            
            const rows = await db.query(sql, [petId]);
            
            return Pet.fromRow(rows[0]);
        } catch (error) {
            console.error('Error getting pet by ID:', error);
            throw error;
        }
    }

/**
 * Update an existing pet in the database
 * @param {object} pet - Pet object containing user ID, name, type, vaccination status, age, gender, and pet ID
 * @returns {number} affectedRows
 * @throws {Error} if there is an error updating the pet
 */
    static async updatePet(pet) {
        try {
            const sql = `UPDATE pets SET 
            user_id = ?,
            pet_name = ?,
            pet_type = ?,
            vaccinated = ?,
            pet_age = ?,
            pet_gender = ?
            WHERE pet_id = ?`;
           
            const { affectedRows } = await db.query(sql, [pet.userId, pet.petName, pet.petType, pet.vaccinated, pet.petAge, pet.petGender, pet.petId]);
            return affectedRows;
           
        } catch (error) {
            console.error('Error updating pet:', error);
            throw error;
        }
    }

/**
 * Delete a pet from the database
 * @param {number} petId - Pet ID
 * @returns {number} affectedRows
 * @throws {Error} if there is an error deleting the pet
 */
    static async deletePet(petId) {
        try {
            
            return await db.query('DELETE FROM pets WHERE pet_id = ?', [petId]);
        } catch (error) {
            console.error('Error deleting pet:', error);
            throw error;
        }
    }
/**
 * Retrieve all pets associated with a specific user
 * @param {number} userId - User ID
 * @returns {Array} List of pets belonging to the user
 * @throws {Error} if there is an error retrieving pets
 */
    static async getPetByUserId(userId) {
        try {
           
            const sql = `SELECT * FROM pets WHERE user_id = ?`;
            const rows = await db.query(sql, [userId]);
            return rows.map(Pet.fromRow);
        } catch (error) {
            console.error('Error getting pet by user ID:', error);
            throw error;
        }
    }
/**
   * Retrieve all pets from the database
   * @returns {Array} List of all pets
   * @throws {Error} if there is an error retrieving pets
   */
    static async getAllPets() {
        try {
            const sql = `SELECT * FROM pets`;
            const rows = await db.query(sql);
            return rows.map(Pet.fromRow);
        } catch (error) {
            console.error('Error getting all pets:', error);
            throw error;
        }
    }
}
module.exports = PetRepository;