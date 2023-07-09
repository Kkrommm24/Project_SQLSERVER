import { connect } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { processLogout } from '../store/action/userAction';
import { Navbar } from '../components/Navbar';
import { Landing } from '../components/Landing';
const Home = (props) => {
  return (
    <>
      <Navbar props={props} />
      <Landing />
    </>
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
    processLogout: () => dispatch(processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
