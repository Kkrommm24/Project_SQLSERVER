import PatientService from "../services/PatientService"
import db from "../models/index";
var storage = require('node-persist');
// Lấy toàn bộ bệnh nhân
let handlegetAllPatients = async (req, res) => {
    let id = req.query.id; // truyền All, id
    raw: true;
    if(!id){
        return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters',
        users: []
    })
    }
    let users = await PatientService.getAllPatients(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

//Tạo mới 1 bệnh nhân
let handleCreateNewPatient = async (req, res) =>{
    let message = await PatientService.createNewPatient(req.body);
    console.log(message);
    return res.status(200).json(message)
    
}

//Chỉnh sửa 1 bệnh nhân
let handleEditPatient = async (req, res) =>{
    let data = req.body;
    let message = await PatientService.updatePatientData(data);
    return res.status(200).json(message);
}

//Xóa bệnh nhân theo email
let handleDeletePatient = async (req, res) =>{
    if(!req.body.email){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
        })
    }
    let message = await PatientService.deleteUser(req.body.email);
    return res.status(200).json(message);
}

//Tạo 1 booking mới
let handleBooking_1 = async (req, res) =>{
    let clinics = await db.Clinic.findAll();
    return res.render('patient_booking_clinic.ejs', {clinics: clinics});
}

let postBooking_clinic = async (req, res) => {
    let message = await PatientService.createBooking_clinic(req.body);
    console.log(message);
    let post_cli = await PatientService.setClinicValue(req.body.clinicId);
    console.log(post_cli);
    return res.redirect('/patient-booking-specialization');
}

let handleBooking_2 = async (req, res) =>{
    let specializations = await db.Specialization.findAll();
    return res.render('patient_booking_specialization.ejs', {specializations: specializations});
}

let postBooking_specialization = async (req, res) => {
    let message = await PatientService.createBooking_specialization(req.body);
    console.log(message);
    await PatientService.setSpecializationValue(req.body.specializationId);
    return res.redirect('/patient-booking-doctor');
}

let handleBooking_3 = async (req, res) => {
    try {
      let clinicId = await PatientService.getClinicValue();
      let specializationId = await PatientService.getSpecializationValue();
  
      let doctors = await db.Doctor.findAll({
        where: {
          ClinicId: clinicId,
          SpecializationId: specializationId
        }
      });
  
      // Render file EJS và truyền danh sách bác sĩ vào
      res.render('patient-booking-doctor.ejs', { doctors: doctors });
    } catch (e) {
      console.error('Error:', e);
      // Xử lý lỗi nếu cần thiết
      res.status(500).send('Internal Server Error');
    }
  };
  
let postBooking_doctor = async (req, res) => {
    let message = await PatientService.createBooking_doctor(req.body);
    console.log(message)
    if(message.errCode === 0){
        return res.send('Created');
    }else if(message.errCode === 1){
        return res.send('Your schedule is already booked, try another schedule');
    }
    
}
module.exports ={
    handlegetAllPatients: handlegetAllPatients,
    handleCreateNewPatient: handleCreateNewPatient,
    handleEditPatient: handleEditPatient,
    handleDeletePatient: handleDeletePatient,
    handleBooking_1: handleBooking_1,
    postBooking_clinic: postBooking_clinic,
    handleBooking_2: handleBooking_2,
    postBooking_specialization: postBooking_specialization,
    handleBooking_3: handleBooking_3,
    postBooking_doctor: postBooking_doctor,
}