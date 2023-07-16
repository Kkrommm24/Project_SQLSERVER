const bcrypt = require('bcryptjs');
const db = require('../models/index');
const salt = bcrypt.genSaltSync(10);

//Login Admin

let handleLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let loginData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user existed

        let login = await db.Login.findOne({
          attributes: ['id', 'email', 'password', 'roleId'],
          where: { email: email },
          raw: true,
        });
        if (login) {
          //compare password
          let check = await bcrypt.compareSync(password, login.password);

          if (check) {
            if (login.roleId === 'Admin') {
              loginData.errCode = 0;
              loginData.errMessage = `Ok You're Admin`;
              delete login.password;
              loginData.login = login;
            } else {
              loginData.errCode = 4;
              loginData.errMessage = `You're not Admin, please go out`;
              delete login.password;
              loginData.login = login;
            }
          } else {
            loginData.errCode = 3;
            loginData.errMessage = 'Wrong Password';
          }
        } else {
          loginData.errCode = 2;
          loginData.errMessage = `USER NOT FOUND`;
        }
      } else {
        loginData.errCode = 1;
        loginData.errMessage = `Email doesn't exist`;
      }
      resolve(loginData);
    } catch (e) {
      console.error('Error:', e);
      reject(e);
    }
  });
};

//Tạo user
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
          Doctor_age: data.age,
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
    return new Promise( async (resolve, reject) =>{
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }     
    })
    
}

// Lấy danh sách user
let getAllPatients = () => {
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

let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let Doctors = await db.Doctor.findAll({
          raw: true,
      });      
      resolve(Doctors);
    } catch (e) {
      reject(e);
    }
  });
};

//Lấy 1 user ra
let getPatientInfoById = (PatientId) => {
  return new Promise( async (resolve, reject) =>{
      try{
          let patient = await db.Patient.findOne({
              where: {id: PatientId},
              raw: true,
          });
          if(patient){
              resolve(patient);
          }else{
              resolve({})
          }
          
      }catch(e){
          reject(e);
      }     
  })
}

let getDoctorInfoById = (DoctorId) => {
  return new Promise( async (resolve, reject) =>{
      try{
          let doctor = await db.Doctor.findOne({
              where: {id: DoctorId},
              raw: true,
          });
          if(doctor){
              resolve(doctor);
          }else{
              resolve({})
          }
          
      }catch(e){
          reject(e);
      }     
  })
}
//Edit user in4
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
        patient.Patient_phoneNumber = data.phoneNumber,
        patient.Patient_age = data.age,
        patient.Patient_gender = data.gender,
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

let updateDoctorData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.Doctor.findOne({
        where: { id: data.id },
      });
      console.log(doctor);
      if (doctor) {
        doctor.Doctor_firstName = data.firstName;
        doctor.Doctor_lastName = data.lastName;
        doctor.Doctor_address = data.address;
        doctor.Doctor_phoneNumber = data.phoneNumber,
        doctor.Doctor_age = data.age,
        doctor.Doctor_gender = data.gender,
        doctor.ClinicId = data.clinicId,
        doctor.SpecializationId = data.specializationId
        console.log(doctor);
        await doctor.save();
        let allDoctors = await db.Doctor.findAll();
        resolve(allDoctors);
      } else {
        resolve();
      }
    } catch (e) {
      console.log(e);
    }
  });
};

//Delete user
let deletePatientById = (PatientId) => {
  return new Promise(async (resolve, reject) => {
    let transaction;
    try {
      // Bắt đầu một giao dịch (transaction) để đảm bảo tính toàn vẹn của dữ liệu khi xóa
      transaction = await db.sequelize.transaction();
      
      // Xóa các bản ghi trong bảng History liên quan đến bệnh nhân
      await db.History.destroy({
        where: { PatientId: PatientId },
        transaction,
      });

      // Xóa các bản ghi trong bảng Booking liên quan đến bệnh nhân
      await db.Booking.destroy({
        where: { PatientId: PatientId },
        transaction,
      });

      // Tìm thông tin bệnh nhân để lấy trường email
      let patient = await db.Patient.findOne({
        where: { id: PatientId },
        transaction,
      });
      
      await db.Patient.destroy({
        where: { id: PatientId },
        transaction,
      });
      if (patient) {
        // Xóa email của bệnh nhân trong bảng Login
        await db.Login.destroy({
          where: { email: patient.email },
          transaction,
        });

        // Xóa bệnh nhân trong bảng Patient
        await patient.destroy({ transaction });
      } else {
        // Nếu không tìm thấy bệnh nhân, hủy giao dịch và trả về lỗi
        await transaction.rollback();
        reject(new Error("Patient not found"));
      }

      // Xác nhận giao dịch nếu không có lỗi xảy ra
      await transaction.commit();

      // Trả về kết quả khi xóa thành công
      resolve();
    } catch (e) {
      // Nếu có lỗi xảy ra, hủy giao dịch và trả về lỗi
      if (transaction) await transaction.rollback();
      reject(e);
    }
  });
};

let deleteDoctorById = (DoctorId) => {
  return new Promise(async (resolve, reject) => {
    let transaction;
    try {
      // Bắt đầu một giao dịch (transaction) để đảm bảo tính toàn vẹn của dữ liệu khi xóa
      transaction = await db.sequelize.transaction();
      
      // Xóa các bản ghi trong bảng History liên quan đến bác sĩ
      await db.History.destroy({
        where: { DoctorId: DoctorId },
        transaction,
      });

      // Xóa các bản ghi trong bảng Booking liên quan đến bác sĩ
      await db.Booking.destroy({
        where: { DoctorId: DoctorId },
        transaction,
      });

      // Tìm thông tin bác sĩ để lấy trường email
      let doctor = await db.Doctor.findOne({
        where: { id: DoctorId },
        transaction,
      });
      
      await db.Doctor.destroy({
        where: { id: DoctorId },
        transaction,
      });
      if (doctor) {
        // Xóa email của bác sĩ trong bảng Login
        await db.Login.destroy({
          where: { email: doctor.email },
          transaction,
        });

        // Xóa bác sĩ trong bảng Doctor
        await doctor.destroy({ transaction });
      } else {
        // Nếu không tìm thấy bác sĩ, hủy giao dịch và trả về lỗi
        await transaction.rollback();
        reject(new Error("Doctor not found"));
      }

      // Xác nhận giao dịch nếu không có lỗi xảy ra
      await transaction.commit();

      // Trả về kết quả khi xóa thành công
      resolve();
    } catch (e) {
      // Nếu có lỗi xảy ra, hủy giao dịch và trả về lỗi
      if (transaction) await transaction.rollback();
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
  handleLogin: handleLogin,

  createNewPatient: createNewPatient,
  createNewDoctor: createNewDoctor,

  getAllDoctors: getAllDoctors,
  getAllPatients: getAllPatients,

  getPatientInfoById: getPatientInfoById,
  getDoctorInfoById: getDoctorInfoById,

  updatePatientData: updatePatientData,
  updateDoctorData: updateDoctorData,

  deletePatientById: deletePatientById,
  deleteDoctorById: deleteDoctorById,

  getAllCodeService: getAllCodeService,
};
