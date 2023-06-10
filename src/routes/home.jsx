import { Form } from "react-router-dom";

export default function Home() {
  const url =
    "https://images.unsplash.com/photo-1571772996211-2f02c9727629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
  return (
    <>
      <div className="relative items-center w-full">
        <img src={url} className="min-w-full object-cover" />
        <div className="absolute  top-1/3 left-2/4 ">
          <h1 className=" font-bold text-white text-3xl">#1 Health Care</h1>
          <h1 className=" font-medium  text-gray-800 text-6xl pb-6">
            Love the new you
          </h1>
          <p className="pb-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            malesuada lorem maximus mauris scelerisque, at rutrum nulla dictum.
            Ut ac ligula sapien. Suspendisse cursus faucibus finibus.
          </p>
          <div className="inline bg-red-400 rounded-3xl border-2 border-red-400  p-2 px-5 mr-3 hover:border-2 hover:border-red-400 hover:bg-white hover:text-red-500 text-white">
            <a href="">Read more</a>
          </div>
          <div className="inline bg-opacity-20 bg-white rounded-3xl border-2 border-cyan-400  p-2 px-5 hover:border-2 hover:border-cyan-400 hover:bg-cyan-400 hover:text-white text-cyan-400">
            <a href="">Make an appointment</a>
          </div>
        </div>
      </div>
      <div className="pt-10 mx-40">
        <div className="inline-block w-2/5">
          <h1 className=" text-gray-700">This is Hong Phuong</h1>
          <h1 className="  font-light text-5xl">Welcome to our Clinic</h1>
          <p className="m-3">
            Integer aliquet congue libero, eu gravida odio ultrices ut. Etiam ac
            erat ut enim maximus accumsan vel ac nisl. Duis feugiat bibendum
            orci, non elementum urna vestibulum in. Nulla facilisi. Nulla
            egestas vel lacus sed interdum. Sed mollis, orci elementum eleifend
            tempor, nunc libero porttitor tellus, vel pharetra metus dolor.
          </p>
        </div>
        <span className="float-right shadow-xl bg-white w-1/2 m-3">
          <div className=" ">
            <div className="bg-cyan-400 inline-block text-white font-bold p-3 mb-3">
              Make and appointment
            </div>
            <Form className="flex flex-wrap">
              <input
                placeholder="Your Name"
                className="h-10 p-3 m-3 border-2 border-opacity-5 rounded-md w-48 "
              />
              <input
                placeholder="Your E-mail"
                className="h-10 p-3 m-3 border-2 border-opacity-5 rounded-md w-48"
              />
              <select className="h-10 pl-1 m-3 border-2 border-opacity-5 rounded-md w-48">
                <option disabled value="" selected>
                  Department
                </option>
                <option>Department 1</option>
                <option>Department 2</option>
                <option>Department 3</option>
              </select>
              <select className="h-10 pl-1 m-3 border-2 border-opacity-5 rounded-md w-48">
                <option disabled value="" selected className="text-gray-500">
                  Treatment
                </option>
                <option>Treatment 1</option>
                <option>Treatment 2</option>
                <option>Treatment 3</option>
              </select>
              <input
                placeholder="Doctor"
                className="h-10 p-3 m-3 border-2 border-opacity-5 rounded-md w-48"
              />
              <input
                placeholder="Date"
                type="text"
                className="h-10 p-3 m-3 border-2 border-opacity-5 rounded-md w-48"
                onFocus={(e) => (e.target.type = "date")}
              />
              <button
                type="submit"
                className="w-full m-5 uppercase bg-red-400 rounded-3xl border-2 border-red-400  p-2 px-5 hover:border-2 hover:border-red-400 hover:bg-white hover:text-red-400 text-white"
              >
                Make an appointment
              </button>
            </Form>
          </div>
        </span>
      </div>
    </>
  );
}
