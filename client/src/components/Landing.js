import React, { useEffect, useState } from 'react';
import background from '../asset/background2-1.jpg';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Landing = () => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
    }, 5000);
  });
  let location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {location.state ? (
        location.state.statusCode === 1 ? (
          <div
            className={
              hidden
                ? 'p-0 m-0 overflow-hidden h-0 transition-all ease-in-out'
                : 'h-12 w-screen bg-green-400 pt-3 px-5 font-semibold text-white transition-all ease-in-out'
            }
          >
            {location.state.message}
          </div>
        ) : null
      ) : null}
      <div className="relative items-center w-screen">
        <img
          src={background}
          alt="Landing Page"
          className="object-cover h-max"
        />
        <div className="absolute  top-40 left-1/4 w-2/4 ">
          <h1 className=" font-bold text-white text-3xl">#1 Health Care</h1>
          <h1 className=" font-medium  text-gray-800 text-6xl pb-6">
            Love the new you
          </h1>
          <p className="pb-7">
            Phòng khám Hồng Phương tự hào là điểm đến uy tín trong lĩnh vực chăm
            sóc sức khỏe tại địa phương. Với đội ngũ bác sĩ giàu kinh nghiệm và
            đầy đủ trang thiết bị hiện đại, chúng tôi cam kết mang đến cho bạn
            những dịch vụ y tế chất lượng và tận tâm nhất.
          </p>
          <div className="inline bg-red-400 rounded-3xl font-medium border-2 border-red-400  p-2 px-5 mr-3 hover:border-2 hover:border-red-400 hover:bg-white hover:text-red-500 text-white">
            <button onClick={() => navigate('/about-us')}>Đọc thêm</button>
          </div>
        </div>
        <div className=" top-1/3 absolute bg-white opacity-90">
          <div className="py-10 mx-40 inline-block w-fit">
            <h1 className=" text-gray-700">This is Hong Phuong</h1>
            <h1 className="  font-light text-5xl">Welcome to our Clinic</h1>
            <p className="m-3">
              Hong Phuong Clinic takes pride in being a reputable destination
              for healthcare services in the local area. With an experienced
              team of doctors and state-of-the-art facilities, we are committed
              to providing you with the highest quality and most compassionate
              medical care.
            </p>
            <p className="m-3">
              Our clinic offers a wide range of medical services, from
              respiratory and ENT treatments to advanced aesthetic procedures,
              aimed at boosting your confidence and well-being. Come to Hong
              Phuong Clinic, where we cherish and respect every patient. We
              believe that our dedicated and caring approach to each treatment
              will ensure your peace of mind and self-love.
            </p>
          </div>
        </div>
        <div className="absolute top-2/3 w-screen h-screen bg-white p-20 ">
          {' '}
          <p></p>
        </div>
      </div>
    </>
  );
};
