import actionTypes from "./actionTypes";

export const patientLoginSuccess = (patientInfo) => ({
  type: actionTypes.PATIENT_LOGIN_SUCCESS,
  data: patientInfo,
});

export const LoginFail = (error) => ({
  type: actionTypes.LOGIN_FAIL,
  data: error,
});

export const doctorLoginSuccess = (doctorInfo) => ({
  type: actionTypes.DOCTOR_LOGIN_SUCCESS,
  data: doctorInfo,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});
