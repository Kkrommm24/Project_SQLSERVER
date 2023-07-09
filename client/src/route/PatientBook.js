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

  if (props.isPatient) {
    return <Book props={props} />;
  } else navigate('/home');
};
const Book = (props) => {
  const navigate = useNavigate();
  const disable = true;
  const [state, setState] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isEnabled, setEnabled] = useState(true);
  const [doctorList, setDoctorList] = useState({});
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
    if (!submit.doctor) {
      alert('hey u not choose doctor yet');
    } else {
      console.log(submit);
      console.log(props.props.userInfo);
      let submitted = await handleBooking(
        props.props.userInfo.id,
        submit.doctor
      );
      console.log(submitted);
      let message = submitted.message;
      let errCode = submitted.errCode;
      if (errCode == 0) {
        alert(message);
        navigate('/home');
      }
    }
  };
  useEffect(() => {
    async function getDoctor() {
      let doctorData = await axios.post('/api/booking/doctor', {
        cid: submit.clinic,
        sid: submit.specialization,
      });
      if (doctorData.doctor.length == 0) {
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
        <div>
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
            <button onClick={(e) => handleSubmitBooking(e)}>Press me </button>
          </form>
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
