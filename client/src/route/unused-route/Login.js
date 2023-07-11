import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  doctorLoginSuccess,
  patientLoginSuccess,
  processLogout,
} from '../store/action/userAction';
import handleLoginForm from '../service/userService';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const IsLoggedIn = (props) => {
  if (props.isDoctor || props.isPatient) {
    return <Navigate replace to="/home" />;
  } else return <Login {...props} />;
};

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      let data = await handleLoginForm(email, password);
      console.log(data);
      if (data.errCode === 0) {
        if (data.doctor) {
          props.doctorLoginSuccess(data.doctor);
          console.log('yes doctor');
        } else if (data.patient) {
          props.patientLoginSuccess(data.patient);
        } else {
          console.log('nah i not doctor nor patient');
        }
        navigate('/home');
      }
    } catch (e) {
      console.log(e);
    }

    //NOTE: In this app we dont use any security method for login data, instead we will store login data directly inside the local storage
  };
  return (
    <div className="bg-gradient-to-b from-indigo-500 from-10% via-indigo-300 via-60% to-cyan-100  h-screen w-screen">
      <div className=" bg-white items-center justify-center fixed p-10 h-2/3 w-1/3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex  rounded-2xl shadow-md flex-col">
        <form>
          <p className="text-3xl text-center font-semibold antialiased pb-8">
            Login
          </p>
          <label>
            <p>Email</p>
          </label>
          <input
            type="text"
            name="email"
            value={email}
            className="shadow-inner bg-slate-100 rounded w-full mb-2"
            onChange={(e) => handleEmail(e)}
          />
          <label>
            <p>Password</p>
          </label>
          <input
            type="password"
            name="password"
            value={password}
            className="shadow-inner bg-slate-100 rounded w-full "
            onChange={(e) => handlePassword(e)}
          />
          <p className="text-gray-600 mb-6 text-sm">Forgot password?</p>
          <button
            className="font-medium text-white mx-auto mt-3 w-full px-3 py-2 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded shadow-md text-center "
            onClick={(e) => handleLogin(e)}
          >
            Click Me
          </button>
        </form>
        <Link to="/register">register</Link>
      </div>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(IsLoggedIn);
