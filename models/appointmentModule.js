const Utils = require('../utils/Utils');
class Appointment {
    constructor(appId,userId,petId,appDate,services){
    this.appId = appId;
    this.userId=userId;
    this.petId = petId;
    this.appDate=Utils.formatDateSQL(appDate);
    this.services = services;
}
static fromRow(row){
    return new Appointment(
        row.appointment_id,
        row.user_id,
        row.pet_id,
        row.app_date,
        row.services
    )   
}
}
module.exports=Appointment;