import axios from '../axios';

const handleLoginForm = (email, password) => {
  return axios.post('/api/login', { email: email, password: password });
};

export const handleRegisterForm = (formData) => {
  return axios.post('/api/patient-sign-up', formData);
};
export const handleBooking = (patientId, doctorId) => {
  return axios.post('/api/booking/done', { patientId, doctorId }); // Set pending on create
};
export default handleLoginForm;
