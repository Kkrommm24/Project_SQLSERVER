import BookingService from "../services/BookingService"
import db from "../models/index";
import bcrypt  from 'bcryptjs';
var storage = require('node-persist');

let handleCancelBooking = async (req, res) =>{
    let data = req.body 
    let message = await BookingService.updateCancelStatus(data);
    req.session.bookingId = data.BookingId;
    return res.status(200).json(message);
}

let DescriptionOfCancel = async (req, res) =>{
    let data = req.body
    let booking_id = req.session.bookingId
    let message = await BookingService.DescriptionOfCancel_Service(data, booking_id);
    console.log(message);
    return res.status(200).json(message)
} 

let handleConfirmBooking = async (req, res) =>{
    let data = req.body 
    let message = await BookingService.updateConfirmStatus(data);
    req.session.bookingId = data.BookingId;
    return res.status(200).json(message);
}

let handleDoneBooking = async (req, res) =>{
    let data = req.body 
    let message = await BookingService.updateDoneStatus(data);
    req.session.bookingId = data.BookingId;
    return res.status(200).json(message);
}

let DescriptionOfDone = async (req, res) =>{
    let data = req.body
    let booking_id = req.session.bookingId
    let message = await BookingService.DescriptionOfDone_Service(data, booking_id);
    console.log(message);
    return res.status(200).json(message)
} 
module.exports ={
    handleCancelBooking: handleCancelBooking,
    DescriptionOfCancel: DescriptionOfCancel,
    handleConfirmBooking: handleConfirmBooking,
    handleDoneBooking: handleDoneBooking,
    DescriptionOfDone: DescriptionOfDone,
}