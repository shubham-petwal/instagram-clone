import React, { useContext } from "react";
import "./styles/App.scss";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ForgotPassword from "./components/ForgotPassword";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/userProfile"
            element={
              <ProtectedRoutes>
                <UserProfile />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
