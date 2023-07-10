import db from '../models/index';
import CRUDService from '../services/CRUDService';
let getHomePage = async (req, res) => {
  try {
    let data = await db.Patient.findAll();

    return res.render('homepage.ejs', {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};
let getAboutPage = (req, res) => {
  return res.render('test/about.ejs');
};
let getCRUD = (req, res) => {
  return res.render('crud.ejs');
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send('Created');
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllPatient();
  console.log('---------------------');
  console.log(data);
  console.log('---------------------');
  return res.render('displayCRUD.ejs', {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let PatientId = req.query.id;
  console.log(PatientId);
  if (PatientId) {
    let patientData = await CRUDService.getPatientInfoById(PatientId);
    return res.render('editCRUD.ejs', {
      patient: patientData, //x<-y
    });
  } else {
    return res.send('Patient not found!');
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allPatients = await CRUDService.updatePatientData(data);
  return res.render('displayCRUD.ejs', {
    dataTable: allPatients,
  });
};
let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deletePatientById(id);
    return res.send('Delete succeed');
  } else {
    return res.send('User not found');
  }
};

let getAllCode = async (req, res) => {
  try {
    let data = await CRUDService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log('Get all code error: ', e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};

let getSpecializationToHome = async (req, res) => {
  try {
    let data = await db.Specialization.findAll({ raw: true });
    res.send({ sData: data });
  } catch (e) {
    console.error(e);
    re;
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
  getAllCode: getAllCode,
  getSpecializationToHome: getSpecializationToHome,
};
