import { Avatar } from "@material-ui/core";
import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import subh from "../assets/images/shubham.jpg";
import Navbar from "./Navbar";
import { auth } from "../firebaseSetup";
import {
  LabelDiv,
  EditProfileContainer,
  EditProfileMainContainer,
  InputDiv,
  LeftEditPage,
  RightChangePassword,
  PageDetails,
} from "./styledComponents/EditProfile.style";
function ChangPassword() {
  const navigate = useNavigate();
  const oldPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const [isActive, setIsActive] = useState(true);
  const handleClick = () => {
    setIsActive(!isActive);
    navigate("/editProfile");
  };
  // const handleFormSubmit = async ()=>{
  //   const oldPassword = oldPasswordRef.current?.value || "";
  //   const newPassword = newPasswordRef.current?.value || "";
  //   const response = await auth.updateCurrentUser(auth.currentUser);
  //   console.log(response);
  // }

  return (
    <>
      <div>
        <Navbar />
        <EditProfileMainContainer>
          <EditProfileContainer>
            <LeftEditPage>
              <div>
                <span onClick={handleClick}>Edit Profile</span>
                <span
                  style={{
                    background: isActive ? "#f8f8f8" : "",
                    fontSize: isActive ? "22px" : "",
                    fontWeight: isActive ? "500" : "",
                  }}
                >
                  Change password
                </span>
              </div>
            </LeftEditPage>
            <RightChangePassword>
              <PageDetails>
                <p>Change Password</p>
              </PageDetails>
              <div id="topavatar">
                <LabelDiv>
                  <Avatar src={subh} id="Avatar" />
                </LabelDiv>
                <InputDiv>
                  <p>UserName</p>
                </InputDiv>
              </div>
              <div>
                <div id="row">
                  <LabelDiv>
                    <label>Old Password</label>
                  </LabelDiv>
                  <InputDiv>
                    <input ref={oldPasswordRef} type="text" />
                  </InputDiv>
                </div>
              </div>
              <div>
                <div id="row">
                  <LabelDiv>
                    <label>New password</label>
                  </LabelDiv>
                  <InputDiv>
                    <input ref={newPasswordRef} type="text" />
                  </InputDiv>
                </div>
              </div>
              <div>
                <div id="row">
                  <LabelDiv>
                    <label>Confirm new password</label>
                  </LabelDiv>
                  <InputDiv>
                    <input type="text" />
                  </InputDiv>
                </div>
              </div>
              <InputDiv>
                <button type="submit" >Change password</button>
              </InputDiv>
              <LabelDiv>
                <label></label>
              </LabelDiv>
              <InputDiv>
                <span id="forgotPassword">Forgotten your Password?</span>
              </InputDiv>
            </RightChangePassword>
          </EditProfileContainer>
        </EditProfileMainContainer>
      </div>
    </>
  );
}

export default ChangPassword;
