import BookingService from '../services/BookingService';
import db from '../models/index';

//Tạo 1 booking mới
let handleBooking = async (req, res) => {
  let clinicData = await db.Clinic.findAll({
    raw: true,
  });
  let specializationData = await db.Specialization.findAll({
    raw: true,
  });
  return res.send({ clinic: clinicData, specialization: specializationData });
};

// Lấy doctor với clinic và specialization tương ứng
let postBooking_doctor = async (req, res) => {
  let doctorData = await db.Doctor.findAll({
    where: {
      ClinicId: req.body.ClinicId,
      SpecializationId: req.body.SpecializationId,
    },
    raw: true,
  });
  return res.send({ doctor: doctorData });
};

// Kiểm tra xem booking tồn tại hay chưa và tạo booking
let postBooking = async (req, res) => {
  console.log('----------------------');
  console.log(req.session.userId);
  console.log('----------------------');
  const patientId = req.session.userId;

  console.log(patientId);

  const bookingData = {
    patientId: patientId,
    doctorId: req.body.doctorId,
    date: req.body.date,
    timeType: req.body.timeType,
  };
  console.log('Booking: ', bookingData);
  try {
    const message = await BookingService.createBooking_doctor(bookingData);
    console.log(message);
    // if (message.errCode === 0) {
    //   return res.send('Created');
    // } else if (message.errCode === 1) {
    //   return res.send('Your schedule is already booked, try another schedule');
    // } else if (message.errCode === 1.1) {
    //   return res.send(
    //     'You are booking the same time as another one you have booked, try another schedule'
    //   );
    // } else {
    //   return res.send('Failed to create booking');
    // }
    res.send(message);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

let handleCancelBooking = async (req, res, next) => {
  let data = req.body;
  let message = await BookingService.updateCancelStatus(data);
  req.session.bookingId = data.BookingId;
  next();
  //return res.status(200).json(message);
};

let DescriptionOfCancel = async (req, res) => {
  let data = req.body;
  let booking_id = req.session.bookingId;
  let message = await BookingService.DescriptionOfCancel_Service(
    data,
    booking_id
  );
  console.log(message);
  return res.json(message);
};

let handleConfirmBooking = async (req, res) => {
  let data = req.body;
  let message = await BookingService.updateConfirmStatus(data);
  req.session.bookingId = data.BookingId;
  return res.status(200).json(message);
};

let handleDoneBooking = async (req, res, next) => {
  let data = req.body;
  let message = await BookingService.updateDoneStatus(data);
  req.session.bookingId = data.BookingId;
  next();
};

let DescriptionOfDone = async (req, res) => {
  let data = req.body;
  let booking_id = req.session.bookingId;
  let message = await BookingService.DescriptionOfDone_Service(
    data,
    booking_id
  );
  console.log(message);
  return res.status(200).json(message);
};

module.exports = {
  handleBooking: handleBooking,
  postBooking_doctor: postBooking_doctor,
  postBooking: postBooking,

  handleCancelBooking: handleCancelBooking,
  DescriptionOfCancel: DescriptionOfCancel,
  handleConfirmBooking: handleConfirmBooking,
  handleDoneBooking: handleDoneBooking,
  DescriptionOfDone: DescriptionOfDone,
};
