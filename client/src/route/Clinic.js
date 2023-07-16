import axios from '../axios';
import Loading from './Loading';
import background from '../asset/background2-1.jpg';
import { useState, useEffect } from 'react';
import error from '../asset/error.png';
import { useNavigate } from 'react-router-dom';
const Clinics = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [err, setErr] = useState(false);
  async function getClinic() {
    let Cdata = await axios.get('/api/home/clinic');
    return Cdata;
  }
  useEffect(() => {
    getClinic()
      .then((Cdata) => {
        setData(Cdata.cData);
        console.log(data);
      })
      .then(() => setIsLoading(false))
      .catch((e) => {
        setIsLoading(true);
        setErr(e.message);
      });
  }, []);
  return (
    <div className="container">
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
        <div className=" items-center w-screen">
          <img
            src={background}
            alt="Landing Page"
            className="object-cover h-max  absolute -top-30 -z-10 opacity-50"
          />
          <div className="absolute top-44 w-full z-10 h-max ">
            {data.map((data) => {
              return (
                <>
                  <div className="m-10 shadow-md rounded-2xl h-max w-5/6 rig bg-white p-20 mx-auto relative overflow-auto transition-all ease-in-out hover:cursor-pointer hover:scale-105 hover:bg-slate-50">
                    <h1 className="font-semibold text-3xl my-3">
                      {data.Clinic_name}
                    </h1>
                    <h2 className="font-medium text-xl text-gray-800 my-2">
                      {data.Clinic_address}
                    </h2>
                    <p>{data.Clinic_description}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Clinics;
