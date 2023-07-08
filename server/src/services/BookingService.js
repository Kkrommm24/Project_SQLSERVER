import { response } from "express";
import db from "../models/index";

let updateCancelStatus = (data) =>{
    return new Promise(async (resolve, reject) => {
      try{
            let booking = await  db.Booking.findOne({
                where: {id: data.BookingId},
                raw: false
            })
            if(booking){
                booking.StatusId = 7;
                await booking.save();
                await db.History.create({
                  PatientId: booking.PatientId,
                  DoctorId: booking.DoctorId,
                  BookingId: data.BookingId,
                  History_files: null, // Set giá trị tùy theo yêu cầu
                })
                resolve({
                    errCode: 0,
                    errMessage: `CANCEL SUCCESS`
                  })
            }else{
              resolve({
                errCode: 2,
                errMessage: `BOOKING NOT FOUND`
              })
            }
      }catch(e){
        reject(e);
      }
    })
  }

let DescriptionOfCancel_Service = (data, booking_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let history = await db.History.findOne({
        where: { BookingId: booking_id },
        raw: false
      });
      if (history) {
        history.History_description = data.History_description;
        history.History_files = data.History_files;
        await history.save();
        resolve({
          errCode: 0,
          errMessage: `DESCRIBE HISTORY CANCEL SUCCESS`
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `HISTORY NOT FOUND`
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateConfirmStatus = (data) =>{
  return new Promise(async (resolve, reject) => {
    try{
          let booking = await  db.Booking.findOne({
              where: {id: data.BookingId},
              raw: false
          })
          if(booking){
              booking.StatusId = 5;
              await booking.save();
              resolve({
                  errCode: 0,
                  errMessage: `CONFIRM SUCCESS`
                })
          }else{
            resolve({
              errCode: 2,
              errMessage: `BOOKING NOT FOUND`
            })
          }
    }catch(e){
      reject(e);
    }
  })
}

let updateDoneStatus = (data) =>{
  return new Promise(async (resolve, reject) => {
    try{
          let booking = await  db.Booking.findOne({
              where: {id: data.BookingId},
              raw: false
          })
          if(booking){
              booking.StatusId = 6;
              await booking.save();
              await db.History.create({
                PatientId: booking.PatientId,
                DoctorId: booking.DoctorId,
                BookingId: data.BookingId,
                History_files: null, // Set giá trị tùy theo yêu cầu
              })
              resolve({
                  errCode: 0,
                  errMessage: `DONE`
                })
          }else{
            resolve({
              errCode: 2,
              errMessage: `BOOKING NOT FOUND`
            })
          }
    }catch(e){
      reject(e);
    }
  })
}

let DescriptionOfDone_Service = (data, booking_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let history = await db.History.findOne({
        where: { BookingId: booking_id },
        raw: false
      });
      if (history) {
        history.History_description = data.History_description;
        history.History_files = data.History_files;
        await history.save();
        resolve({
          errCode: 0,
          errMessage: `DESCRIBE HISTORY DONE SUCCESS`
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `HISTORY NOT FOUND`
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports ={
  updateCancelStatus: updateCancelStatus,
  DescriptionOfCancel_Service: DescriptionOfCancel_Service,
  updateConfirmStatus: updateConfirmStatus,
  updateDoneStatus: updateDoneStatus,
  DescriptionOfDone_Service: DescriptionOfDone_Service,
}