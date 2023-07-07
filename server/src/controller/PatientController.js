import PatientService from "../services/PatientService"
import db from "../models/index";
import bcrypt  from 'bcryptjs';
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

//Lấy thông tin bệnh nhân trong phiên đăng nhập
let handlegetOnePatient = async (req, res) =>{
  try {
    const userId = req.session.userId; // Lấy userId từ session
    const patient = await PatientService.getPatient(userId);
    if (patient) {
      return res.status(200).json({ patient });
    } else {
      return res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

//Chỉnh sửa bệnh nhân 
let handleEditPatient = async (req, res) =>{
    let data = req.body;
    let message = await PatientService.updatePatientData(data);
    return res.status(200).json(message);
}

//Đổi password bệnh nhân trong phiên đăng nhập
let handleChangePassword = async (req, res) =>{
  let patientId = req.session.userId;
  let { currentPassword, newPassword, cf_newPassword } = req.body;
  try {
    // Kiểm tra xem patientId có tồn tại trong bảng Patients hay không
    let patient = await db.Patient.findOne({
      where: { id: patientId },
      raw: true,
    });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    let login = await db.Login.findOne({
      where: { email: patient.email },
    });
    console.log('Current Password:', currentPassword);
    
    if (!login) {
      return res.status(404).json({ error: 'Login not found' });
    }
    const isMatch = await bcrypt.compare(currentPassword, login.password);
    const isMatch2 = await newPassword.localeCompare(cf_newPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm New Password:', cf_newPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }
    if(isMatch2 !== 0){
      return res.status(400).json({ error: 'New password does not match. Enter new password again' });
    }
    // Hash và lưu mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    login.password = hashedNewPassword;
    await login.save();
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

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
    return res.redirect('/api/patient-booking-specialization');
}

let handleBooking_2 = async (req, res) =>{
    let specializations = await db.Specialization.findAll();
    return res.render('patient_booking_specialization.ejs', {specializations: specializations});
}

let postBooking_specialization = async (req, res) => {
    let message = await PatientService.createBooking_specialization(req.body);
    console.log(message);
    return res.redirect('/api/patient-booking-doctor');
}

let handleBooking_3 = async (req, res) => {
    try {
      let clinicId = await PatientService.getClinicValue();
      let specializationId = await PatientService.getSpecializationValue();
      console.log('ClinicId: ', clinicId,'\nSpecializationId: ', specializationId)
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
  const patientId = req.session.userId;
  console.log(patientId)
  const bookingData = {
    patientId: patientId,
    doctorId: req.body.doctorId,
    date: req.body.date,
    timeType: req.body.timeType,
  };
  console.log(bookingData);
  try {
    const message = await PatientService.createBooking_doctor(bookingData);
    console.log(message);
    if (message.errCode === 0) {
      return res.send('Created');
    } else if (message.errCode === 1) {
      return res.send('Your schedule is already booked, try another schedule');
    } else {
      return res.send('Failed to create booking');
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

//Hiển thị booking của bản thân
let handlegetBooking = async (req, res) =>{
  try {
    const userId = req.session.userId; // Lấy userId từ session
    const patientBooking = await PatientService.getPatientBooking(userId);
    if (patientBooking) {
      return res.status(200).json({ patientBooking });
    } else {
      return res.status(404).json({ message: `You haven't book anything` });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports ={
    handlegetAllPatients: handlegetAllPatients,

    handleCreateNewPatient: handleCreateNewPatient,
  
    handlegetOnePatient: handlegetOnePatient,

    handleEditPatient: handleEditPatient,
    handleChangePassword: handleChangePassword,

    handleDeletePatient: handleDeletePatient,
    
    handleBooking_1: handleBooking_1,
    postBooking_clinic: postBooking_clinic,
    handleBooking_2: handleBooking_2,
    postBooking_specialization: postBooking_specialization,
    handleBooking_3: handleBooking_3,
    postBooking_doctor: postBooking_doctor,

    handlegetBooking: handlegetBooking,
    
}