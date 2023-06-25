const crypto = require('crypto');
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
                        //console.log(login);
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

// let createPasswordChangedToken = async (user_email) => {
//     const resetToken = crypto.randomBytes(32).toString('hex')
//     this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
//     this.passwordResetExpires = Date.now() + 15 * 60 * 1000
//     return resetToken
// }
module.exports = {
    handleLogin: handleLogin,
    // createPasswordChangedToken: createPasswordChangedToken,
  }