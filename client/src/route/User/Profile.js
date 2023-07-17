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
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});
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
  const handleEdit = async (data) => {
    let editProfile = await axios.put(
      '/api/edit-' + (props.isDoctor ? 'doctor' : 'patient'),
      editData
    );
    setEdit(false);
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
              Information{' '}
              {props.isDoctor ? (
                <span
                  className=" text-sm text-gray-500 underline hover:text-indigo-400 cursor-pointer float-right"
                  onClick={() => {
                    setEdit(true);
                    setEditData({
                      firstName: data.Doctor_firstName,
                      lastName: data.Doctor_lastName,
                      age: data.Doctor_age,
                      gender: data.Doctor_gender,
                      phoneNumber: data.Doctor_phoneNumber,
                      address: data.Doctor_address,
                    });
                  }}
                >
                  Edit Profile
                </span>
              ) : (
                <span
                  className=" text-sm text-gray-500 underline hover:text-indigo-400 cursor-pointer float-right"
                  onClick={() => {
                    setEdit(true);
                    setEditData({
                      firstName: data.Patient_firstName,
                      lastName: data.Patient_lastName,
                      age: data.Patient_age,
                      gender: data.Patient_gender,
                      phoneNumber: data.Patient_phoneNumber,
                      address: data.Doctor_address,
                    });
                  }}
                >
                  Edit Profile
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {edit ? (
                <>
                  <p>
                    <span>First Name: </span>
                    {props.isDoctor ? (
                      <input
                        className="bg-slate-100 rounded shadow-inner disabled:text-gray-500 disabled:opacity-70"
                        type="text"
                        defaultValue={data.Doctor_firstName}
                        onChange={(e) => {
                          console.log(editData);
                          setEditData({
                            ...editData,
                            firstName: e.target.value,
                          });
                        }}
                      />
                    ) : (
                      <input
                        className="bg-slate-100 rounded shadow-inner disabled:text-gray-500 disabled:opacity-70"
                        type="text"
                        defaultValue={data.Patient_firstName}
                        onChange={(e) => {
                          console.log(editData);
                          setEditData({
                            ...editData,
                            firstName: e.target.value,
                          });
                        }}
                      />
                    )}
                  </p>
                  <p>
                    <span>Last Name: </span>
                    {props.isDoctor ? (
                      <input
                        className="bg-slate-100 rounded shadow-inner disabled:text-gray-500 disabled:opacity-70"
                        type="text"
                        defaultValue={data.Doctor_lastName}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <input
                        className="bg-slate-100 rounded shadow-inner disabled:text-gray-500 disabled:opacity-70"
                        type="text"
                        defaultValue={data.Patient_lastName}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    )}
                  </p>

                  <p>
                    <span>Age: </span>
                    {props.isDoctor ? (
                      <input
                        className="bg-slate-100 rounded shadow-inner disabled:text-gray-500 disabled:opacity-70"
                        type="number"
                        defaultValue={data.Doctor_age}
                        onChange={(e) =>
                          setEditData({ ...editData, age: e.target.value })
                        }
                      />
                    ) : (
                      <input
                        className="bg-slate-100 rounded shadow-inner disabled:text-gray-500 disabled:opacity-70"
                        type="number"
                        defaultValue={data.Patient_age}
                        onChange={(e) =>
                          setEditData({ ...editData, age: e.target.value })
                        }
                      />
                    )}
                  </p>
                  <p>
                    <span>Gender: </span>
                    <select
                      className="bg-slate-100 rounded shadow-inner disabled:text-gray-500 disabled:opacity-70"
                      defaultValue={
                        props.isDoctor
                          ? data.Doctor_gender
                          : data.Patient_gender
                      }
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          gender: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value="1"> Male</option>
                      <option value="2">Female</option>
                      <option value="3">Others</option>
                    </select>
                  </p>
                  <p>
                    <span>Phone Number: </span>
                    {props.isDoctor ? (
                      <input
                        className="bg-slate-100 rounded shadow-inner disabled:text-gray-500 disabled:opacity-70"
                        type="text"
                        defaultValue={data.Doctor_phoneNumber}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <input
                        className="bg-slate-100 rounded shadow-inner disabled:text-gray-500 disabled:opacity-70"
                        type="text"
                        defaultValue={data.Patient_phoneNumber}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    )}
                  </p>
                  <p>
                    <span>Address: </span>
                    {props.isDoctor ? (
                      <input
                        className="bg-slate-100 rounded shadow-inner disabled:text-gray-500 disabled:opacity-70"
                        type="text"
                        defaultValue={data.Doctor_address}
                        onChange={(e) =>
                          setEditData({ ...editData, address: e.target.value })
                        }
                      />
                    ) : (
                      <input
                        className="bg-slate-100 rounded shadow-inner disabled:text-gray-500 disabled:opacity-70"
                        type="text"
                        defaultValue={data.Patient_address}
                        onChange={(e) =>
                          setEditData({ ...editData, address: e.target.value })
                        }
                      />
                    )}
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
                  <div className="flex col-span-2 justify-center">
                    <button
                      className="w-max p-1 px-6 rounded-xl bg-indigo-300 hover:bg-indigo-500 mt-2 mr-1 "
                      onClick={() => handleEdit()}
                    >
                      Submit
                    </button>
                    <button
                      className="w-max p-1 px-6 rounded-xl bg-slate-300 hover:bg-slate-500 mt-2 ml-1 "
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    <span>Name: </span>{' '}
                    {props.isDoctor
                      ? data.Doctor_lastName + ' ' + data.Doctor_firstName
                      : data.Patient_lastName + ' ' + data.Patient_firstName}
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
                    <span>Gender: </span>
                    {props.isDoctor
                      ? data.Doctor_gender === 1
                        ? 'Male'
                        : data.Doctor_gender === 2
                        ? 'Female'
                        : 'Others'
                      : data.Patient_gender === 1
                      ? 'Male'
                      : data.Patient_gender === 2
                      ? 'Female'
                      : 'Others'}
                  </p>
                  <p>
                    <span>Phone Number: </span>
                    {props.isDoctor
                      ? data.Doctor_phoneNumber
                      : data.Patient_phoneNumber}
                  </p>
                  <p>
                    <span>Address: </span>
                    {props.isDoctor
                      ? data.Doctor_address
                      : data.Patient_address}
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
                </>
              )}
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
                    <th className="p-2 text-center" colSpan={2}>
                      Action
                      <p className="w-32"></p>
                    </th>
                  </tr>
                  {book.map((data, index) =>
                    data.StatusId === 7 ? null : data.StatusId === 6 ? null : (
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
                                ? 'bg-red-500 rounded-2xl text-center text-white '
                                : data.StatusId === 6
                                ? 'bg-green-500 rounded-2xl text-center text-white'
                                : data.StatusId === 5
                                ? 'bg-blue-500 rounded-2xl text-center text-white'
                                : 'bg-yellow-500 rounded-2xl text-center text-white p-1 m-1'
                            }
                          >
                            {data.status}
                          </td>
                          <td className="h-full px-1 pl-3">
                            {data.StatusId === 4 ? (
                              <div
                                className="cursor-pointer bg-blue-500 border-blue-500 hover:bg-white border-2 hover:text-blue-500 rounded-2xl text-center h-full p-2 text-white w-full"
                                onClick={() => handleConfirm(data)}
                              >
                                Confirm
                              </div>
                            ) : data.StatusId === 5 ? (
                              <button
                                className="cursor-pointer bg-green-500 hover:bg-white border-2 hover:text-green-500 border-green-500 rounded-2xl text-center w-full text-white p-2 h-full"
                                onClick={() => {
                                  console.log(data.StatusId);
                                  setCollapse2(index);
                                  setCollapse(-1);
                                }}
                              >
                                Done
                              </button>
                            ) : null}
                          </td>
                          <td>
                            {data.StatusId !== 7 && data.StatusId !== 6 ? (
                              <button
                                className="bg-red-500 rounded-2xl text-center hover:bg-white hover:text-red-500 border-red-500 border-2 text-white cursor-pointer w-full p-2 h-full "
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
                                  ? 'transition-all ease-in-out w-full resize-none bg-slate-50 shadow-inner m-1'
                                  : ' transition-all ease-in-out w-full hidden'
                              }
                              rows="5"
                            ></textarea>
                            <div className="mx-auto w-fit">
                              <button
                                className={
                                  collapse === index
                                    ? 'transition-all ease-in-out w-max p-1 px-6 rounded-xl bg-indigo-300 hover:bg-indigo-500 mt-2'
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
                                  ? 'transition-all ease-in-out w-full resize-none bg-slate-50 shadow-inner m-1'
                                  : ' transition-all ease-in-out w-full hidden'
                              }
                              rows="5"
                            ></textarea>
                            <div className="mx-auto w-fit">
                              <button
                                className={
                                  collapse2 === index
                                    ? 'transition-all ease-in-out w-max p-1 px-6 rounded-xl bg-indigo-300 hover:bg-indigo-500 mt-2'
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
                    )
                  )}
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
                  <th className="p-2 text-center">
                    <p className="w-24 mx-auto text-center">Action</p>
                  </th>
                </tr>
                {book.map((data, index) =>
                  data.StatusId === 7 ? null : data.StatusId === 6 ? null : (
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
                              className="text-center hover:bg-white border-red-500 border-2 rounded-2xl w-full h-full p-2 mx-2 hover:text-red-500 text-white bg-red-500"
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
                                  ? 'transition-all ease-in-out w-max p-1 px-6 rounded-xl bg-indigo-300 hover:bg-indigo-500 mx-2'
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
                  )
                )}
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
                  <th className="p-2 text-center w-max">
                    <p className="">Status</p>
                  </th>
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
                            ? 'bg-red-500 rounded-2xl text-center text-white w-max'
                            : 'bg-green-500 rounded-2xl text-center text-white w-max'
                        }
                      >
                        {data.status}
                      </td>
                      <td className=" text-center cursor-pointer ">
                        {' '}
                        <p
                          className="underline text-gray-600 w-max mx-auto cursor-pointer"
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
