import bcrypt  from 'bcryptjs';
import db from "../models/index";
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try{
            let userData = {}
            let isExist = await checkUserEmail(email);
            if(isExist){
                //user existed
                
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: {email: email},
                    raw: true
                });
                if(user){
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    //
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'OK',
                        console.log(user);
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong Password';
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `USER NOT FOUND`;
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = `Email doesn't exist`;
            }
            resolve(userData)
        }catch(e){
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e){
            reject(e);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
}