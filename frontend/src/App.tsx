import React, { useContext, useEffect, useState } from "react";
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
import { PostDetailModal } from "./components/PostDetailModal";
import ShowStory from "./components/ShowStory";
import { AuthContext } from "./context/AuthContext";
import { getMessaging, onMessage,getToken } from "firebase/messaging";
import {messaging} from "./db"
import { ToastContainer, toast } from "react-toastify";


function App() {
  const user = useContext(AuthContext);
  const [token, setToken] = useState("");
// function requestPermission() {
//   console.log("Requesting permission...");
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Notification permission granted.");
//       getToken(messaging, { vapidKey: "BGXU4yZ_A-gQcf2jJNnreXI-2U8v969HpNAb6EDLihffwyVx3dLBhBSPMFfL6cvoYdTPbmCA_be0Z-nxT8q7Kjk" })
//       .then((currentToken) => {
//         if (currentToken) {
//           // Send the token to your server and update the UI if necessary
//           console.log("current Token:",currentToken)
//           setToken(currentToken)
//         } else {
//           // Show permission request UI
//           console.log(
//             "No registration token available. Request permission to generate one."
//           );
//           // ...
//         }
//       })
//       .catch((err) => {
//         console.log("An error occurred while retrieving token. ", err);
//         // ...
//       });
//     }
//     else{
//       console.log("Cannot get Token")
//     }
//   });
// }

// let body = {
//   to: token,
//   notification:{
//     title: "Notification alert",
//     body:"Hello User How r u ",
//     icon:"",
//     click_action:"https://google.com"
//   }
// }

// let options = {
//   method: "POST",
//   headers: new Headers({
//     Authorization: "key=AAAAfnSlWp8:APA91bH-KZ3UngzLMme_8e9vDt4jEw-HvSOI_BOX361qxxsJAOrkXM3ehUiadPywIqNqBeKnokDOVJmKO8jKLVhS5_8k0UzflLx4CuAin2SbTw_tsDYSdH3f9a37YJ6mGG3AxIXoWsZO",
//     "Content-Type":"application/json"
//   }),
//   body: JSON.stringify(body)
// }
useEffect(()=>{
  // requestPermission();
  // fetch("https://fcm.googleapis.com/fcm/send", options).then(res=>{
  //   console.log(res)
  //   console.log("SENT")
  // }).catch((e)=>console.log(e))

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    toast(payload.notification?.body);
  })
},[user?.uid])
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
          {/* <Route
            path="/userProfile"
            element={
              <ProtectedRoutes>
                <UserProfile/>
              </ProtectedRoutes>
            }
          /> */}
          <Route
            path="/userProfile/:userId"
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
                <ChangPassword />
              </ProtectedRoutes>
            }
          />
          {/* <Route
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
          /> */}
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
