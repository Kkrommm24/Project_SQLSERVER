import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../axios';
import Loading from '../Loading';
import { connect } from 'react-redux';
import { processLogout } from '../../store/action/userAction';
import error from '../../asset/error.png';

const Profile = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState('');
  const [data, setData] = useState({});
  const [book, setBook] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      let sessionId = await axios.get('/api/get-session');
      let userId = props.userInfo.id;
      console.log('user', userId);
      console.log('session', sessionId);
      if (userId !== sessionId) {
        navigate(-1, { replace: true }); //go back to previous page
      } else {
        let userProfile = await axios.get(
          '/api/profile/' +
            (props.isDoctor ? 'doctor/' : 'patient/') +
            props.userInfo.id
        ); //assume that we dont have anybody try fetch data with 3rd party such as postman
        let bookingData = await axios.get(
          '/api/booking/' +
            (props.isDoctor ? 'doctor/' : 'patient/') +
            props.userInfo.id
        );
        console.log(bookingData.data);

        return [userProfile, bookingData];
      }
    };
    fetchUser()
      .then((userProfile) => {
        setData(userProfile[0].data);
        setBook(userProfile[1].data);
      })
      .then(() => setIsLoading(false))
      .catch((e) => {
        setIsLoading(true);
        setErr(e.message);
      });
  }, [location.pathname]);
  return (
    <>
      {isLoading ? (
        <div>
          <div
            className={
              err
                ? 'error flex bg-red-600  items-center absolute w-screen h-14 p-0  text-white overflow-hidden  '
                : 'error flex bg-red-600  items-center absolute w-screen h-0 p-0   text-white overflow-hidden '
            }
          >
            <img
              src={error}
              className="h-8 mx-3 border-solid border-4 rounded-full"
              alt="logo"
            />
            An error occured. {err}
          </div>
          <Loading />
        </div>
      ) : (
        <div className="h-max w-screen items-center bg-indigo-50 absolute">
          <div className="m-20 shadow-md rounded-2xl h-max w-5/6 rig bg-white p-20 mx-auto relative overflow-auto">
            <div className=" shadow-md rounded-2xl h-max w-full opacity-30 rig bg-slate-600 p-20 mx-auto top-1 -left-2 -z-10 absolute"></div>
            <h1 className="mt-10 mb-5 text-gray-900 text-5xl font-bold">
              {props.isDoctor ? data.Doctor_firstName : data.Patient_firstName}
              's Profile
            </h1>
            <div className="text-indigo-600 font-semibold mb-3 text-3xl">
              Information
            </div>
            <div className="grid grid-cols-2">
              <p>
                <span>Name: </span>{' '}
                {props.isDoctor
                  ? data.Doctor_firstName + ' ' + data.Doctor_lastName
                  : data.Patient_firstName + ' ' + data.Patient_lastName}
              </p>
              <p>
                <span>Email: </span>
                {data.email}
              </p>
              <p>
                <span>Age: </span>
                {props.isDoctor ? data.Doctor_age : data.Patient_age}
              </p>
              <p>
                <span>Phone Number: </span>
                {props.isDoctor
                  ? data.Doctor_phoneNumber
                  : data.Patient_phoneNumber}
              </p>
              <p className="col-span-2">
                <span>Address: </span>
                {props.isDoctor ? data.Doctor_address : data.Patient_address}
              </p>
            </div>
          </div>
          <div className="m-20 shadow-md rounded-2xl h-max w-5/6 rig bg-white p-5 mx-auto relative overflow-auto">
            <div className=" shadow-md rounded-2xl h-max w-full opacity-30 rig bg-slate-600 p-20 mx-auto top-1 -left-2 -z-10 absolute"></div>
            <div className=" font-semibold text-indigo-600 text-2xl">
              My Booking
            </div>

            {props.isDoctor ? (
              <table></table>
            ) : (
              <table className="m-auto w-full">
                {' '}
                <tr>
                  <th>Clinic</th>
                  <th>Doctor</th>
                  <th>Address</th>
                  <th>Issue</th>
                  <th>Date</th>
                </tr>
                {book.map((data) => (
                  <tr className="p-10">
                    <td className="w-max p-2 border-collapse border-spacing-y-px border-gray-950">
                      {data.Clinic_name}
                    </td>
                    <td className="w-max p-2 border-collapse border-spacing-y-px border-gray-950">
                      {data.Doctor_firstName} {data.Doctor_lastName}
                    </td>
                    <td className="w-max p-2">{data.Clinic_address}</td>
                    <td className="w-max p-2">
                      {data.time} {data.date}
                    </td>
                    <td className="w-max p-2">{data.status}</td>
                    <td>
                      <button> Click me</button>
                    </td>
                  </tr>
                ))}
              </table>
            )}
          </div>
        </div>
      )}
    </>
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
    processLogout: () => dispatch(processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
