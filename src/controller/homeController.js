import db from '../models/index';
import CRUDService from '../services/CRUDService';
let getHomePage = async (req, res) => {
    try{
        let data = await db.Patient.findAll();
        
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    }catch(e){
        console.log(e)
    }
    
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
 }
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
 }
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('Created');
}
 let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllPatient();
    console.log('---------------------')
    console.log(data)
    console.log('---------------------')
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let PatientId = req.query.id;
    console.log(PatientId);
    if(PatientId){
        let patientData = await CRUDService.getPatientInfoById(PatientId);
        return res.render('editCRUD.ejs',{
            patient: patientData //x<-y
        });
    }
    else{
    return res.send('Patient not found!');
    }
}
 
let putCRUD = async (req, res) =>{
    let data = req.body;
    let allPatients = await CRUDService.updatePatientData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allPatients
    })
}
let deleteCRUD = async (req, res) =>{
    let id = req.query.id;
    if(id){
        await CRUDService.deletePatientById(id);
        return res.send('Delete succeed')
    }else{
        return res.send('User not found')
    }
    
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}