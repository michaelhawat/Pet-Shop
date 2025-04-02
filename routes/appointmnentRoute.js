const express = require("express");
const AppointmentController = require('../controllers/appointmentController');
const {appointmentValidator,appointmentIdValidator,userIdValidator,petIdValidator} = require('../validators/appointment.dto');

const router = express.Router();

router.post('/',appointmentValidator,AppointmentController.createAppointment);
router.put('/:appId',appointmentIdValidator,appointmentValidator,AppointmentController.updateAppointment);
router.delete('/:appId',appointmentIdValidator,AppointmentController.deleteAppointment);
router.get('/',AppointmentController.getAppointments);
router.get('/date',AppointmentController.getAppByDate);
router.get('/pet/:petId',petIdValidator,AppointmentController.getAppByPetId);
router.get('/user/:userId',userIdValidator,AppointmentController.getAppByUserId);

module.exports = router;