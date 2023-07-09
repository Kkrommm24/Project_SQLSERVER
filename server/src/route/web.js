import express from 'express';
import homeController from '../controller/homeController';
import LoginController from '../controller/LoginController';
import PatientController from '../controller/PatientController';
import DoctorController from '../controller/DoctorController';
import BookingController from '../controller/BookingController';
var storage = require('node-persist');
let router = express.Router();

let initWebRoutes = (app) => {
  app.use(express.json());
  // function isLoggedIn(req,res,next)
  // {
  //     if (req.session.id)
  //         next();
  //     else res.redirect('/api/login');
  // }
  router.get('/', homeController.getHomePage);
  router.get('/about', homeController.getAboutPage);
  //***************ADMIN****************
  router.get('/crud', homeController.getCRUD); //render ra form create patient
  router.post('/post-crud', homeController.postCRUD); //created
  router.get('/get-crud', homeController.displayGetCRUD); //in ra màn hình patient
  router.get('/edit-crud', homeController.getEditCRUD); //edit
  router.post('/put-crud', homeController.putCRUD); //edit xong thì sẽ chuyển
  router.get('/delete-crud', homeController.deleteCRUD); //delete

  router.post('/api/login', LoginController.handleLogin); //login
  //***************PATIENT***************
  router.get('/api/get-all-patients', PatientController.handlegetAllPatients); //print all patients

  router.get('/api/patient/info', PatientController.handlegetOnePatient); //print a ptient
  router.post('/api/patient-sign-up', PatientController.handleCreateNewPatient); // patient signup
  router.put('/api/edit-patient', PatientController.handleEditPatient); // edit a patient
  router.put(
    '/api/change-patient-password',
    PatientController.handleChangePassword
  ); // change patient password
  router.delete('/api/delete-patient', PatientController.handleDeletePatient); // delete a patient (might be delete if it's not useful)
  //***************DOCTOR***************
  router.get('/api/get-all-doctors', DoctorController.handlegetAllDoctors); //print all doctors

  router.get('/api/doctor/info', DoctorController.handlegetOneDoctor); //print a ptient
  router.post('/api/doctor-sign-up', DoctorController.handleCreateNewDoctor); // this appears to manual create a new doctor in backend
  router.put('/api/edit-doctor', DoctorController.handleEditDoctor); // edit a doctor
  router.put(
    '/api/change-doctor-password',
    DoctorController.handleChangePassword
  ); // change patient password
  router.delete('/api/delete-doctor', DoctorController.handleDeleteDoctor); // delete a doctor (might be delete if it's not useful)
  //***************BOOKING***************
  router.get('/api/patient-booking', PatientController.handleBooking_1); // render frontend select clinic
  router.post(
    '/api/booking-state-clinic',
    PatientController.postBooking_clinic
  ); // save clinicId and redirect to /api/patient-booking-specialization

  router.get(
    '/api/patient-booking-specialization',
    PatientController.handleBooking_2
  ); // render frontend select specialization
  router.post(
    '/api/booking-state-specialization',
    PatientController.postBooking_specialization
  ); // save specializationId and redirect to /api/patient-booking-doctor

  router.get('/api/patient-booking-doctor', PatientController.handleBooking_3); // render frontend select doctor, date and time
  router.post(
    '/api/booking-state-complete',
    PatientController.postBooking_doctor
  ); // result of booking
  // router.get('/allcode', homeController.getAllCode);
  // router.post('/api/bulk-create-schedule', DoctorController.bulkCreateSchedule);

  // router.get('/api/reset-password', LoginController.handleLogin);
  return app.use('/', router);
};

module.exports = initWebRoutes;
