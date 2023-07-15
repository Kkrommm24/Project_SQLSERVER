import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getCreatePatient = (req, res) => {
  return res.render('createPatient.ejs');
}

let getCreateDoctor = (req, res) => {
  return res.render('createDoctor.ejs');
}
let postCreatePatient = async (req, res) => {
    let message = await CRUDService.createNewPatient(req.body);
    console.log(message)
    return res.send(message.message);
}

let postCreateDoctor = async (req, res) => {
  let message = await CRUDService.createNewDoctor(req.body);
  console.log(message)
  return res.send(message.message);
}

let displayGetCRUD = async (req, res) => {
  let data_patient = await CRUDService.getAllPatient();
  let data_doctor = await CRUDService.getAllDoctors();
  console.log('---------------------');
  console.log(data_patient);
  console.log(data_doctor);
  console.log('---------------------');
  return res.render('displayCRUD.ejs', {
    patients: data_patient,
    doctors: data_doctor,
  });
};

let getEditCRUD = async (req, res) => {
  let id = req.body.id;
  let role = req.body.roleId
  if(role === 'Patient'){
    if (id) {
      // let patientData = await CRUDService.getPatientInfoById(id);
      return res.render('editCRUD.ejs',{
        patient: patientData //x<-y
      });
      await CRUDService.updatePatientData(id);
      return res.send('Edit success');
    } else {
      return res.send('Patient not found');
    }
  }
  // if(role === 'Doctor'){
  //   if (id) {
  //     let doctorData = await CRUDService.getDoctorInfoById(id);
  //     return res.render('editCRUD.ejs',{
  //       doctor: doctorData //x<-y
  //     });
  //     await CRUDService.updateDoctorData(id);
  //     return res.send('Edit success');
  //   } else {
  //     return res.send('Doctor not found');
  //   }
  // }
};

let putCRUD = async (req, res) => {
  let data_patient = await CRUDService.getAllPatient();
  let data_doctor = await CRUDService.getAllDoctors();
  console.log('---------------------');
  console.log(data_patient);
  console.log(data_doctor);
  console.log('---------------------');
  return res.render('displayCRUD.ejs', {
    patients: data_patient,
    doctors: data_doctor,
  });
};
let deleteCRUD = async (req, res) => {
  let id = req.body.id;
  let role = req.body.roleId
  if(role === 'Patient'){
    if (id) {
      await CRUDService.deletePatientById(id);
      return res.send('Delete success');
    } else {
      return res.send('Patient not found');
    }
  }
  if(role === 'Doctor'){
    if (id) {
      await CRUDService.deleteDoctorById(id);
      return res.send('Delete success');
    } else {
      return res.send('Doctor not found');
    }
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
  getCreatePatient: getCreatePatient,
  getCreateDoctor: getCreateDoctor,
  postCreatePatient: postCreatePatient,
  postCreateDoctor: postCreateDoctor,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
  getAllCode: getAllCode,
  getSpecializationToHome: getSpecializationToHome,
};
