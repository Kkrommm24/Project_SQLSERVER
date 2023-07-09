import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../asset/logo.png';
import dropdownarrow from '../asset/arrow.png';
export const Navbar = (props) => {
  //check user role then render
  const navigate = useNavigate();
  const handleBooking = () => {
    if (props.props.isPatient) {
      navigate('/booking');
    } else navigate('/login');
  };
  const handleLogout = () => {
    props.props.processLogout();
    navigate('/home');
  };
  return (
    <div className="h-16 bg-white shadow-2xl shadow-black flex items-center pr-20 ">
      <div>
        <img src={logo} alt="logo" className="object-cover h-60 mx-0" />
      </div>
      <div className=" w-px h-10" style={{ background: '#5A4AE3' }}></div>
      <div className="text-black hover:text-indigo-500 font-medium pl-6 p-3 cursor-pointer">
        Home
      </div>
      <div className="w-fit flex items-center">
        <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
          Clinic
        </div>
        <img
          alt="drop down"
          src={dropdownarrow}
          className="object-cover h-5 mx-0 text-indigo-500 cursor-pointer"
        />
      </div>
      <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
        About Us
      </div>
      {!props.props.isDoctor ? (
        <div
          onClick={() => handleBooking()}
          className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer"
        >
          Booking Now
        </div>
      ) : (
        <></>
      )}
      <div className="ml-auto order-2 flex items-center">
        {props.props.isDoctor ? (
          <>
            <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
              Hi,{props.props.userInfo.Doctor_firstName}
            </div>
            <div
              onClick={() => handleLogout()}
              className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer"
            >
              Logout
            </div>
          </>
        ) : props.props.isPatient ? (
          <>
            <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
              Hi,{props.props.userInfo.Patient_firstName}
            </div>
            <div
              onClick={() => handleLogout()}
              className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer"
            >
              Logout
            </div>
          </>
        ) : (
          <>
            <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
              <button onClick={() => navigate('/login')}>Login</button>
            </div>
            <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
              <button onClick={() => navigate('/register')}>Sign in</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
