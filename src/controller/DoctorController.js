import DoctorService from "../services/DoctorService"

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
}