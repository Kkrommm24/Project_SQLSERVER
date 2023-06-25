import LoginService from "../services/LoginService"
let handleLogin = async (req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    console.log('your email: ' + email);
    console.log('your password: ' + password);
    

    //check email exist
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!',
        })
    }

    let loginData = await LoginService.handleLogin(email, password)
    //compare password
    // return user in4
    // return access token
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