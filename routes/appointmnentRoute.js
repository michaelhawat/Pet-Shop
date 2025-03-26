const express = require("express");
const AppointmentController = require('../contorllers/appointmentController');


const router = express.Router();

router.post('/',AppointmentController.createAppointment);
router.put('/:appId',AppointmentController.updateAppointment);
router.delete('/:appId',AppointmentController.deleteAppointment);
router.get('/',AppointmentController.getAppointments);
router.get('/pet/:petId',AppointmentController.getAppByPetId);
router.get('/user/:userId',AppointmentController.getAppByUserId);

module.exports = router;