import React from "react";
import "../scss/App.scss";
import SignUp from "./SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
