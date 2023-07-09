import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleRegisterForm } from "../service/userService";

const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState({
    errCode: "",
    message: "",
  });
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    age: 0,
    gender: 1,
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(FormData);
    let result = await handleRegisterForm(FormData);
    if (result.errCode === 0) {
      setErr({ errCode: "" });
      console.log("register successful!");
      navigate("/login");
    } else {
      console.log("Nah not create any yet");
      setErr({ errCode: result.errCode, message: result.message });
    }
  };
  return (
    <div>
      Register
      <form>
        <label>Email</label>
        <input
          required
          type="email"
          name="email"
          onChange={(e) => setFormData({ ...FormData, email: e.target.value })}
          value={FormData.email}
        />
        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          onChange={(e) =>
            setFormData({ ...FormData, password: e.target.value })
          }
          value={FormData.password}
        />
        <label>First Name</label>
        <input
          required
          type="text"
          name="firstName"
          onChange={(e) =>
            setFormData({ ...FormData, firstName: e.target.value })
          }
          value={FormData.firstName}
        />
        <label>Last Name</label>
        <input
          required
          type="text"
          name="lastName"
          onChange={(e) =>
            setFormData({ ...FormData, lastName: e.target.value })
          }
          value={FormData.lastName}
        />
        <label>Gender</label>
        <select
          required
          type="text"
          name="Gender"
          onChange={(e) => {
            setFormData({ ...FormData, gender: parseInt(e.target.value) });
          }}
        >
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Other</option>
        </select>
        <label>Address</label>
        <input
          type="text"
          name="Address"
          required
          onChange={(e) =>
            setFormData({ ...FormData, address: e.target.value })
          }
        />
        <label>Age</label>
        <input
          type="number"
          name="Age"
          required
          min={0}
          max={120}
          onChange={(e) => setFormData({ ...FormData, age: e.target.value })}
          value={FormData.age}
        />
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          onChange={(e) =>
            setFormData({ ...FormData, phoneNumber: e.target.value })
          }
          value={FormData.phoneNumber}
        />
        <button onClick={(e) => handleRegister(e)}>Click Me</button>
        <div style={{ color: "red" }}>{err.message}</div>
      </form>
    </div>
  );
};

export default Register;
