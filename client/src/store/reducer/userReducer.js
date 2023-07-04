import actionTypes from "../action/actionTypes";

const initialState = {
  isDoctor: false,
  isPatient: false,
  userInfo: null,
  error: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DOCTOR_LOGIN_SUCCESS:
      return {
        ...state,
        isDoctor: true,
        isPatient: false,
        userInfo: action.data,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isDoctor: false,
        isPatient: false,
        userInfo: null,
        error: action.error,
      };
    case actionTypes.PATIENT_LOGIN_SUCCESS:
      return {
        ...state,
        isPatient: true,
        isDoctor: false,
        userInfo: action.data,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isDoctor: false,
        isPatient: false,
        userInfo: null,
      };
    default:
      return { ...state };
  }
};

export default appReducer;
