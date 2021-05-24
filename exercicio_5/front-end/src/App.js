import React from "react";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "./styles/global.css";

const App = () => {
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
};

export default App;
