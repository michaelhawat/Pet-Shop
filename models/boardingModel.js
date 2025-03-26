const Utils = require('../utils/Utils');

class Boarding{
    constructor(boardingId,petId,checkIn,checkOut){
        this.boardingId = boardingId;
        this.petId = petId;
        this.checkIn = Utils.formatDateSQL(checkIn);
        this.checkOut = Utils.formatDateSQL(checkOut);
    }
    static fromRow(row){
        return new Boarding(
            row.boarding_id,
            row.pet_id,
            row.check_in_date,
            row.check_out_date
        )
    }
}
module.exports = Boarding;