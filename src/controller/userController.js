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

    let loginData = await userService.handleLogin(email, password)
    //compare password
    // return user in4
    // return access token
    return res.status(200).json({
        errCode: loginData.errCode,
        message: loginData.errMessage,
        login: loginData.login ? loginData.login : {}
    })
}

let handlegetAllPatients = async (req, res) => {
    let id = req.body.id; // truyền All, id
    raw: true;
    if(!id){
        return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters',
        users: []
    })
    }
    let users = await userService.getAllPatients(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

module.exports ={
    handleLogin: handleLogin,
    handlegetAllPatients: handlegetAllPatients,
}