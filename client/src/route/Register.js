import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleRegisterForm } from '../service/userService';
import background from '../asset/login.jpg';
const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState({
    errCode: '',
    message: '',
  });
  const [FormData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    age: 0,
    gender: 1,
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(FormData);
    if (
      FormData.email &&
      FormData.password &&
      FormData.firstName &&
      FormData.lastName &&
      FormData.address &&
      FormData.phoneNumber &&
      FormData.age !== 0
    ) {
      let result = await handleRegisterForm(FormData);
      if (result.errCode === 0) {
        setErr({ errCode: '' });
        console.log('register successful!');
        navigate('/login');
      } else {
        console.log('Nah not create any yet');
        setErr({ errCode: result.errCode, message: result.message });
      }
    } else {
      setErr({ message: 'Please fill all fields!' });
    }
  };
  return (
    <div className="relative h-screen w-screen bg-violet-200">
      <div className="shadow-black shadow-2xl rounded-sm">
        <img
          alt="background"
          src={background}
          className=" fixed h-3/4 w-1/3 object-cover right-1/2 top-1/2  -translate-y-1/2"
        />
        <div className=" bg-white p-12 left-1/2 top-1/2  -translate-y-1/2 fixed h-3/4 w-1/3">
          <h1 className="mx-auto pb-5 font- text-center text-indigo-600 font-sans text-3xl font-bold font-capitalize subpixel-antialiased">
            Sign In
          </h1>
          <div>
            <form>
              <label>
                <p>Email</p>
              </label>
              <input
                className="shadow-inner p-1 w-full bg-slate-100 rounded"
                required
                type="email"
                name="email"
                onChange={(e) =>
                  setFormData({ ...FormData, email: e.target.value })
                }
                value={FormData.email}
              />
              <label>
                <p>Password</p>
              </label>
              <input
                required
                className="shadow-inner bg-slate-100 rounded p-1 w-full"
                type="password"
                name="password"
                onChange={(e) =>
                  setFormData({ ...FormData, password: e.target.value })
                }
                value={FormData.password}
              />
              <div className=" grid grid-cols-2 gap-3">
                <div>
                  <label>
                    <p>First Name</p>
                  </label>
                  <input
                    required
                    className="shadow-inner p-1 w-full bg-slate-100 rounded"
                    type="text"
                    name="firstName"
                    onChange={(e) =>
                      setFormData({ ...FormData, firstName: e.target.value })
                    }
                    value={FormData.firstName}
                  />
                </div>
                <div>
                  <label>
                    <p>Last Name</p>
                  </label>
                  <input
                    required
                    className="shadow-inner p-1 w-full bg-slate-100 rounded"
                    type="text"
                    name="lastName"
                    onChange={(e) =>
                      setFormData({ ...FormData, lastName: e.target.value })
                    }
                    value={FormData.lastName}
                  />
                </div>
                <div className="grid grid-cols-2">
                  <label>Gender</label>
                  <select
                    required
                    className="shadow-inner p-1 bg-slate-100 rounded"
                    type="text"
                    name="Gender"
                    onChange={(e) => {
                      setFormData({
                        ...FormData,
                        gender: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-2">
                  <label>Age</label>
                  <input
                    type="number"
                    name="Age"
                    required
                    className="shadow-inner p-1 bg-slate-100 rounded"
                    min={0}
                    max={120}
                    onChange={(e) =>
                      setFormData({ ...FormData, age: e.target.value })
                    }
                    value={FormData.age}
                  />
                </div>
              </div>
              <label>
                <p>Address</p>
              </label>
              <input
                type="text"
                name="Address"
                required
                className="shadow-inner p-1 bg-slate-100 rounded w-full"
                onChange={(e) =>
                  setFormData({ ...FormData, address: e.target.value })
                }
              />
              <label>
                <p>Phone Number</p>
              </label>
              <input
                type="text"
                className="shadow-inner bg-slate-100 rounded p-1 w-full"
                required
                name="phoneNumber"
                onChange={(e) =>
                  setFormData({ ...FormData, phoneNumber: e.target.value })
                }
                value={FormData.phoneNumber}
              />
              <div>
                <button
                  className="font-medium text-white mx-auto mt-3 w-full px-3 py-2 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded shadow-md text-center "
                  onClick={(e) => handleRegister(e)}
                >
                  Sign In
                </button>
              </div>
              <div style={{ color: 'red' }}>{err.message}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
