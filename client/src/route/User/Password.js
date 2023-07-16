import { connect } from 'react-redux';
import { processLogout } from '../../store/action/userAction';
import { useEffect, useState } from 'react';
import axios from '../../axios';
import Loading from '../Loading';
import error from '../../asset/error.png';
import { useNavigate } from 'react-router-dom';

const ChangePassword = (props) => {
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    cf_newPassword: '',
  });
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      let sessionId = await axios.get('/api/get-session');
      let userId = props.userInfo.id;
      console.log('user', userId);
      console.log('session', sessionId);
      if (userId !== sessionId) {
        navigate(-1, { replace: true }); //go back to previous page
      }
    };
    fetchUser()
      .then(() => setIsLoading(false))
      .catch((e) => {
        setIsLoading(true);
        console.error(e);
        setErr(e.message);
      });
  });
  const handleChangePassword = async () => {
    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.cf_newPassword
    ) {
      setErr('Please fill all fields');
    } else {
      await axios
        .put(
          '/api/change-' +
            (props.isDoctor ? 'doctor-' : 'patient-') +
            'password',
          password
        )
        .then((response) => {
          if (response.errCode === 0) {
            navigate('/home', {
              state: { statusCode: 1, message: 'Đổi mật khẩu thành công!' },
            });
          } else {
            setErr(response.error);
          }
        })
        .catch((e) => setErr(e.response.data.error));
    }
  };
  return (
    <div>
      {isLoading ? (
        <div>
          <div
            className={
              err
                ? 'error flex bg-red-600  items-center absolute w-screen h-14 p-0  text-white overflow-hidden  '
                : 'error flex bg-red-600  items-center absolute w-screen h-0 p-0   text-white overflow-hidden '
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
        <div className="h-max w-screen items-center bg-indigo-50 absolute">
          <div className="m-20 shadow-md rounded-2xl h-max w-1/2 rig bg-white p-20 mx-auto relative overflow-auto">
            <div className=" shadow-md rounded-2xl h-max w-full opacity-30 rig bg-slate-600 p-20 mx-auto top-1 -left-2 -z-10 absolute"></div>
            <h1 className="mt-10 mb-10 text-gray-900 text-5xl font-bold">
              Đổi mật khẩu
            </h1>
            <p>Mật khẩu hiện tại:</p>
            <input
              className="bg-slate-100 rounded shadow-inner p-1 w-full"
              type="password"
              placeholder="Nhập mật khẩu hiện tại của bạn"
              onChange={(e) => {
                setPassword({ ...password, currentPassword: e.target.value });
              }}
            />
            <p>Mật khẩu mới:</p>
            <input
              className="bg-slate-100 rounded shadow-inner p-1 w-full"
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={password.newPassword}
              onChange={(e) => {
                setPassword({ ...password, newPassword: e.target.value });
              }}
            />
            <p>Xác nhận mật khẩu mới:</p>
            <input
              className="bg-slate-100 rounded shadow-inner p-1 w-full"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={password.cf_newPassword}
              onChange={(e) => {
                setPassword({
                  ...password,
                  cf_newPassword: e.target.value,
                });
              }}
            />
            <p></p>
            <button
              className=" block w-full hover:bg-white bg-indigo-500 border-2 border-indigo-500 rounded-md text-white hover:text-indigo-500 mt-3  p-1"
              onClick={(e) => handleChangePassword()}
            >
              Xác Nhận{' '}
            </button>
            <p className="text-red-500 font-medium">{err}</p>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
