import DoctorService from '../services/DoctorService';
import db from '../models/index';
import bcrypt from 'bcryptjs';
var storage = require('node-persist');

//Lấy toàn bộ bác sĩ
let handlegetAllDoctors = async (req, res) => {
  let id = req.query.id; // truyền All, id
  raw: true;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
      users: [],
    });
  }
  let users = await DoctorService.getAllDoctors(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: 'OK',
    users,
  });
};

//Tạo mới 1 bác sĩ
let handleCreateNewDoctor = async (req, res) => {
  let message = await DoctorService.createNewDoctor(req.body);
  console.log(message);
  return res.status(200).json(message);
};

//Lấy thông tin bác sĩ trong phiên đăng nhập
let handlegetOneDoctor = async (req, res) => {
  try {
    let userId = req.session.userId;
    let doctor = await DoctorService.getDoctor(userId); // Gọi phương thức getDoctor từ DoctorService
    if (doctor) {
      return res.status(200).json({ doctor });
    } else {
      return res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error('Error from handlegetOneDoctor:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

//Đổi password bác sĩ trong phiên đăng nhập
let handleChangePassword = async (req, res) => {
  let doctorId = req.session.userId;
  let { currentPassword, newPassword, cf_newPassword } = req.body;
  try {
    // Kiểm tra xem doctorId có tồn tại trong bảng doctors hay không
    let doctor = await db.Doctor.findOne({
      where: { id: doctorId },
      raw: true,
    });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    let login = await db.Login.findOne({
      where: { email: doctor.email },
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

//Chỉnh sửa bác sĩ
let handleEditDoctor = async (req, res) => {
  let data = req.body;
  data = { ...data, id: req.session.userId };
  let message = await DoctorService.updateDoctorData(data);
  return res.status(200).json(message);
};

//Xóa bác sĩ theo email
let handleDeleteDoctor = async (req, res) => {
  if (!req.body.email) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  }
  let message = await DoctorService.deleteUser(req.body.email);
  return res.status(200).json(message);
};

//Lấy ttin lịch khám của bản thân
let handlegetBooking = async (req, res) => {
  try {
    const userId = req.session.userId; // Lấy userId từ session
    const doctorBooking = await DoctorService.getDoctorBooking(userId);
    if (doctorBooking) {
      return res.status(200).json({ doctorBooking });
    } else {
      return res.status(404).json({ message: `You haven't book anything` });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = {
  handlegetAllDoctors: handlegetAllDoctors,
  handleCreateNewDoctor: handleCreateNewDoctor,
  handleChangePassword: handleChangePassword,
  handleEditDoctor: handleEditDoctor,
  handleDeleteDoctor: handleDeleteDoctor,
  handlegetOneDoctor: handlegetOneDoctor,
  handlegetBooking: handlegetBooking,
};
