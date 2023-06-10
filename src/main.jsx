import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root.jsx";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./routes/home.jsx";
import Error from "./routes/error.jsx";
import Login from "./routes/login.jsx";

const router = createBrowserRouter([
  {
    element: <Root />,
    path: "/",
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
