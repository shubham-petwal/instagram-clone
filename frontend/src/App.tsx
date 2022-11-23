import React, { useContext, useEffect } from "react";
import "./styles/App.scss";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ForgotPassword from "./components/ForgotPassword";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import ChangPassword from "./components/ChangPassword";
import ShowStory from "./components/ShowStory";
import { CometChat } from "@cometchat-pro/chat";
import Chat from "./components/Chat";
// import { usena } from 'react-router-dom'

function App() {
  useEffect(() => {
    const appID = "225772fb85438ae5";
    const region = "us";
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        // You can now call login function.
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
  }, []);

 

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
            path="/userProfile/:userId"
            element={
              <ProtectedRoutes>
                <UserProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/chat/:targetUserName"
            element={
              <ProtectedRoutes>
                <Chat />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoutes>
                <Chat />
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
                <ChangPassword />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/showStory"
            element={
              <ProtectedRoutes>
                <ShowStory />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
