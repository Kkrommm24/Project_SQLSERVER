import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    router.get('/crud', homeController.getCRUD); //render ra form create
    router.post('/post-crud', homeController.postCRUD); //create
    router.get('/get-crud', homeController.displayGetCRUD); //in ra màn hình
    router.get('/edit-crud', homeController.getEditCRUD); //edit
    router.post('/put-crud', homeController.putCRUD); //edit xong thì sẽ chuyển 
    router.get('/delete-crud', homeController.deleteCRUD); //delete

    router.post('/api/login', userController.handleLogin);

    return app.use("/", router)
}

module.exports = initWebRoutes;