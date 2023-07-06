import { response } from "express";
import db from "../models/index";
import bcrypt  from 'bcryptjs';
var storage = require('node-persist');
let initStorage = async () => {
  await storage.init();
}
initStorage();
const salt = bcrypt.genSaltSync(10);
let clinicId = '';
let specializationId = '';
let getAllPatients = (PatientId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let patients = '';
        if (PatientId === 'ALL') {
          patients = await db.Patient.findAll({
          });
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
let checkUserEmail = (loginEmail) =>{
  return new Promise(async (resolve, reject) => {
      try{
          let login = await db.Login.findOne({
            attributes: ['email', 'password', 'roleId'],
              where: {email: loginEmail},
              raw: true,
          })
          if(login){
              resolve(true)
          }else{
              resolve(false)
          }
      }catch(e){
          reject(e);
      }
  })
}
let hashUserPassword = (password) => {
  return new Promise( async (resolve, reject) =>{
      try{
          let hashPassword = await bcrypt.hashSync(password, salt);
          resolve(hashPassword);
      }catch(e){
          reject(e);
      }     
  })
    
}
  let createNewPatient = (data) =>{
    return new Promise(async (resolve, reject) => {
      try{
        let check =await checkUserEmail(data.email);
        if(check===true){
          resolve({
            errCode: 1,
            message: 'Your email is already in used, Try another one'
          })
        }else{
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.Login.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                roleId: 'Patient'  
            })
            await db.Patient.create({
                roleId: 'Patient',
                email: data.email,
                Patient_firstName: data.firstName,
                Patient_lastName: data.lastName,
                Patient_address: data.address,
                Patient_phoneNumber: data.phoneNumber,
                Patient_age: data.age,
                Patient_gender: data.gender,   
            })
            resolve({
              errCode: 0,
              message: 'OK'
            })
          }
      }catch(e){
        console.error('Error:', e);
        reject(e)
      }
    }
  )}
let updatePatientData =(data) =>{
  return new Promise(async (resolve, reject) => {
    try{
      if(!data.id){
        resolve({
          errCode:1,
          errMessage: 'Missing required parameters'
        })
      }
    let patient = await  db.Patient.findOne({
        where: {id: data.id},
        raw: false
    })
    if(patient){
      patient.Patient_firstName = data.firstName;
      patient.Patient_lastName = data.lastName;
      patient.Patient_address = data.address;
      patient.Patient_gender = data.gender;
      patient.Patient_phoneNumber = data.phoneNumber;
      patient.Patient_age = data.age;
      console.log(patient);
      await patient.save();
        resolve({
          errCode:0,
          errMessage: `EDIT SUCCESS`
        })
    }else{
        resolve({
          errCode:2,
          errMessage: `USER'S NOT FOUND`
        });
    }
    }catch(e){
      reject(e);
    }
  })
}
let updatePatientPassword = (userId) =>{
  return new Promise(async (resolve, reject) => {
    try{
      if(!userId){
        resolve({
          errCode:1,
          errMessage: 'Missing required parameters'
        })
      }
    let patient = await  db.Patient.findOne({
        where: {id: userId},
        raw: false
    })
    let login = await db.Login.findOne({
      where: { email: patient.email },
    });
    if(patient){
      patient.Patient_firstName = data.firstName;
      patient.Patient_lastName = data.lastName;
      patient.Patient_address = data.address;
      patient.Patient_gender = data.gender;
      patient.Patient_phoneNumber = data.phoneNumber;
      patient.Patient_age = data.age;
      console.log(patient);
      await patient.save();
        resolve({
          errCode:0,
          errMessage: `EDIT SUCCESS`
        })
    }else{
        resolve({
          errCode:2,
          errMessage: `USER'S NOT FOUND`
        });
    }
    }catch(e){
      reject(e);
    }
  })
}

let deleteUser = (p_email) =>{
  return new Promise(async (resolve, reject) => {
    let patient = await db.Patient.findOne({
      where: {email: p_email},
      raw: false
    })
    if(!patient){
      resolve({
        errCode:2,
        errMessage: `USER NOT FOUND`
      })
    }
    await db.Patient.destroy({
      where: {email: p_email},
      raw: false
    });
    await db.Login.destroy({
      where: {email: p_email},
      raw: false
    });
    resolve({
      errCode:0,
      errMessage: `DELETE SUCCESS`
    })
  })
}

let setClinicValue = async (value) => {
  clinicId = value;
};

let createBooking_clinic = async (data) =>{
  return new Promise( async (resolve, reject) => {
      try{
          await setClinicValue(data.clinicId)
          resolve('Next stage');
      }catch(e){
        console.error('Error:', e);
      }
  })
}

let setSpecializationValue = async (value) => {
  specializationId = value;
};
let createBooking_specialization = async (data) =>{
  return new Promise( async (resolve, reject) => {
      try{
          await setSpecializationValue(data.specializationId)
          resolve('Next stage');
      }catch(e){
        console.error('Error:', e);
      }
  })
}

let getClinicValue = async () => {
  return clinicId;
};

let getSpecializationValue = async () => {
  return specializationId;
};

let checkBooking = (doctorData, dateData, timeTypeData) =>{
  return new Promise(async (resolve, reject) => {
      try{
          let booking = await db.Booking.findOne({
            attributes: ['DoctorId', 'date', 'timeType'],
              where: {
                DoctorId: doctorData,
                date: dateData,
                timeType: timeTypeData
              },
              raw: true,
          })
          if(booking){
              resolve(true)
          }else{
              resolve(false)
          }
      }catch(e){
          reject(e);
      }
  })
}

let createBooking_doctor = async (data) =>{
  return new Promise( async (resolve, reject) => {
    try{
      let check =await checkBooking(data.doctorId, data.date, data.time);
      if(check===true){
        resolve({
          errCode: 1,
          message: 'Your schedule is already booked, try another schedule'
        })
      }else{
        await db.Booking.create({
          StatusId: 3,
          DoctorId: data.doctorId,
          PatientId: data.PatientId,
          date: data.date,
          timeType: data.time,  
      })
      }
      resolve({
        errCode: 0,
        message: 'OK'
      })    
    }catch(e){
      console.error('Error_cre_doc:', e);
    }
  })
}
module.exports = {
  getAllPatients: getAllPatients,
  createNewPatient: createNewPatient,
  updatePatientData: updatePatientData,
  updatePatientPassword: updatePatientPassword,
  deleteUser: deleteUser,
  createBooking_clinic: createBooking_clinic,
  createBooking_specialization: createBooking_specialization,
  setClinicValue: setClinicValue,
  setSpecializationValue: setSpecializationValue,
  getClinicValue: getClinicValue,
  getSpecializationValue: getSpecializationValue,
  createBooking_doctor: createBooking_doctor,
  
}