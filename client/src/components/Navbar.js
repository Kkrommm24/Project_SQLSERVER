import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../asset/logo.png';
import dropdownarrow from '../asset/arrow.png';
import { Link } from 'react-router-dom';
export const Navbar = (props) => {
  console.log(props);
  //check user role then render
  const navigate = useNavigate();
  const [navDropDown, setNavDropDown] = useState(false);
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
      <div
        className="w-fit flex items-center  cursor-pointer py-3 relative"
        onMouseOver={() => setNavDropDown(true)}
        onMouseOut={() => setNavDropDown(false)}
      >
        <div className="text-black hover:text-indigo-500 font-medium p-3 h-full ">
          Specialization
        </div>
        <img
          alt="drop down"
          src={dropdownarrow}
          className="object-cover h-5 mx-0 hover:text-indigo-500 cursor-pointer"
        />
        <div
          className={
            navDropDown
              ? 'absolute top-16 shadow-md pl-4 pr-8 z-10 bg-white p-3 grid-cols-2 grid w-max gap-4'
              : 'absolute  z-10 bg-white p-3 grid-cols-2 gap-4 hidden'
          }
        >
          {props.data.map((data) => (
            <div className="w-max hover:text-indigo-500 cursor-pointer">
              {data.Specialization_name}
            </div>
          ))}
        </div>
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
            <Link to="/login-signin" state={{ state: false }}>
              <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
                Login
              </div>
            </Link>
            <Link to="/login-signin" state={{ state: true }}>
              <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
                Sign in
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
