import { response } from 'express';
import db from '../models/index';
const { Op } = require('sequelize');

let checkBooking = (doctorData, dateData, timeTypeData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let booking = await db.Booking.findOne({
        attributes: ['DoctorId', 'date', 'timeType', 'StatusId'],
        where: {
          DoctorId: doctorData,
          date: dateData,
          timeType: timeTypeData,
          StatusId: {
            [Op.in]: [4, 5] // Thêm điều kiện StatusId là 4 hoặc 5 thì không đặt được
          }
        },
        raw: true,
      });
      if (booking) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkBooking2 = (patientData, dateData, timeTypeData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let booking = await db.Booking.findOne({
        attributes: ['PatientId', 'date', 'timeType', 'StatusId'],
        where: {
          PatientId: patientData,
          date: dateData,
          timeType: timeTypeData,
          StatusId: {
            [Op.in]: [4, 5] // Thêm điều kiện StatusId là 4 hoặc 5 thì không đặt được
          }
        },
        raw: true,
      });
      if (booking) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createBooking_doctor = async (bookingData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { patientId, doctorId, date, timeType } = bookingData;
      let check = await checkBooking(doctorId, date, timeType);
      let check2 = await checkBooking2(patientId, date, timeType);
      if (check === true) {
        resolve({
          errCode: 1,
          message: 'Your schedule is already booked, try another schedule',
        });
      } else {
        if (check2 === true) {
          resolve({
            errCode: 1.1,
            message:
              'You are booking the same time as another one you have booked, try another schedule',
          });
        } else {
          await db.Booking.create({
            StatusId: 4,
            DoctorId: doctorId,
            PatientId: patientId,
            date: date,
            timeType: timeType,
          });
        }
      }
      resolve({
        errCode: 0,
        message: 'Booking created successfully',
      });
    } catch (e) {
      console.error('Error_cre_doc:', e);
    }
  });
};

let updateCancelStatus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let booking = await db.Booking.findOne({
        where: { id: data.BookingId },
        raw: false,
      });
      if (booking) {
        booking.StatusId = 7;
        await booking.save();
        await db.History.create({
          PatientId: booking.PatientId,
          DoctorId: booking.DoctorId,
          BookingId: data.BookingId,
          History_files: null, // Set giá trị tùy theo yêu cầu
        });
        resolve({
          errCode: 0,
          errMessage: `CANCEL SUCCESS`,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `BOOKING NOT FOUND`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let DescriptionOfCancel_Service = (data, booking_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let history = await db.History.findOne({
        where: { BookingId: booking_id },
        raw: false,
      });
      if (history) {
        history.History_description = data.History_description;
        history.History_files = data.History_files;
        await history.save();
        resolve({
          errCode: 0,
          errMessage: `DESCRIBE HISTORY CANCEL SUCCESS`,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `HISTORY NOT FOUND`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateConfirmStatus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let booking = await db.Booking.findOne({
        where: { id: data.BookingId },
        raw: false,
      });
      if (booking) {
        booking.StatusId = 5;
        await booking.save();
        resolve({
          errCode: 0,
          errMessage: `CONFIRM SUCCESS`,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `BOOKING NOT FOUND`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateDoneStatus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let booking = await db.Booking.findOne({
        where: { id: data.BookingId },
        raw: false,
      });
      if (booking) {
        booking.StatusId = 6;
        await booking.save();
        await db.History.create({
          PatientId: booking.PatientId,
          DoctorId: booking.DoctorId,
          BookingId: data.BookingId,
          History_files: null, // Set giá trị tùy theo yêu cầu
        });
        resolve({
          errCode: 0,
          errMessage: `DONE`,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `BOOKING NOT FOUND`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let DescriptionOfDone_Service = (data, booking_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let history = await db.History.findOne({
        where: { BookingId: booking_id },
        raw: false,
      });
      if (history) {
        history.History_description = data.History_description;
        history.History_files = data.History_files;
        await history.save();
        resolve({
          errCode: 0,
          errMessage: `DESCRIBE HISTORY DONE SUCCESS`,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `HISTORY NOT FOUND`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createBooking_doctor: createBooking_doctor,

  updateCancelStatus: updateCancelStatus,
  DescriptionOfCancel_Service: DescriptionOfCancel_Service,
  updateConfirmStatus: updateConfirmStatus,
  updateDoneStatus: updateDoneStatus,
  DescriptionOfDone_Service: DescriptionOfDone_Service,
};
