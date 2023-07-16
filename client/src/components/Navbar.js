import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../asset/logo.png';
import dropdownarrow from '../asset/arrow.png';
import { Link } from 'react-router-dom';
import { LogOut } from '../service/userService';
export const Navbar = (props) => {
  //check user role then render
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  const [navDropDown, setNavDropDown] = useState(false);

  const handleLogout = async () => {
    console.log('logged out');
    await LogOut(props.props.userInfo.id)
      .then(props.props.processLogout())
      .then(navigate('/home'));
  };
  return (
    <div className="h-16 bg-white shadow-2xl flex items-center pr-14 w-screen">
      <div>
        <img src={logo} alt="logo" className="object-cover h-60 mx-0" />
      </div>
      <div className=" w-px h-10" style={{ background: '#5A4AE3' }}></div>
      <div
        onClick={() => navigate('/home')}
        className="text-black hover:text-indigo-500 font-medium pl-6 p-3 cursor-pointer"
      >
        Trang chủ
      </div>
      <div
        className="w-fit flex items-center  cursor-pointer py-3 relative"
        onMouseOver={() => setNavDropDown(true)}
        onMouseOut={() => setNavDropDown(false)}
      >
        <div className="text-black hover:text-indigo-500 font-medium p-3 h-full ">
          Chuyên Khoa
        </div>
        <img
          alt="drop down"
          src={dropdownarrow}
          className="object-cover h-5 mx-0 hover:text-indigo-500 cursor-pointer"
        />
        <div
          className={
            navDropDown
              ? 'absolute top-16 shadow-md pl-4 pr-8 z-10 bg-white p-3 grid w-max gap-4'
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
      <Link to="/about-us">
        <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
          Về chúng tôi
        </div>
      </Link>
      <Link to="/clinics">
        <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
          Cơ sở khám bệnh
        </div>
      </Link>
      {!props.props.isDoctor ? (
        <Link
          to={props.props.isPatient ? '/booking' : '/login-signin'}
          state={{ state: false }}
        >
          <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
            Đặt khám ngay
          </div>
        </Link>
      ) : (
        <></>
      )}
      <div className="ml-auto order-2 flex items-center">
        {props.props.isDoctor ? (
          <>
            <div
              className="flex h-16 w-fit justify-center items-center"
              onMouseOver={() => setProfile(true)}
              onMouseOut={() => setProfile(false)}
            >
              <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer relative">
                Xin chào,Dr. {props.props.userInfo.Doctor_firstName}
              </div>

              <div
                className={
                  profile
                    ? 'absolute right-10 top-16 shadow-md p-4 pl-8 pr-8 z-10 bg-white  grid w-max gap-4'
                    : 'absolute  z-10 bg-white p-3 grid-cols-2 gap-4 hidden'
                }
              >
                <Link to="/user/profile">
                  <div className="w-full hover:text-indigo-500 cursor-pointer text-right">
                    Hồ sơ của bạn
                  </div>
                </Link>
                <Link to="/user/change-password">
                  <div className="w-full hover:text-indigo-500 cursor-pointer text-right">
                    Đổi mật khẩu
                  </div>
                </Link>
                <div className="h-px w-full bg-gray-300 float-right"></div>
                <div
                  className="w-full hover:text-red-500 cursor-pointer text-right"
                  onClick={() => handleLogout()}
                >
                  Đăng xuất
                </div>
              </div>
            </div>
          </>
        ) : props.props.isPatient ? (
          <>
            <div
              className="flex h-16 w-fit justify-center items-center"
              onMouseOver={() => setProfile(true)}
              onMouseOut={() => setProfile(false)}
            >
              <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer relative">
                Xin chào, {props.props.userInfo.Patient_firstName}
              </div>

              <div
                className={
                  profile
                    ? 'absolute right-10 top-16 shadow-md p-4 pl-8 pr-8 z-10 bg-white  grid w-max gap-4'
                    : 'absolute  z-10 bg-white p-3 grid-cols-2 gap-4 hidden'
                }
              >
                <Link to="/user/profile">
                  <div className="w-full hover:text-indigo-500 cursor-pointer text-right">
                    Hồ sơ của bạn
                  </div>
                </Link>
                <Link to="/user/change-password">
                  <div className="w-full hover:text-indigo-500 cursor-pointer text-right">
                    Đổi mật khẩu
                  </div>
                </Link>
                <div className="h-px w-full bg-gray-300 float-right"></div>
                <div
                  className="w-full hover:text-red-500 cursor-pointer text-right"
                  onClick={() => handleLogout()}
                >
                  Đăng xuất
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login-signin" state={{ state: false }}>
              <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
                Đăng nhập
              </div>
            </Link>
            <Link to="/login-signin" state={{ state: true }}>
              <div className="text-black hover:text-indigo-500 font-medium p-3 cursor-pointer">
                Đăng ký
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
