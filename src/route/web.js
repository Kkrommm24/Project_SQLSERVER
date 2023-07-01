import express from "express";
import homeController from "../controller/homeController";
import LoginController from "../controller/LoginController";
import PatientController from "../controller/PatientController";
import DoctorController from "../controller/DoctorController";
var storage = require('node-persist');
let router = express.Router();

let initWebRoutes = (app) => {
    // function isLoggedIn(req,res,next)
    // {
    //     if (req.session.id)
    //         next();
    //     else res.redirect('/api/login');
    // }
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    router.get('/crud', homeController.getCRUD); //render ra form create
    router.post('/post-crud', homeController.postCRUD); //created
    router.get('/get-crud', homeController.displayGetCRUD); //in ra màn hình
    router.get('/edit-crud', homeController.getEditCRUD); //edit
    router.post('/put-crud', homeController.putCRUD); //edit xong thì sẽ chuyển 
    router.get('/delete-crud', homeController.deleteCRUD); //delete

    router.post('/api/login', LoginController.handleLogin); //login

    router.get('/api/get-all-patients', PatientController.handlegetAllPatients); //print all patients
    router.post('/api/patient-sign-up', PatientController.handleCreateNewPatient);
    router.put('/api/edit-patient', PatientController.handleEditPatient);
    router.delete('/api/delete-patient', PatientController.handleDeletePatient);

    router.get('/api/get-all-doctors', DoctorController.handlegetAllDoctors); //print all patients
    router.post('/api/doctor-sign-up', DoctorController.handleCreateNewDoctor);
    router.put('/api/edit-doctor', DoctorController.handleEditDoctor);
    router.delete('/api/delete-doctor', DoctorController.handleDeleteDoctor);

    router.get('/patient-booking', PatientController.handleBooking_1);
    router.post('/booking-state-clinic', PatientController.postBooking_clinic);

    router.get('/patient-booking-specialization', PatientController.handleBooking_2);
    router.post('/booking-state-specialization', PatientController.postBooking_specialization);

    router.get('/patient-booking-doctor', PatientController.handleBooking_3);
    router.post('/booking-state-complete', PatientController.postBooking_doctor);
    // router.get('/allcode', homeController.getAllCode);
    // router.post('/api/bulk-create-schedule', DoctorController.bulkCreateSchedule);

    // router.get('/api/reset-password', LoginController.handleLogin);
    return app.use("/", router)
}

module.exports = initWebRoutes;