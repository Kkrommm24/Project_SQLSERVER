const crypto = require('crypto');
import bcrypt from 'bcryptjs';
import db from '../models/index';
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
        let patient = await db.Patient.findOne({
          attributes: [
            'roleId',
            'id',
            'email',
            'Patient_firstName',
            'Patient_lastName',
          ],
          where: { email: email },
          raw: true,
        });
        let doctor = await db.Doctor.findOne({
          attributes: [
            'roleId',
            'id',
            'email',
            'Doctor_firstName',
            'Doctor_lastName',
          ],
          where: { email: email },
          raw: true,
        });
        if (login) {
          //compare password
          let check = await bcrypt.compareSync(password, login.password);
          //
          if (check) {
            let role = login.roleId;
            if (patient && role === 'Patient') {
              loginData.errCode = 0;
              (loginData.errMessage = `Ok You're Patient`),
                //console.log(login);
                delete login.password;
              loginData.login = login;
              loginData.patient = patient;
            } else if (doctor && role === 'Doctor') {
              loginData.errCode = 0;
              (loginData.errMessage = `Ok You're Doctor`),
                //console.log(login);
                delete login.password;
              loginData.login = login;
              loginData.doctor = doctor;
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
      console.error('Error:', e);
      reject(e);
    }
  });
};

// let createPasswordChangedToken = async (user_email) => {
//     const resetToken = crypto.randomBytes(32).toString('hex')
//     this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
//     this.passwordResetExpires = Date.now() + 15 * 60 * 1000
//     return resetToken
// }
module.exports = {
  handleLogin: handleLogin,
  // createPasswordChangedToken: createPasswordChangedToken,
};
