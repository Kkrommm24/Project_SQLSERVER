import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { processLogout } from "../store/action/userAction";
import { useState } from "react";

const Home = (props) => {
  //check user role then render
  const navigate = useNavigate();

  const handleLogout = () => {
    props.processLogout();
    navigate("/home");
  };
  if (props.isDoctor) {
    return (
      <div className="container">
        <ul>
          <li>Home</li>
          <li>Specialty</li>
          <li>About us</li>
          <li>Hello, Dr.{props.userInfo.email}</li>
          <button onClick={() => handleLogout()}>Log out</button>
        </ul>
        <button onClick={console.log(props)}>Check</button>
      </div>
    );
  } else if (props.isPatient) {
    return (
      <div className="container">
        <ul>
          <li>Home</li>
          <li>Specialty</li>
          <li>About us</li>
          <li>Hello,{props.userInfo.email}</li>
          <button onClick={() => handleLogout()}>Log out</button>
        </ul>
        <button onClick={console.log(props)}>Check</button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <ul>
          <li>Home</li>
          <li>Specialty</li>
          <li>About us</li>
          <button onClick={() => navigate("/login")}>Login</button>
        </ul>
        <button onClick={console.log(props)}>Check</button>
      </div>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
