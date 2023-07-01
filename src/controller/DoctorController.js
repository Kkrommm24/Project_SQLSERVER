import DoctorService from "../services/DoctorService"

let handlegetAllDoctors = async (req, res) => {
    let id = req.query.id; // truyền All, id
    raw: true;
    if(!id){
        return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters',
        users: []
    })
    }
    let users = await DoctorService.getAllDoctors(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewDoctor = async (req, res) =>{
    let message = await DoctorService.createNewDoctor(req.body);
    console.log(message);
    return res.status(200).json(message)
    
}

let handleEditDoctor = async (req, res) =>{
    let data = req.body;
    let message = await DoctorService.updateDoctorData(data);
    return res.status(200).json(message);
}
let handleDeleteDoctor = async (req, res) =>{
    if(!req.body.email){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
        })
    }
    let message = await DoctorService.deleteUser(req.body.email);
    return res.status(200).json(message);
}


let bulkCreateSchedule = async (req, res) =>{
    
    try{
        let infor = await DoctorService.bulkCreateSchedule(req.body)
        return res.status(200).json(
            infor
        )
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
        })
    }
}
module.exports ={
    bulkCreateSchedule: bulkCreateSchedule,
    handlegetAllDoctors: handlegetAllDoctors,
    handleCreateNewDoctor: handleCreateNewDoctor,
    handleEditDoctor: handleEditDoctor,
    handleDeleteDoctor: handleDeleteDoctor,
}
