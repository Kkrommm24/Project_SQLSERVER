import db from '../models/index';
import CRUDService from '../services/CRUDService';

let adminLogin = (req, res) => {
  return res.render('loginForm.ejs');
}

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // Check email exist
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Missing inputs parameter!',
    });
  }

  let loginData = await CRUDService.handleLogin(email, password);
  if (loginData.errCode === 0) {
    let role = loginData.login.roleId;
    let userId;
    if (role === 'Admin') {
      userId = loginData.login.id;
      console.log('ADMIN ID: ', userId);

      // Lưu ID và roleId vào session
      req.session.adminId = userId;
      req.session.roleId = role;
      console.log(req.session);
      return res.redirect('/get-all');
    } 
    else {
      return res.status(200).json({
        errCode: loginData.errCode,
        message: loginData.errMessage,
      });
    }
  } else {
    return res.status(200).json({
      errCode: loginData.errCode,
      message: loginData.errMessage,
    });
  }
};

let adminLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    // Chuyển hướng về trang admin/login sau khi logout
    return res.redirect('/admin/login'); // Thêm điều hướng vào đây
  });
}

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
  let data_patient = await CRUDService.getAllPatients();
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

let getEditPatient = async (req, res) => {
  let id = req.query.id;
    if (id) {
      let patientData = await CRUDService.getPatientInfoById(id);
      return res.render('editPatient.ejs',{
        patient: patientData //x<-y
      });
    } else {
      return res.send('Patient not found');
    }
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
};

let putPatient = async (req, res) => {
  let data = req.body;
  let allPatients = await CRUDService.updatePatientData(data);
  let data_doctor = await CRUDService.getAllDoctors();
    console.log('---------------------');
    console.log(allPatients);
    // console.log(data_doctor);
    console.log('---------------------');
    return res.render('displayCRUD.ejs', {
        patients: allPatients,
        doctors: data_doctor,
    });
};

let getEditDoctor = async (req, res) => {
  let id = req.query.id;
    if (id) {
      let doctorData = await CRUDService.getDoctorInfoById(id);
      return res.render('editDoctor.ejs',{
        doctor: doctorData //x<-y
      });
    } else {
      return res.send('Doctor not found');
    }
};

let putDoctor = async (req, res) => {
  let data = req.body;
  let data_patient = await CRUDService.getAllPatients();
  let allDoctors = await CRUDService.updateDoctorData(data);
    console.log('---------------------');
    console.log(allDoctors);
    // console.log(data_doctor);
    console.log('---------------------');
    return res.render('displayCRUD.ejs', {
      patients: data_patient,
      doctors: allDoctors, 
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
  adminLogin: adminLogin,
  handleLogin: handleLogin,

  adminLogout: adminLogout,

  getCreatePatient: getCreatePatient,
  getCreateDoctor: getCreateDoctor,
  postCreatePatient: postCreatePatient,
  postCreateDoctor: postCreateDoctor,
  displayGetCRUD: displayGetCRUD,

  getEditPatient: getEditPatient,
  putPatient: putPatient,

  getEditDoctor: getEditDoctor,
  putDoctor: putDoctor,

  deleteCRUD: deleteCRUD,
  getAllCode: getAllCode,
  getSpecializationToHome: getSpecializationToHome,
};
