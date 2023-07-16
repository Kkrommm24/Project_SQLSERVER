import LoginService from '../services/LoginService';
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  //check email exist
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Missing inputs parameter!',
    });
  }

  let loginData = await LoginService.handleLogin(email, password);
  if (loginData.errCode === 0) {
    let role = loginData.login.roleId;
    let userId;

    if (role === 'Patient') {
      // Lấy ID từ bảng "patients"
      if (loginData.patient) {
        userId = loginData.patient.id;
        console.log('Patient ID:', userId);
      }
    } else if (role === 'Doctor') {
      // Lấy ID từ bảng "doctors"
      if (loginData.doctor) {
        userId = loginData.doctor.id;
        console.log('Doctor ID:', userId);
      }
    } else if(role === 'Admin'){
      userId = loginData.login.id;
      console.log('ADMIN ID: ', userId);
    }
    // Lưu ID vào session
    req.session.userId = userId;
    req.session.roleId = role;
    console.log(req.session);
  }
  return res.status(200).json({
    errCode: loginData.errCode,
    message: loginData.errMessage,
    ...(loginData.doctor && { doctor: loginData.doctor }), // Chỉ hiển thị doctor nếu có giá trị
    ...(loginData.patient && { patient: loginData.patient }), // Chỉ hiển thị patient nếu có giá trị,
  });
};

// let forgotPassword = asyncHandler( async ( async (req, res) =>{
//     let user_email = req.query.email
//     if (!user_email) throw new Error('Missing email')

//     let user = await db.Login.findOne({ email })
//     if (!user) throw new Error('User not found')
//     let resetToken = user.createPasswordChangedToken()
//     await user.save()

//     const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`

// }))
module.exports = {
  handleLogin: handleLogin,
  // forgotPassword: forgotPassword,
};
