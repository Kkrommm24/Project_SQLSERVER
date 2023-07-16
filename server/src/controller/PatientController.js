import PatientService from '../services/PatientService';
import db from '../models/index';
import bcrypt from 'bcryptjs';
var storage = require('node-persist');
// Lấy toàn bộ bệnh nhân
let handlegetAllPatients = async (req, res) => {
  let id = req.query.id; // truyền All, id
  raw: true;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
      users: [],
    });
  }
  let users = await PatientService.getAllPatients(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: 'OK',
    users,
  });
};

//Tạo mới 1 bệnh nhân
let handleCreateNewPatient = async (req, res) => {
  let message = await PatientService.createNewPatient(req.body);

  return res.status(200).json(message);
};

//Lấy thông tin bệnh nhân trong phiên đăng nhập
let handlegetOnePatient = async (req, res) => {
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
};

//Chỉnh sửa bệnh nhân
let handleEditPatient = async (req, res) => {
  let data = req.body;
  data = { ...data, id: req.session.userId };
  let message = await PatientService.updatePatientData(data);
  return res.status(200).json(message);
};

//Đổi password bệnh nhân trong phiên đăng nhập
let handleChangePassword = async (req, res) => {
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
      return res
        .status(400)
        .json({ error: 'Incorrect current password', errCode: 2 });
    }
    if (isMatch2 !== 0) {
      return res.status(400).json({
        error: 'New password does not match. Enter new password again',
        errCode: 1,
      });
    }
    // Hash và lưu mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    login.password = hashedNewPassword;
    await login.save();
    return res
      .status(200)
      .json({ message: 'Password updated successfully', errCode: 0 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error', errCode: 3 });
  }
};

//Xóa bệnh nhân theo email
let handleDeletePatient = async (req, res) => {
  if (!req.body.email) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  }
  let message = await PatientService.deleteUser(req.body.email);
  return res.status(200).json(message);
};

//Hiển thị booking của bản thân
let handlegetBooking = async (req, res) => {
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
};
module.exports = {
  handlegetAllPatients: handlegetAllPatients,

  handleCreateNewPatient: handleCreateNewPatient,

  handlegetOnePatient: handlegetOnePatient,

  handleEditPatient: handleEditPatient,
  handleChangePassword: handleChangePassword,

  handleDeletePatient: handleDeletePatient,

  handlegetBooking: handlegetBooking,
};
