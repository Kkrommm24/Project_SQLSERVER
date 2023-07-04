import axios from "../axios";

const handleLoginForm = (email, password) => {
  return axios.post("/api/login", { email: email, password: password });
};

export const handleRegisterForm = (formData) => {
  return axios.post("/api/patient-sign-up", formData);
};

export default handleLoginForm;
