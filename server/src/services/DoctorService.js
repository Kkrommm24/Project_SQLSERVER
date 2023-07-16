import { response } from 'express';
import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let getAllDoctors = (DoctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Doctors = '';
      if (DoctorId === 'ALL') {
        Doctors = await db.Doctor.findAll({});
      }
      if (DoctorId && DoctorId !== 'ALL') {
        // Add code here
        Doctors = await db.Doctor.findOne({
          where: { id: DoctorId },
        });
      }
      resolve(Doctors);
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

let createNewDoctor = (data) => {
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
          roleId: 'Doctor',
        });
        await db.Doctor.create({
          roleId: 'Doctor',
          ClinicId: data.clinicId,
          SpecializationId: data.specializationId,
          email: data.email,
          Doctor_firstName: data.firstName,
          Doctor_lastName: data.lastName,
          Doctor_address: data.address,
          Doctor_phoneNumber: data.phoneNumber,
          Doctor_age: data.Age,
          Doctor_gender: data.gender,
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

let getDoctor = async (userId) => {
  try {
    // Kiểm tra trong bảng doctors
    const doctor = await db.Doctor.findOne({
      where: { id: userId },
      attributes: [
        'Doctor_firstName',
        'Doctor_lastName',
        'Doctor_address',
        'Doctor_phoneNumber',
        'Doctor_age',
      ],
      include: [
        { model: db.Clinic, attributes: ['Clinic_name'] },
        { model: db.Specialization, attributes: ['Specialization_name'] },
        { model: db.Allcode, attributes: ['valueEn', 'valueVi'] },
      ],
    });

    if (!doctor) {
      return null; // Bác sĩ không tồn tại
    }
    return doctor;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Internal Server Error');
  }
};

let updateDoctorData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      }
      let doctor = await db.Doctor.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (doctor) {
        doctor.Doctor_firstName = data.firstName;
        doctor.Doctor_lastName = data.lastName;
        doctor.Doctor_address = data.address;
        doctor.Doctor_gender = data.gender;
        doctor.Doctor_phoneNumber = data.phoneNumber;
        doctor.Doctor_age = data.age;
        console.log(doctor);
        await doctor.save();
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

let deleteUser = (DoctorEmail) => {
  return new Promise(async (resolve, reject) => {
    let doctor = await db.Doctor.findOne({
      where: { email: DoctorEmail },
      raw: false,
    });
    if (!doctor) {
      resolve({
        errCode: 2,
        errMessage: `USER NOT FOUND`,
      });
    }
    await db.Doctor.destroy({
      where: { email: DoctorEmail },
      raw: false,
    });
    await db.Login.destroy({
      where: { email: DoctorEmail },
      raw: false,
    });
    resolve({
      errCode: 0,
      errMessage: `DELETE SUCCESS`,
    });
  });
};

let getDoctorBooking = async (userId) => {
  try {
    // Kiểm tra trong bảng bookings
    const bookings = await db.Booking.findAll({
      where: { DoctorId: userId },
      attributes: ['PatientId', 'date', 'timeType', 'StatusId'],
      exclude: ['PatientId', 'timeType', 'StatusId'],
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
      let patient = await db.Patient.findOne({
        where: { id: bookings[i].PatientId },
        attributes: ['Patient_firstName', 'Patient_lastName'],
      });

      if (!patient) {
        // Bác sĩ không tồn tại, xử lý lỗi hoặc bỏ qua phần tử này
        continue;
      }

      let data = {
        bookings: {
          date: bookings[i].date,
        },
        time: time,
        status: status,
        patient: {
          firstName: patient.Patient_firstName,
          lastName: patient.Patient_lastName,
        },
      };
      bookingData.push(data);
    }
    return bookingData;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  getAllDoctors: getAllDoctors,
  createNewDoctor: createNewDoctor,
  getDoctor: getDoctor,
  updateDoctorData: updateDoctorData,
  deleteUser: deleteUser,
  getDoctorBooking: getDoctorBooking,
};
