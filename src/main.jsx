import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="light"  // keeps your bright UI style
    />
  </React.StrictMode>
);
