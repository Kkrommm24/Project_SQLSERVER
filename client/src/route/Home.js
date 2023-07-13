import { connect } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { processLogout } from '../store/action/userAction';
import { Navbar } from '../components/Navbar';
import { useState, useEffect } from 'react';
import error from '../asset/error.png';
import axios from '../axios';
import Loading from './Loading';
import { Outlet, useNavigate } from 'react-router-dom';

const Home = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [err, setErr] = useState(false);
  async function getSpecialization() {
    let Sdata = await axios.get('/api/home/specialization');
    console.log('hello', Sdata);
    return Sdata;
  }
  useEffect(() => {
    getSpecialization()
      .then((Sdata) => {
        setData(Sdata.sData);
      })
      .then(() => setIsLoading(false))
      .catch((e) => {
        setIsLoading(true);
        setErr(e.message);
      });
    if (
      window.location.pathname === '/about-us' ||
      window.location.pathname === '/booking' ||
      window.location.pathname === 'user/profile'
    ) {
    } else {
      navigate('/home');
    }
  }, []); //if cant fetch specialization data //literally every page isnt in route is notfound page lol
  useEffect(() => {
    if (data) {
    }
  }, [data]);
  return (
    <div>
      {isLoading ? (
        <div>
          <div
            className={
              err
                ? 'error flex bg-red-600  items-center fixed w-screen h-14 p-0  text-white overflow-hidden  '
                : 'error flex bg-red-600  items-center fixed w-screen h-0 p-0   text-white overflow-hidden '
            }
          >
            <img
              src={error}
              className="h-8 mx-3 border-solid border-4 rounded-full"
              alt="logo"
            />
            An error occured. {err}
          </div>
          <Loading />
        </div>
      ) : (
        <div>
          <Navbar props={props} data={data} />
          <Outlet />
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
    processLogout: () => dispatch(processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
