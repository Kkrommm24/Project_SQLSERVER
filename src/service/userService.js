import axios from "../axios";

const handleLoginForm = (email, password) => {
  return axios.post("/api/login", { email: email, password: password });
};

export default handleLoginForm;
