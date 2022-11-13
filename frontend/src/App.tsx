import React, { useContext } from "react";
import "./styles/App.scss";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ForgotPassword from "./components/ForgotPassword";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import ChangPassword from "./components/ChangPassword";
import UploadImage from "./components/UploadImage";
import { PostDetailModal } from "./components/PostDetailModal";
import ShowStory from "./components/ShowStory";

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
          <Route
            path="/editProfile"
            element={
              <ProtectedRoutes>
                <EditProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/ChangePass"
            element={
              <ProtectedRoutes>
                <ChangPassword/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/uploadImage"
            element={
              <ProtectedRoutes>
                <UploadImage method="uploadPost"/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/updateProfileImage"
            element={
              <ProtectedRoutes>
                <UploadImage method="updateProfileImage"/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addStory"
            element={
              <ProtectedRoutes>
                <UploadImage method="addStory"/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/showStory"
            element={
              <ProtectedRoutes>
                <ShowStory/>
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
