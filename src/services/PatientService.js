import { response } from "express";
import db from "../models/index";
import bcrypt  from 'bcryptjs';
const salt = bcrypt.genSaltSync(10)
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
              where: {email: loginEmail}
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
            })
            await db.Patient.create({
                roleId: 'Patient',
                Patient_email: data.email,
                Patient_firstName: data.firstName,
                Patient_lastName: data.lastName,
                Patient_address: data.address,
                Patient_phoneNumber: data.phoneNumber,
                Patient_age: data.Age,
                Patient_gender: data.gender,   
            })
            resolve({
              errCode: 0,
              message: 'OK'
            })
          }
      }catch(e){
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

let deleteUser = (patientId) =>{
  return new Promise(async (resolve, reject) => {
    let patient = await db.Patient.findOne({
      where: {id: patientId},
      raw: false
    })
    if(!patient){
      resolve({
        errCode:2,
        errMessage: `USER NOT FOUND`
      })
    }
    await db.Patient.destroy({
      where: {id: patientId},
      raw: false
    });
    resolve({
      errCode:0,
      errMessage: `DELETE SUCCESS`
    })
  })
}

let createBooking = async (data) =>{
  return new Promise( async (resolve, reject) => {
      try{
          await db.Booking.create({
              StatusId: 'CONFIRMED',
              //DoctorId: data.DoctorId
          })
          
          resolve('Create succeed');
      }catch(e){
          reject(e);
      }
  })
}
module.exports = {
  getAllPatients: getAllPatients,
  createNewPatient: createNewPatient,
  updatePatientData: updatePatientData,
  deleteUser: deleteUser,
  createBooking: createBooking,
  
}