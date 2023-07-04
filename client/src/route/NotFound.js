import { useState } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [state, setState] = useState("");
  const handleChange = (e) => {
    setState(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div>
      <h1>Page not found xdddd</h1>
      <Link to="/">Click here to move back to home page</Link>

      <select
        onChange={(e) => {
          handleChange(e);
        }}
        value={state}
      >
        <option value="0">Test</option>
        <option value="2">Test</option>
        <option value="3">Tes2t</option>
        <option value="4">Test</option>
      </select>
      <select disabled={!state}>
        <option>Test</option>
        <option>Test</option>
        <option>Test</option>
        <option>Test</option>
      </select>
      <p>{state}</p>
    </div>
  );
};
export default NotFound;
