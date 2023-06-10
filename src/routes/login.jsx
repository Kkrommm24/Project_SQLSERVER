import { useState } from "react";
import { redirect } from "react-router-dom";
import { users } from "../assets/datatest";

const errors = {
  uname: "invalid username",
  pass: "invalid password",
};

export default function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    var { uname, pwd } = document.forms[0];
    const userData = users.find((user) => user.username === uname.value);
    if (userData) {
      if (userData.password !== pwd.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
        console.log("wrong pwd");
      } else {
        setIsSubmitted(true);
        setErrorMessages({});
        console.log("login success");
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
      console.log("invalid username");
    }
  };
  return (
    <div
      className="h-screen overflow-hidden opacity-50"
      style={{
        backgroundImage:
          "url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1)",
      }}
    >
      <div className="mx-auto mt-52 shadow-xl w-1/4 opacity-100 justify-center rounded-2xl p-24 bg-white">
        <div className="text-center text-2xl pb-10">Login</div>
        <form method="GET" action="localhost:5173/test">
          <label>
            <p>Username</p>
            <input
              type="text"
              required
              name="uname"
              placeholder="put your fucking name here"
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              required
              name="pwd"
              minLength={"6"}
              placeholder="dont forgot your pwd too"
            />
          </label>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
        {errorMessages.name === "uname" ? (
          <div className="text-red-500">Invalid username</div>
        ) : errorMessages.name === "pass" ? (
          <div className="text-red-500">Wrong password</div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
