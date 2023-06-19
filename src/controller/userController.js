import userService from "../services/userService"
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

    let userData = await userService.handleUserLogin(email, password)
    //compare password
    // return user in4
    // return access token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

module.exports ={
    handleLogin: handleLogin,
}