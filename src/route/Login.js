import React, { useState } from "react";
import { connect } from "react-redux";
import {
  doctorLoginSuccess,
  patientLoginSuccess,
  processLogout,
} from "../store/action/userAction";
import handleLoginForm from "../service/userService";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      let data = await handleLoginForm(email, password);
      console.log(data);
      if (data.errCode === 0) {
        if (data.user.roleID === "1") {
          props.doctorLoginSuccess(data.user);
        }
        if (data.user.roleID === "2") props.patientLoginSuccess(data.user);
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
    }

    //NOTE: In this app we dont use any security method for user data, instead we will store user data directly inside the local storage
  };
  return (
    <div className="container">
      <form>
        <label>Login</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => handleEmail(e)}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => handlePassword(e)}
        />
        <button onClick={(e) => handleLogin(e)}>Click Me</button>
      </form>
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
    patientLoginSuccess: () =>
      dispatch(patientLoginSuccess({ email: "test2", password: "test again" })),
    processLogout: () => dispatch(processLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
