import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleRegisterForm } from '../service/userService';
import background from '../asset/login.jpg';
import background2 from '../asset/login-background2.jpg';
import {
  doctorLoginSuccess,
  patientLoginSuccess,
  processLogout,
} from '../store/action/userAction';
import handleLoginForm from '../service/userService';
import { Navigate, useNavigate } from 'react-router-dom';

const IsLogSignIn = (props) => {
  if (props.isDoctor || props.isPatient) {
    return <Navigate replace to="/home" />;
  } else return <LoginSignIn {...props} />;
};

const LoginSignIn = (props) => {
  let state = useLocation();
  const [isSignIn, setIsSignIn] = useState(state.state.state);
  const [logErr, setLogErr] = useState();
  const navigate = useNavigate();
  //login

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
      } else {
        setLogErr(data.message);
        console.log(logErr);
      }
    } catch (e) {
      setLogErr('Please fill all fields');
      console.log(e);
    }

    //NOTE: In this app we dont use any security method for login data, instead we will store login data directly inside the local storage
  };

  //sign in
  const [term, setTerm] = useState(false);
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
        navigate('/home');
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
      <div>
        <div
          className={
            term
              ? 'h-screen w-screen fixed z-10 transform-all ease-in-out'
              : 'h-screen w-screen fixed z-10 hidden transform-all ease-in-out'
          }
          onClick={() => setTerm(false)}
        >
          <div
            className={
              term
                ? 'p-6 pt-12 fixed bg-white shadow-black shadow-2xl h-3/4 w-auto aspect-square top-20 rounded-lg left-1/3 opacity-100 transition-all ease-in-out'
                : 'p-6 pt-12 fixed bg-white shadow-black shadow-2xl h-3/4 w-auto aspect-square top-20 rounded-lg left-1/3 opacity-0 transition-all ease-in-out'
            }
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-2xl pb-6">Term & Privacy Policy</h1>
            <div className="overflow-auto h-3/4">
              {' '}
              The Hello lorem ispun. At vero eos et accusamus et iusto odio
              dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias excepturi sint
              occaecati cupiditate non provident, similique sunt in culpa qui
              officia deserunt mollitia animi, id est laborum et dolorum fuga.
              Et harum quidem rerum facilis est et expedita distinctio. Nam
              libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime placeat facere possimus, omnis
              voluptas assumenda est, omnis dolor repellendus. Temporibus autem
              quibusdam et aut officiis debitis aut rerum necessitatibus saepe
              eveniet ut et voluptates repudiandae sint et molestiae non
              recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut
              aut reiciendis voluptatibus maiores alias consequatur aut
              perferendis doloribus asperiores repellat. At vero eos et
              accusamus et iusto odio dignissimos ducimus qui blanditiis
              praesentium voluptatum deleniti atque corrupti quos dolores et
              quas molestias excepturi sint occaecati cupiditate non provident,
              similique sunt in culpa qui officia deserunt mollitia animi, id
              est laborum et dolorum fuga. Et harum quidem rerum facilis est et
              expedita distinctio. Nam libero tempore, cum soluta nobis est
              eligendi optio cumque nihil impedit quo minus id quod maxime
              placeat facere possimus, omnis voluptas assumenda est, omnis dolor
              repellendus. Temporibus autem quibusdam et aut officiis debitis
              aut rerum necessitatibus saepe eveniet ut et voluptates
              repudiandae sint et molestiae non recusandae. Itaque earum rerum
              hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus
              maiores alias consequatur aut perferendis doloribus asperiores
              repellat
            </div>
          </div>
        </div>

        <div
          className={
            term
              ? 'shadow-black shadow-2xl relative h-screen w-screen blur-sm transition-all ease-in-out'
              : 'shadow-black shadow-2xl relative h-screen w-screen ease-in-out transition-all '
          }
        >
          <img
            alt="background"
            src={isSignIn ? background : background2}
            className={
              isSignIn
                ? ' fixed h-3/4 w-1/3 object-cover right-1/2 top-1/2  -translate-y-1/2 rounded-l-xl shadow-black drop-shadow-2xl'
                : ' fixed h-3/4 w-1/3 object-cover left-1/2 top-1/2  -translate-y-1/2 rounded-r-xl shadow-black drop-shadow-2xl'
            }
          />
          <div
            className={
              isSignIn
                ? ' bg-white p-12 transition-all ease-in-out left-1/2 top-1/2  -translate-y-1/2 fixed h-3/4 w-1/3 rounded-r-xl shadow-black drop-shadow-2xl'
                : ' bg-white p-12 transition-all ease-in-out right-1/2 top-1/2  -translate-y-1/2 fixed h-3/4 w-1/3 rounded-l-xl shadow-black drop-shadow-2xl'
            }
          >
            <div className={isSignIn ? 'visible' : 'hidden'}>
              <h1 className="mx-auto font- text-center text-indigo-600 font-sans text-3xl font-bold font-capitalize subpixel-antialiased">
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
                          setFormData({
                            ...FormData,
                            firstName: e.target.value,
                          })
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
                          setFormData({
                            ...FormData,
                            lastName: e.target.value,
                          })
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
                      setFormData({
                        ...FormData,
                        phoneNumber: e.target.value,
                      })
                    }
                    value={FormData.phoneNumber}
                  />
                  <div className="flex items-center">
                    <input type="checkbox" className="align-middle mt-1 mr-1" />
                    <p className="text-xs block">
                      By clicking this, you agree to our{' '}
                      <span
                        className="hover:cursor-pointer hover:text-indigo-600 font-medium"
                        onClick={() => {
                          setTerm(true);
                        }}
                      >
                        terms of services
                      </span>{' '}
                      and
                      <span
                        className="hover:cursor-pointer hover:text-indigo-600 font-medium"
                        onClick={() => {
                          setTerm(true);
                        }}
                      >
                        {' '}
                        privacy policy
                      </span>
                    </p>
                  </div>
                  <div>
                    <button
                      className="font-medium text-white mx-auto mt-3 w-full px-3 py-2 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded shadow-md text-center "
                      onClick={(e) => handleRegister(e)}
                    >
                      Sign In
                    </button>
                  </div>

                  <div style={{ color: 'red' }}>{err.message}</div>
                  <div className="text-left mx-auto text-gray-600 text-sm ">
                    Already have account?{' '}
                    <span
                      className="hover:text-indigo-400 cursor-pointer font-semibold"
                      onClick={(e) => {
                        setIsSignIn(false);
                        setErr({ ...err, message: '' });
                      }}
                    >
                      Click here
                    </span>
                  </div>
                </form>
              </div>
            </div>
            <div
              className={
                isSignIn ? 'hidden' : 'visible justify-center align-middle'
              }
            >
              <h1 className="mx-auto text-center text-indigo-600 font-sans text-3xl font-bold font-capitalize subpixel-antialiase mb-20">
                Log In
              </h1>
              <form>
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
                  Log In
                </button>
                <div style={{ color: 'red' }}>{logErr}</div>
                <div className="text-right mx-auto text-gray-600 text-sm ">
                  Dont have a account?{' '}
                  <span
                    className="font-semibold hover:text-indigo-400 cursor-pointer"
                    onClick={(e) => {
                      setIsSignIn(true);
                      setLogErr('');
                    }}
                  >
                    Sign up
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(IsLogSignIn);
