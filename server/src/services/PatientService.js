import { response } from 'express';
import db from '../models/index';
import bcrypt from 'bcryptjs';
var storage = require('node-persist');
const salt = bcrypt.genSaltSync(10);
let getAllPatients = (PatientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let patients = '';
      if (PatientId === 'ALL') {
        patients = await db.Patient.findAll({});
      }
      if (PatientId && PatientId !== 'ALL') {
        // Add code here
        patients = await db.Patient.findOne({
          where: { id: PatientId },
        });
      }
      resolve(patients);
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (loginEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let login = await db.Login.findOne({
        attributes: ['email', 'password', 'roleId'],
        where: { email: loginEmail },
        raw: true,
      });
      if (login) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
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
let createNewPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: 'Your email is already in used, Try another one',
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.Login.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          roleId: 'Patient',
        });
        await db.Patient.create({
          roleId: 'Patient',
          email: data.email,
          Patient_firstName: data.firstName,
          Patient_lastName: data.lastName,
          Patient_address: data.address,
          Patient_phoneNumber: data.phoneNumber,
          Patient_age: data.age,
          Patient_gender: data.gender,
        });
        resolve({
          errCode: 0,
          message: 'OK',
        });
      }
    } catch (e) {
      console.error('Error:', e);
      reject(e);
    }
  });
};

let getPatient = async (userId) => {
  try {
    // Kiểm tra trong bảng Patients
    const patient = await db.Patient.findOne({
      where: { id: userId },
      attributes: [
        'Patient_firstName',
        'Patient_lastName',
        'Patient_address',
        'Patient_phoneNumber',
        'Patient_age',
      ],
      include: [{ model: db.Allcode, attributes: ['valueEn', 'valueVi'] }],
    });

    if (!patient) {
      return null; // Bác sĩ không tồn tại
    }

    const patient_data = {
      patient: {
        Patient_firstName: patient.Patient_firstName,
        Patient_lastName: patient.Patient_lastName,
        Patient_address: patient.Patient_address,
        Patient_phoneNumber: patient.Patient_phoneNumber,
        Patient_age: patient.Patient_age,
      },
      gender: patient.Allcode
        ? {
            GenderEn: patient.Allcode.valueEn,
            GenderVi: patient.Allcode.valueVi,
          }
        : null,
    };
    return patient_data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Internal Server Error');
  }
};
let updatePatientData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      }
      let patient = await db.Patient.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (patient) {
        patient.Patient_firstName = data.firstName;
        patient.Patient_lastName = data.lastName;
        patient.Patient_address = data.address;
        patient.Patient_gender = data.gender;
        patient.Patient_phoneNumber = data.phoneNumber;
        patient.Patient_age = data.age;
        console.log(patient);
        await patient.save();
        resolve({
          errCode: 0,
          errMessage: `EDIT SUCCESS`,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `USER'S NOT FOUND`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updatePatientPassword = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      }
      let patient = await db.Patient.findOne({
        where: { id: userId },
        raw: false,
      });
      let login = await db.Login.findOne({
        where: { email: patient.email },
      });
      if (patient) {
        patient.Patient_firstName = data.firstName;
        patient.Patient_lastName = data.lastName;
        patient.Patient_address = data.address;
        patient.Patient_gender = data.gender;
        patient.Patient_phoneNumber = data.phoneNumber;
        patient.Patient_age = data.age;
        console.log(patient);
        await patient.save();
        resolve({
          errCode: 0,
          errMessage: `EDIT SUCCESS`,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `USER'S NOT FOUND`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (p_email) => {
  return new Promise(async (resolve, reject) => {
    let patient = await db.Patient.findOne({
      where: { email: p_email },
      raw: false,
    });
    if (!patient) {
      resolve({
        errCode: 2,
        errMessage: `USER NOT FOUND`,
      });
    }
    await db.Patient.destroy({
      where: { email: p_email },
      raw: false,
    });
    await db.Login.destroy({
      where: { email: p_email },
      raw: false,
    });
    resolve({
      errCode:0,
      errMessage: `DELETE SUCCESS`
    })
  })
}

let getPatientBooking = async (userId) => {
  try {
    // Kiểm tra trong bảng bookings
    const bookings = await db.Booking.findAll({
      where: { PatientId: userId },
      attributes: ['DoctorId', 'date', 'timeType', 'StatusId'],
      exclude: ['DoctorId', 'timeType', 'StatusId'],
    });

    let bookingData = [];
    for (let i = 0; i < bookings.length; i++) {
      let time = await db.Allcode.findOne({
        where: { id: bookings[i].timeType },
        attributes: ['valueEn', 'valueVi'],
      });
      let status = await db.Allcode.findOne({
        where: { id: bookings[i].StatusId },
        attributes: ['valueEn', 'valueVi'],
      });
      let doctor = await db.Doctor.findOne({
        where: { id: bookings[i].DoctorId },
        attributes: ['Doctor_firstName', 'Doctor_lastName'],
        include: [
          { model: db.Clinic, attributes: ['Clinic_name'] },
          { model: db.Specialization, attributes: ['Specialization_name'] },
        ],
      });

      if (!doctor) {
        // Bác sĩ không tồn tại, xử lý lỗi hoặc bỏ qua phần tử này
        continue;
      }

      let data = {
        bookings: {
          date: bookings[i].date,
        },
        time: time,
        status: status,
        doctor: {
          firstName: doctor.Doctor_firstName,
          lastName: doctor.Doctor_lastName,
        },
        clinic: {
          name: doctor.Clinic ? doctor.Clinic.Clinic_name : null,
        },
        specialization: {
          name: doctor.Specialization
            ? doctor.Specialization.Specialization_name
            : null,
        },
      };

      bookingData.push(data);
    }

    return bookingData;
  } catch (error) {
    console.error('Error from getPatientBooking:', error);
    throw new Error('Internal Server Error');
  }
};
module.exports = {
  getAllPatients: getAllPatients,
  createNewPatient: createNewPatient,
  getPatient: getPatient,
  updatePatientData: updatePatientData,
  updatePatientPassword: updatePatientPassword,
  deleteUser: deleteUser,
  getPatientBooking: getPatientBooking,
};
