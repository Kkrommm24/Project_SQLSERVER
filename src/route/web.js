import express from "express";
import homeController from "../controller/homeController";
import LoginController from "../controller/LoginController";
import PatientController from "../controller/PatientController";
let router = express.Router();

let initWebRoutes = (app) => {
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

    router.get('/patient-booking', PatientController.handleBooking);
    router.post('/booking-state', PatientController.postBooking);

    router.get('/allcode', homeController.getAllCode);

    // router.get('/api/reset-password', LoginController.handleLogin);
    return app.use("/", router)
}

module.exports = initWebRoutes;