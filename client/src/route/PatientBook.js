import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  doctorLoginSuccess,
  patientLoginSuccess,
  processLogout,
} from '../store/action/userAction';
import axios from '../axios';
import { handleBooking } from '../service/userService';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const Booking = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.isPatient) {
      navigate('/home');
    }
  });
  if (props.isPatient) {
    return <Book props={props} />;
  }
};
const Book = (props) => {
  const navigate = useNavigate();
  const disable = true;
  const [state, setState] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isEnabled, setEnabled] = useState(true);
  const [doctorList, setDoctorList] = useState({});
  const [date, setDate] = useState({
    day: undefined,
    time: 0,
  });
  const [submit, setSubmit] = useState({
    clinic: 0,
    specialization: 0,
  });
  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.name === 'clinic') {
      setSubmit({ ...submit, clinic: e.target.value });
    }
    if (e.target.name === 'specialization') {
      setSubmit({ ...submit, specialization: e.target.value });
    }
  };
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    if (!submit.doctor || !date.day || date.time === 0) {
      console.log(submit);
      alert('Pls fill all fields');
    } else {
      let submitted = await handleBooking(submit.doctor, date.day, date.time);
      let message = submitted.message;
      let errCode = submitted.errCode;
      console.log(submitted);
      if (errCode === 0) {
        alert(message);
        navigate('/home');
      }
    }
  };
  useEffect(() => {
    async function getDoctor() {
      let doctorData = await axios.post('/api/get-booking/doctor', {
        cid: submit.clinic,
        sid: submit.specialization,
      });
      console.log(doctorData);
      if (doctorData.doctor.length === 0) {
        setEnabled(true);
      } else setEnabled(false);
      //setDoctorList(doctorData);
      //console.log(doctorList);
      return doctorData;
    }
    getDoctor().then((data) => setDoctorList(data));
  }, [submit]);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      let data = await axios.get('/api/booking');
      return data;
    }
    getData()
      .then((data) => setState(data))
      .then(() => setLoading(false));
  }, []);
  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="h-screen w-screen items-center bg-indigo-50 absolute">
          <div className="m-20 shadow-md rounded-2xl h-max w-5/6 rig bg-white p-20 mx-auto relative overflow-auto">
            <div className=" shadow-md rounded-2xl h-max w-full opacity-30 rig bg-slate-600 p-20 mx-auto top-1 -left-2 -z-10 absolute"></div>
            <p className="text-3xl mb-4">Hẹn lịch khám bệnh</p>
            <div className="flex flex-col ">
              <form className="grid grid-cols-3 w-fit">
                <select
                  className="p-2 shadow-inner bg-slate-50 m-2 rounded-md"
                  defaultValue=""
                  name="clinic"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="" disabled={disable} style={{ color: 'gray' }}>
                    ---Select Clinic---
                  </option>
                  {state.clinic.map((data) => (
                    <option value={data.id}>{data.Clinic_name}</option>
                  ))}
                </select>
                <select
                  className="p-2 shadow-inner bg-slate-50 m-2 rounded-md"
                  defaultValue=""
                  name="specialization"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="" disabled={disable} style={{ color: 'gray' }}>
                    ---Select Specialization---
                  </option>
                  {state.specialization.map((data) => (
                    <option value={data.id}>{data.Specialization_name}</option>
                  ))}
                </select>
                <select
                  className="p-2 shadow-inner bg-slate-50 m-2 rounded-md"
                  disabled={isEnabled}
                  defaultValue=""
                  onChange={(e) =>
                    setSubmit({ ...submit, doctor: e.target.value })
                  }
                >
                  <option disabled value="">
                    ---Select Doctor---
                  </option>
                  {isEnabled ? (
                    <option value="">---Select Doctor---</option>
                  ) : (
                    doctorList.doctor.map((data) => (
                      <option value={data.id}>
                        {data.Doctor_firstName} {data.Doctor_lastName}
                      </option>
                    ))
                  )}
                </select>
                <input
                  className="p-2 shadow-inner bg-slate-50 m-2 rounded-md"
                  type="date"
                  onChange={(e) => setDate({ ...date, day: e.target.value })}
                />
              </form>
              <div className="w-max">
                <div className="grid grid-cols-4 gap-2 rounded-md p-3 justify-center items-center w-max">
                  <button
                    className="p-1 px-2 border- text-black active:bg-slate-200 rounded active:translate-x-0.5 active:translate-y-0.5 bg-slate-100"
                    value={8}
                    onClick={(e) =>
                      setDate({ ...date, time: parseInt(e.target.value) })
                    }
                  >
                    8:00 AM - 9:00 AM
                  </button>
                  <button
                    className="p-1 px-2 border- text-black active:bg-slate-200 rounded active:translate-x-0.5 active:translate-y-0.5 bg-slate-100"
                    value={9}
                    onClick={(e) =>
                      setDate({ ...date, time: parseInt(e.target.value) })
                    }
                  >
                    9:00 AM - 10:00 AM
                  </button>
                  <button
                    className="p-1 px-2 border- text-black active:bg-slate-200 rounded active:translate-x-0.5 active:translate-y-0.5 bg-slate-100"
                    value={10}
                    onClick={(e) =>
                      setDate({ ...date, time: parseInt(e.target.value) })
                    }
                  >
                    10:00 AM - 11:00 AM
                  </button>
                  <button
                    className="p-1 px-2 border- text-black active:bg-slate-200 rounded active:translate-x-0.5 active:translate-y-0.5 bg-slate-100"
                    value={11}
                    onClick={(e) =>
                      setDate({ ...date, time: parseInt(e.target.value) })
                    }
                  >
                    11:00 AM - 12:00 PM
                  </button>
                  <button
                    className="p-1 px-2 border- text-black active:bg-slate-200 rounded active:translate-x-0.5 active:translate-y-0.5 bg-slate-100"
                    value={12}
                    onClick={(e) =>
                      setDate({ ...date, time: parseInt(e.target.value) })
                    }
                  >
                    1:00 PM - 2:00 PM
                  </button>
                  <button
                    className="p-1 px-2 border- text-black active:bg-slate-200 rounded active:translate-x-0.5 active:translate-y-0.5 bg-slate-100"
                    value={13}
                    onClick={(e) =>
                      setDate({ ...date, time: parseInt(e.target.value) })
                    }
                  >
                    2:00 PM - 3:00 PM
                  </button>
                  <button
                    className="p-1 px-2 border- text-black active:bg-slate-200 rounded active:translate-x-0.5 active:translate-y-0.5 bg-slate-100"
                    value={14}
                    onClick={(e) => {
                      setDate({ ...date, time: parseInt(e.target.value) });
                    }}
                  >
                    3:00 PM - 4:00 PM
                  </button>
                  <button
                    className="p-1 px-2 border- text-black active:bg-slate-200 rounded active:translate-x-0.5 active:translate-y-0.5 bg-slate-100"
                    value={15}
                    onClick={(e) =>
                      setDate({ ...date, time: parseInt(e.target.value) })
                    }
                  >
                    4:00 PM - 5:00 PM
                  </button>
                </div>
                <button
                  onClick={(e) => handleSubmitBooking(e)}
                  className="mx-auto block w-full hover:bg-white bg-indigo-500 border-2 border-indigo-500 rounded-md text-white hover:text-indigo-500 mr-4 ml-4 p-1"
                >
                  Đặt lịch khám{' '}
                </button>
              </div>
              <h1></h1>
            </div>
          </div>
        </div>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
