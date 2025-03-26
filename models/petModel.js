class Pet{
    constructor(petId,userId,petName,petType,vaccinated,petAge,petGender){
        this.petId = petId;
        this.userId = userId;
        this.petName = petName;
        this.petType = petType;
        this.vaccinated = vaccinated;
        this.petAge = petAge;
        this.petGender = petGender;
    }
static fromRow(row){
    return new Pet(
        row.pet_id,
        row.user_id,
        row.pet_name,
        row.pet_type,
        row.vaccinated,
        row.pet_age,
        row.pet_gender
    )
}
}
module.exports = Pet;