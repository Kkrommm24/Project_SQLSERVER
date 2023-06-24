import bcrypt  from 'bcryptjs';
import db from "../models/index";
let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try{
            let loginData = {}
            let isExist = await checkUserEmail(email);
            if(isExist){
                //user existed
                
                let login = await db.Login.findOne({
                    attributes: ['email', 'password'],
                    where: {email: email},
                    raw: true
                });
                if(login){
                    //compare password
                    let check = await bcrypt.compareSync(password, login.password);
                    //
                    if(check){
                        loginData.errCode = 0;
                        loginData.errMessage = 'OK',
                        console.log(login);
                        delete login.password;
                        loginData.login = login;
                    }else{
                        loginData.errCode = 3;
                        loginData.errMessage = 'Wrong Password';
                    }
                }else{
                    loginData.errCode = 2;
                    loginData.errMessage = `USER NOT FOUND`;
                }
            }else{
                loginData.errCode = 1;
                loginData.errMessage = `Email doesn't exist`;
            }
            resolve(loginData)
        }catch(e){
            reject(e);
        }
    })
}

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

let getAllPatients = (PatientId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let logins = '';
        if (PatientId === 'ALL') {
          logins = await db.Patient.findAll({
          });
        }
        if (PatientId && PatientId !== 'ALL') {
          // Add code here
          logins = await db.Patient.findOne({
            where: { id: PatientId },
          });
        }
        resolve(logins);
      } catch (e) {
        reject(e);
      }
    });
  };
  
module.exports = {
  handleLogin: handleLogin,
  getAllPatients: getAllPatients,
}