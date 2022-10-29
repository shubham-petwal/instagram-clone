import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import subh from "../assets/images/shubham.jpg";
import Navbar from "./Navbar";
import {
  LabelDiv,
  EditProfileContainer,
  EditProfileMainContainer,
  FormInput,
  InputDiv,
  LeftEditPage,
  PersonalInformation,
  RightChangePassword,
  RightEditPage,
} from "./styledComponents/EditProfile.style";
function ChangPassword() {
    const navigate = useNavigate();
  return (
    <>
        <div>
      <Navbar />
      <EditProfileMainContainer>
        <EditProfileContainer>
          <LeftEditPage height="100vh">
            <div>
              <span onClick={()=>navigate("/editProfile")}>Edit Profile</span>
              <span>Change password</span>
            </div>
          </LeftEditPage>
          <RightChangePassword>
            <div>
              <Avatar src={subh} />
              <p>UserName</p>
            </div>
            <div>
              <div id="row">
                <LabelDiv>
                  <label>Old Password</label>
                </LabelDiv>
                <InputDiv>
                  <input type="text" />
                </InputDiv>
              </div>
            </div>
            <div>
              <div id="row">
                <LabelDiv>
                  <label>New password</label>
                </LabelDiv>
                <InputDiv>
                  <input type="text" />
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
            <div>
                <input type="submit" value="Change Password"/>
            </div>
            <div id="forgotPassword">
                <span>Forgotten your Password?</span>
            </div>
          </RightChangePassword>

        
        </EditProfileContainer>
      </EditProfileMainContainer>
    </div>
    </>
  )
}

export default ChangPassword