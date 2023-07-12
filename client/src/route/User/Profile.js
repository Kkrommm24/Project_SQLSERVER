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
  const [reload, setReload] = useState(false);
  const [collapse, setCollapse] = useState(-1);
  const [desc, setDesc] = useState('');
  const [history, setHistory] = useState([]);
  const [detail, setDetail] = useState(-1);
  const [collapse2, setCollapse2] = useState(-1);
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
        console.log('booking data:', bookingData.data);

        let history = await axios.get(
          '/api/history/' +
            (props.isDoctor ? 'doctor/' : 'patient/') +
            props.userInfo.id
        );
        return [userProfile, bookingData, history];
      }
    };
    fetchUser()
      .then((userProfile) => {
        setData(userProfile[0].data);
        setBook(userProfile[1].data);
        setHistory(userProfile[2].data);
        setTimeout(() => {
          console.log('history state:', history);
        }, 500);
      })
      .then(() => setIsLoading(false))
      .catch((e) => {
        setIsLoading(true);
        setErr(e.message);
      });
  }, [location.pathname, reload]);
  const handleCancel = async (data) => {
    setReload(!reload);
    let processCancel = await axios.post('/api/user/booking/cancel', {
      BookingId: data.id,
      History_description: desc,
    });

    console.log(processCancel);
  };
  const handleConfirm = async (data) => {
    let processConfirm = await axios.post('/api/user/booking/confirm', {
      BookingId: data.id,
    });
    setReload(!reload);
  };
  const handleDone = async (data) => {
    let processDone = await axios.post('/api/user/booking/done', {
      BookingId: data.id,
      History_description: desc,
    });
    setReload(!reload);
  };
  // const clearHistory = async () => {
  //   let processClear = await axios.post(
  //     '/api/clear-history/' +
  //       (props.isDoctor ? 'doctor/' : 'patient/') +
  //       props.userInfo.id
  //   );
  //   setReload(!reload);
  //   console.log(processClear);
  // }; in progress
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
              {props.isDoctor ? (
                <>
                  <p>
                    <span>Work Place: </span>
                    {data.Clinic_address}
                  </p>
                  <p>
                    <span>Specialty: </span>
                    {data.Specialization_name}
                  </p>
                </>
              ) : null}
            </div>
          </div>

          {/* 
----------------------------------------------------------------------------------------------------------------------------------------------------
BOOKING TABLE
----------------------------------------------------------------------------------------------------------------------------------------------------


*/}
          <div className="m-20 shadow-md rounded-2xl h-max w-5/6 rig bg-white p-5 mx-auto relative ">
            <div className=" shadow-md rounded-2xl h-max w-full opacity-30 rig bg-slate-600 p-20 mx-auto top-1 -left-2 -z-10 absolute"></div>
            <div className=" font-semibold text-indigo-600 text-2xl">
              My Booking
            </div>

            {props.isDoctor ? (
              book.message ? (
                <>
                  <div className="mt-3">{book.message}</div>
                </>
              ) : (
                <table className="m-auto w-full">
                  {' '}
                  <tr className="text-left">
                    <th className="p-2">Clinic</th>
                    <th className="p-2">Patient</th>
                    <th className="p-2">Address</th>
                    <th className="p-2">Date</th>
                    <th className="p-2 text-center">Status</th>
                    <th className="p-2 text-center ">
                      {' '}
                      <p className="w-20"></p>
                    </th>
                    <th className="p-2 text-center ">
                      {' '}
                      <p className="w-20"></p>
                    </th>
                  </tr>
                  {book.map((data, index) => (
                    <>
                      <tr className="p-10">
                        <td className="w-max p-2 border-collapse border-spacing-y-px border-gray-950">
                          {data.Clinic_name}
                        </td>
                        <td className="w-max p-2 border-collapse border-spacing-y-px border-gray-950">
                          {data.Patient_lastName} {data.Patient_firstName}
                        </td>
                        <td className="w-max p-2">{data.Clinic_address}</td>
                        <td className="w-max p-2">
                          {data.time} {data.date}
                        </td>
                        <td
                          className={
                            data.StatusId === 7
                              ? 'bg-red-500 rounded-2xl text-center text-white'
                              : data.StatusId === 6
                              ? 'bg-green-500 rounded-2xl text-center text-white'
                              : data.StatusId === 5
                              ? 'bg-blue-500 rounded-2xl text-center text-white'
                              : 'bg-yellow-500 rounded-2xl text-center text-white'
                          }
                        >
                          {data.status}
                        </td>
                        <td className="h-full">
                          {data.StatusId === 4 ? (
                            <div
                              className="cursor-pointer bg-blue-500 rounded-2xl text-center text-white w-fit"
                              onClick={() => handleConfirm(data)}
                            >
                              Confirm
                            </div>
                          ) : data.StatusId === 5 ? (
                            <div
                              className="cursor-pointer bg-green-500 rounded-2xl text-center text-white h-full"
                              onClick={() => {
                                console.log(data.StatusId);
                                setCollapse2(index);
                                setCollapse(-1);
                              }}
                            >
                              Done
                            </div>
                          ) : null}
                        </td>
                        <td>
                          {data.StatusId !== 7 && data.StatusId !== 6 ? (
                            <button
                              className="bg-red-500 rounded-2xl text-center text-white cursor-pointer"
                              onClick={() => {
                                console.log(data.StatusId);
                                setCollapse(index);
                                setCollapse2(-1);
                              }}
                            >
                              {' '}
                              Cancel
                            </button>
                          ) : null}
                        </td>
                      </tr>
                      {/* CANCELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL */}
                      <tr
                        onBlur={() =>
                          setTimeout(() => {
                            setCollapse(-1);
                          }, 150)
                        }
                      >
                        <td
                          className={
                            collapse === index
                              ? ' transition-all ease-in-out w-full align-top h-32'
                              : ' transition-all ease-in-out w-full align-top h-0 overflow-auto'
                          }
                          colSpan={7}
                        >
                          <textarea
                            placeholder="Cancel description"
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            className={
                              collapse === index
                                ? 'transition-all ease-in-out w-full resize-none'
                                : ' transition-all ease-in-out w-full hidden'
                            }
                            rows="5"
                          ></textarea>
                          <div className="mx-auto w-fit">
                            <button
                              className={
                                collapse === index
                                  ? 'transition-all ease-in-out w-max p-1 px-3 rounded-xl bg-indigo-300 hover:bg-indigo-500'
                                  : ' transition-all ease-in-out  w-max hidden'
                              }
                              onClick={() => {
                                setCollapse(-1);
                                console.log('handled before get out');
                                handleCancel(data);
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/* CANCELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL */}
                      {/*DONEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
                      {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
                      <tr
                        onBlur={() =>
                          setTimeout(() => {
                            setCollapse2(-1);
                          }, 150)
                        }
                      >
                        <td
                          className={
                            collapse2 === index
                              ? ' transition-all ease-in-out w-full align-top h-32'
                              : ' transition-all ease-in-out w-full align-top h-0 overflow-auto'
                          }
                          colSpan={7}
                        >
                          <textarea
                            placeholder="Done description"
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            className={
                              collapse2 === index
                                ? 'transition-all ease-in-out w-full resize-none'
                                : ' transition-all ease-in-out w-full hidden'
                            }
                            rows="5"
                          ></textarea>
                          <div className="mx-auto w-fit">
                            <button
                              className={
                                collapse2 === index
                                  ? 'transition-all ease-in-out w-max p-1 px-3 rounded-xl bg-indigo-300 hover:bg-indigo-500'
                                  : ' transition-all ease-in-out  w-max hidden'
                              }
                              onClick={() => {
                                setCollapse2(-1);
                                console.log('handled before get out');
                                handleDone(data);
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/*DONEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
                      {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
                    </>
                  ))}
                </table>
              )
            ) : book.message ? (
              <>
                <div className="mt-3">{book.message}</div>
              </>
            ) : (
              // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE
              // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE
              // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE // PATIENT SIDE
              <table className="m-auto w-full">
                {' '}
                <tr className="text-left">
                  <th className="p-2">Clinic</th>
                  <th className="p-2">Doctor</th>
                  <th className="p-2">Address</th>
                  <th className="p-2">Date</th>
                  <th className="p-2 text-center">Status</th>
                </tr>
                {book.map((data, index) => (
                  <>
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
                      <td
                        className={
                          data.StatusId === 7
                            ? 'bg-red-500 rounded-2xl text-center text-white'
                            : data.StatusId === 6
                            ? 'bg-green-500 rounded-2xl text-center text-white'
                            : data.StatusId === 5
                            ? 'bg-blue-500 rounded-2xl text-center text-white'
                            : 'bg-yellow-500 rounded-2xl text-center text-white'
                        }
                      >
                        {data.status}
                      </td>
                      <td>
                        {data.StatusId !== 7 && data.StatusId !== 6 ? (
                          <button
                            onClick={() => {
                              console.log(data.StatusId);
                              setCollapse(index);
                            }}
                          >
                            {' '}
                            Cancel
                          </button>
                        ) : null}
                      </td>
                    </tr>
                    <tr
                      onBlur={() =>
                        setTimeout(() => {
                          setCollapse(-1);
                        }, 150)
                      }
                    >
                      <td
                        className={
                          collapse === index
                            ? ' transition-all ease-in-out w-full align-top h-32'
                            : ' transition-all ease-in-out w-full align-top h-0 overflow-auto'
                        }
                        colSpan={5}
                      >
                        <textarea
                          placeholder="Cancel description"
                          onChange={(e) => setDesc(e.target.value)}
                          value={desc}
                          className={
                            collapse === index
                              ? 'transition-all ease-in-out w-full resize-none'
                              : ' transition-all ease-in-out w-full hidden'
                          }
                          rows="5"
                        ></textarea>
                        <div className="mx-auto w-fit">
                          <button
                            className={
                              collapse === index
                                ? 'transition-all ease-in-out w-max p-1 px-3 rounded-xl bg-indigo-300 hover:bg-indigo-500'
                                : ' transition-all ease-in-out  w-max hidden'
                            }
                            onClick={() => {
                              setCollapse(-1);
                              console.log('handled before get out');
                              handleCancel(data);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </table>
            )}
          </div>

          {/* 
----------------------------------------------------------------------------------------------------------------------------------------------------
HISTORY TABLE
----------------------------------------------------------------------------------------------------------------------------------------------------


*/}
          <div className="m-20 shadow-md rounded-2xl h-max w-5/6 rig bg-white p-5 mx-auto relative ">
            <div className=" shadow-md rounded-2xl h-max w-full opacity-30 rig bg-slate-600 p-20 mx-auto top-1 -left-2 -z-10 absolute"></div>
            <div className=" font-semibold text-indigo-600 text-2xl">
              History{' '}
              <span
                className="float-right text-xs text-gray-600 hover:text-red-500 mt-1 cursor-pointer underline"
                //onClick={() => clearHistory()}
              >
                Clear history
              </span>
            </div>
            {props.isDoctor ? (
              history.message ? (
                <>
                  <div className="mt-3">{history.message}</div>
                </>
              ) : (
                <table className="m-auto w-full">
                  <tr className="text-left">
                    <th className="p-2">Patient</th>
                    <th className="p-2">Department</th>
                    <th className="p-2">Address</th>
                    <th className="p-2">Date</th>
                    <th className="p-2 text-center">Status</th>
                    <th className="w-24"></th>
                  </tr>
                  {history.map((data, index) => (
                    <>
                      <tr className="p-10">
                        <td className="w-max p-2 ">
                          {data.Patient_firstName} {data.Patient_lastName}
                        </td>
                        <td className="w-max p-2 ">{data.Clinic_name}</td>
                        <td className="w-max p-2">{data.Clinic_address}</td>
                        <td className="w-max p-2">{data.date}</td>
                        <td
                          className={
                            data.status === 'Canceled'
                              ? 'bg-red-500 rounded-2xl text-center text-white w-24'
                              : 'bg-green-500 rounded-2xl text-center text-white w-24'
                          }
                        >
                          {data.status}
                        </td>
                        <td className=" text-center cursor-pointer ">
                          {' '}
                          <p
                            className="underline text-gray-600 cursor-pointer w-24 "
                            onClick={() => {
                              if (detail === -1) setDetail(index);
                              else setDetail(-1);
                            }}
                          >
                            View Detail
                          </p>
                        </td>
                      </tr>
                      <tr
                        onBlur={() =>
                          setTimeout(() => {
                            setCollapse(-1);
                          }, 150)
                        }
                      >
                        <td
                          className={
                            detail === index
                              ? ' transition-all ease-in-out w-full align-top h-32'
                              : ' transition-all ease-in-out w-full align-top h-0 overflow-auto'
                          }
                          colSpan={5}
                        >
                          <div
                            className={
                              detail === index
                                ? 'transition-all ease-in-out w-full resize-none px-3'
                                : ' transition-all ease-in-out w-full hidden'
                            }
                          >
                            <p className="text-xl font-semibold">Description</p>
                            {data.History_description}
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </table>
              )
            ) : //PATIENT SIDE//PATIENT SIDE //PATIENT SIDE //PATIENT SIDE //PATIENT SIDE //PATIENT SIDE
            //PATIENT SIDE //PATIENT SIDE //PATIENT SIDE //PATIENT SIDE //PATIENT SIDE //PATIENT SIDE
            history.message ? (
              <>
                <div className="mt-3">{history.message}</div>
              </>
            ) : (
              <table className="m-auto w-full">
                {' '}
                <tr className="text-left">
                  <th className="p-2">Clinic</th>
                  <th className="p-2">Doctor</th>
                  <th className="p-2">Date</th>
                  <th className="p-2 text-center">Status</th>
                  <th className="p-2 text-center"></th>
                </tr>
                {history.map((data, index) => (
                  <>
                    <tr className="p-10">
                      <td className="w-max p-2 border-collapse border-spacing-y-px border-gray-950">
                        {data.Clinic_name}
                      </td>
                      <td className="w-max p-2 border-collapse border-spacing-y-px border-gray-950">
                        {data.Doctor_firstName} {data.Doctor_lastName}
                      </td>
                      <td className="w-max p-2">
                        {data.time} {data.date}
                      </td>
                      <td
                        className={
                          data.status === 'Canceled'
                            ? 'bg-red-500 rounded-2xl text-center text-white w-24'
                            : 'bg-green-500 rounded-2xl text-center text-white w-24'
                        }
                      >
                        {data.status}
                      </td>
                      <td className=" text-center cursor-pointer ">
                        {' '}
                        <p
                          className="underline text-gray-600 cursor-pointer"
                          onClick={() => {
                            if (detail === -1) setDetail(index);
                            else setDetail(-1);
                          }}
                        >
                          View Detail
                        </p>
                      </td>
                    </tr>
                    <tr
                      onBlur={() =>
                        setTimeout(() => {
                          setCollapse(-1);
                        }, 150)
                      }
                    >
                      <td
                        className={
                          detail === index
                            ? ' transition-all ease-in-out w-full align-top h-32'
                            : ' transition-all ease-in-out w-full align-top h-0 overflow-auto'
                        }
                        colSpan={5}
                      >
                        <div
                          className={
                            detail === index
                              ? 'transition-all ease-in-out w-full resize-none px-3'
                              : ' transition-all ease-in-out w-full hidden'
                          }
                        >
                          <p className="text-xl font-semibold">Description</p>
                          {data.History_description}
                        </div>
                      </td>
                    </tr>
                  </>
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
