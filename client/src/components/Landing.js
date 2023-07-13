import React from 'react';
import background from '../asset/background2-1.jpg';
import { useNavigate } from 'react-router-dom';
export const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            malesuada lorem maximus mauris scelerisque, at rutrum nulla dictum.
            Ut ac ligula sapien. Suspendisse cursus faucibus finibus.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Donec malesuada lorem
            maximus mauris scelerisque, at rutrum nulla dictum. Ut ac ligula
            sapien. Suspendisse cursus faucibus finibus.
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
              Integer aliquet congue libero, eu gravida odio ultrices ut. Etiam
              ac erat ut enim maximus accumsan vel ac nisl. Duis feugiat
              bibendum orci, non elementum urna vestibulum in. Nulla facilisi.
              Nulla egestas vel lacus sed interdum.
            </p>
            <p className="m-3">
              Sed mollis, orci elementum eleifend tempor, nunc libero porttitor
              tellus, vel pharetra metus dolor. Duis feugiat bibendum orci, non
              elementum urna vestibulum in. Nulla facilisi. Nulla egestas vel
              lacus sed interdum. Sed mollis, orci elementum eleifend tempor,
              nunc libero porttitor tellus, vel pharetra metus dolor.
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
