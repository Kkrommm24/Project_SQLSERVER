const bcrypt = require('bcryptjs');
const db = require('../models/index');

const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);

      await db.Login.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        roleId: 'Doctor',
      });
      await db.Doctor.create({
        roleId: 'Doctor',
        email: data.email,
        Doctor_firstName: data.firstName,
        Doctor_lastName: data.lastName,
        Doctor_address: data.address,
        Doctor_phoneNumber: data.phoneNumber,
        Doctor_age: data.Age,
        Doctor_gender: data.gender,
        ClinicId: 1,
        SpecializationId: 1,
      });
      resolve('Create succeed');
    } catch (e) {
      console.log('-----------------------------------');
      console.error('Error:', e);
      console.log('-----------------------------------');
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllPatient = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let patients = db.Patient.findAll({
        raw: true,
      });
      resolve(patients);
    } catch (e) {
      reject(e);
    }
  });
};

let getPatientInfoById = (PatientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let patient = await db.Patient.findOne({
        where: { id: PatientId },
        raw: true,
      });
      if (patient) {
        resolve(patient);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updatePatientData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let patient = await db.Patient.findOne({
        where: { id: data.id },
      });
      console.log(patient);
      if (patient) {
        patient.Patient_firstName = data.firstName;
        patient.Patient_lastName = data.lastName;
        patient.Patient_address = data.address;
        console.log(patient);
        await patient.save();
        let allPatients = await db.Patient.findAll();
        resolve(allPatients);
      } else {
        resolve();
      }
    } catch (e) {
      console.log(e);
    }
  });
};
let deletePatientById = (PatientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let patient = await db.Patient.findOne({
        where: { id: PatientId },
      });
      if (patient) {
        patient.destroy({ truncate: true, restartIdentity: true });
      } else {
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeinput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeinput) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeinput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllPatient: getAllPatient,
  getPatientInfoById: getPatientInfoById,
  updatePatientData: updatePatientData,
  deletePatientById: deletePatientById,
  getAllCodeService: getAllCodeService,
};
