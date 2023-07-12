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
        <div className="flex flex-col">
          <form>
            <select
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
              disabled={isEnabled}
              defaultValue=""
              onChange={(e) => setSubmit({ ...submit, doctor: e.target.value })}
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
              type="date"
              onChange={(e) => setDate({ ...date, day: e.target.value })}
            />
          </form>
          <div className="grid grid-cols-4 gap-1 rounded-md p-3 justify-center items-center w-max">
            <button
              className="p-1 border- active:bg-indigo-500 active:translate-x-0.5 active:translate-y-0.5 rounded bg-indigo-400"
              value={8}
              onClick={(e) =>
                setDate({ ...date, time: parseInt(e.target.value) })
              }
            >
              8:00 AM - 9:00 AM
            </button>
            <button
              className="p-1 border- active:bg-indigo-500 active:translate-x-0.5 active:translate-y-0.5 rounded bg-indigo-400"
              value={9}
              onClick={(e) =>
                setDate({ ...date, time: parseInt(e.target.value) })
              }
            >
              9:00 AM - 10:00 AM
            </button>
            <button
              className="p-1 border- active:bg-indigo-500 active:translate-x-0.5 active:translate-y-0.5 rounded bg-indigo-400"
              value={10}
              onClick={(e) =>
                setDate({ ...date, time: parseInt(e.target.value) })
              }
            >
              10:00 AM - 11:00 AM
            </button>
            <button
              className="p-1 border- active:bg-indigo-500 active:translate-x-0.5 active:translate-y-0.5 rounded bg-indigo-400"
              value={11}
              onClick={(e) =>
                setDate({ ...date, time: parseInt(e.target.value) })
              }
            >
              11:00 AM - 12:00 PM
            </button>
            <button
              className="p-1 border- active:bg-indigo-500 active:translate-x-0.5 active:translate-y-0.5 rounded bg-indigo-400"
              value={12}
              onClick={(e) =>
                setDate({ ...date, time: parseInt(e.target.value) })
              }
            >
              1:00 PM - 2:00 PM
            </button>
            <button
              className="p-1 border- active:bg-indigo-500 active:translate-x-0.5 active:translate-y-0.5 rounded bg-indigo-400"
              value={13}
              onClick={(e) =>
                setDate({ ...date, time: parseInt(e.target.value) })
              }
            >
              2:00 PM - 3:00 PM
            </button>
            <button
              className="p-1 border- active:bg-indigo-500 active:translate-x-0.5 active:translate-y-0.5 rounded bg-indigo-400"
              value={14}
              onClick={(e) => {
                setDate({ ...date, time: parseInt(e.target.value) });
              }}
            >
              3:00 PM - 4:00 PM
            </button>
            <button
              className="p-1 border- active:bg-indigo-500 rounded active:translate-x-0.5 active:translate-y-0.5 bg-indigo-400"
              value={15}
              onClick={(e) =>
                setDate({ ...date, time: parseInt(e.target.value) })
              }
            >
              4:00 PM - 5:00 PM
            </button>
          </div>
          <button onClick={(e) => handleSubmitBooking(e)}>Press me </button>
          <h1>
            {submit.clinic} and {submit.specialization} and {submit.doctor}
          </h1>
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
