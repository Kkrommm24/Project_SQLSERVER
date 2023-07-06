import LoginService from "../services/LoginService"
let handleLogin = async (req, res) =>{
    let email = req.body.email;
    let password = req.body.password;

    //check email exist
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!',
        })
    }

    let loginData = await LoginService.handleLogin(email, password)
    if (loginData.errCode === 0) {
        let role = loginData.login.roleId;
        let userId;
    
        if (role === 'Patient') {
          // Lấy ID từ bảng "patients"
          if (loginData.patient) {
            userId = loginData.patient.id;
          }
        } else if (role === 'Doctor') {
          // Lấy ID từ bảng "doctors"
          if (loginData.doctor) {
            userId = loginData.doctor.id;
          }
        }
        // Lưu ID vào session
        req.session.userId = userId;
      }
    console.log('User ID:', req.session.userId);
    return res.status(200).json({
        errCode: loginData.errCode,
        message: loginData.errMessage,
        login: loginData.login ? loginData.login : {}
    })
}

// let forgotPassword = asyncHandler( async ( async (req, res) =>{
//     let user_email = req.query.email
//     if (!user_email) throw new Error('Missing email')
    
//     let user = await db.Login.findOne({ email })
//     if (!user) throw new Error('User not found')
//     let resetToken = user.createPasswordChangedToken()
//     await user.save()

//     const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`

// }))
module.exports ={
    handleLogin: handleLogin,
    // forgotPassword: forgotPassword,
}