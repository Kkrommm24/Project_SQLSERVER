import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  doctorLoginSuccess,
  patientLoginSuccess,
  processLogout,
} from '../store/action/userAction';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const Booking = (props) => {
  const navigate = useNavigate();

  if (props.isPatient) {
    return <Book />;
  } else navigate('/home');
};
const Book = () => {
  const [state, setState] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isEnabled, setEnabled] = useState(true);
  const [doctorList, setDoctorList] = useState({});
  const handleChange = async (e) => {
    e.preventDefault();
    let doctorData = await axios.post('/api/booking/doctor', {
      id: e.target.value,
    });
    console.log(doctorData.doctor.length);
    if (doctorData.doctor.length == 0) {
      setEnabled(true);
    } else setEnabled(false);
    setDoctorList(doctorData);
    console.log(doctorList);
  };
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
            <select>
              {state.clinic.map((data) => (
                <option>{data.Clinic_name}</option>
              ))}
            </select>
            <select onChange={(e) => handleChange(e)}>
              <option defaultChecked style={{ color: 'gray' }}>
                ---Select Specialization---
              </option>
              {state.specialization.map((data) => (
                <option value={data.id}>{data.Specialization_name}</option>
              ))}
            </select>
            <select disabled={isEnabled}>
              {isEnabled ? (
                <option>---Select Doctor---</option>
              ) : (
                doctorList.doctor.map((data) => (
                  <option>
                    {data.Doctor_firstName} {data.Doctor_lastName}
                  </option>
                ))
              )}
            </select>
            <button>Press me </button>
          </form>
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
