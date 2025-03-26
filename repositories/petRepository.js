const Pet = require('../models/petModel');
const db = require('../config/db');

class PetRepository{
    static async createPet(pet) {
        try {
            const sql = `INSERT INTO pets 
            (user_id, pet_name, pet_type, vaccinated, pet_age, pet_gender)
            VALUES (?,?,?,?,?,?)`;
            if(!await this.idExist(pet.userId))
                throw new Error("This user does not exist");
             if(!await this.Exists(pet)){
            const { affectedRows } = await db.query(sql, [pet.userId, pet.petName, pet.petType, pet.vaccinated, pet.petAge, pet.petGender]);
            return affectedRows;
             }
                else
                throw new Error("This pet already exists");
        } catch (error) {
            console.error('Error creating pet:', error);
            throw error;
        }
    }
    static async idExist(id) {
        try {
            let sql = `SELECT * FROM pets WHERE user_id = ?`
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
    static async getPetById(petId) {
        try {
            
            const sql = `SELECT * FROM pets WHERE pet_id = ?`;
            
            const rows = await db.query(sql, [petId]);
            if(!await this.PetidExist(petId))
                throw new Error("This Pet does not exist");
            return Pet.fromRow(rows[0]);
        } catch (error) {
            console.error('Error getting pet by ID:', error);
            throw error;
        }
    }

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
            if(!await this.PetidExist(pet.petId))
                throw new Error("This Pet does not exist");
            if(!await this.idExist(pet.userId))
                throw new Error("This user does not exist");
            if(!await this.Exists(pet)){
            const { affectedRows } = await db.query(sql, [pet.userId, pet.petName, pet.petType, pet.vaccinated, pet.petAge, pet.petGender, pet.petId]);
            return affectedRows;
            }
            else
            throw new Error("This pet already exists");
        } catch (error) {
            console.error('Error updating pet:', error);
            throw error;
        }
    }

    static async deletePet(petId) {
        try {
            if(!await this.PetidExist(petId))
                throw new Error("This Pet does not exist");
            return await db.query('DELETE FROM pets WHERE pet_id = ?', [petId]);
        } catch (error) {
            console.error('Error deleting pet:', error);
            throw error;
        }
    }

    static async getPetByUserId(userId) {
        try {
            if(!await this.idExist(userId))
                throw new Error("This user does not exist");
            const sql = `SELECT * FROM pets WHERE user_id = ?`;
            const rows = await db.query(sql, [userId]);
            return rows.map(Pet.fromRow);
        } catch (error) {
            console.error('Error getting pet by user ID:', error);
            throw error;
        }
    }

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