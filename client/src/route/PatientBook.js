import React, { useState } from "react";
import { connect } from "react-redux";
import {
  doctorLoginSuccess,
  patientLoginSuccess,
  processLogout,
} from "../store/action/userAction";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Booking = (props) => {
  const navigate = useNavigate();
  if (props.isPatient) {
    new Promise((resolve, reject) => {
      try {
        axios.get("/api/test");
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  } else navigate("/home");
};
const Book = (props) => {
  return <div>Hello from book</div>;
};

const mapStateToProps = (state) => {
  return {
    isDoctor: state.isDoctor,
    isPatient: state.isPatient,
    userInfo: state.userInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doctorLoginSuccess: (user) => dispatch(doctorLoginSuccess(user)),
    patientLoginSuccess: (user) => dispatch(patientLoginSuccess(user)),
    processLogout: () => dispatch(processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
