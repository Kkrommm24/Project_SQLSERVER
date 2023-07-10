import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../route/Home';
import NotFound from '../route/NotFound';
import Booking from '../route/PatientBook';
import Loading from '../route/Loading';
import IsLogSignIn from '../route/Login_SignIn';
//hook for checking who tf is logging in

const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="loading" element={<Loading />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login-signin" element={<IsLogSignIn />} />
          {/* <Route path="/login" element={<IsLoggedIn />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </Router>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isDoctor: state.isDoctor,
    isPatient: state.isPatient,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
