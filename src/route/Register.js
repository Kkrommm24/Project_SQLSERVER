import React, { useState } from "react";
import { Form } from "react-router-dom";

const Register = () => {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    age: 0,
    gender: 0,
  });
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(FormData);
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
          <option value="0">Male</option>
          <option value="1">Female</option>
          <option value="2">Other</option>
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
      </form>
    </div>
  );
};

export default Register;
