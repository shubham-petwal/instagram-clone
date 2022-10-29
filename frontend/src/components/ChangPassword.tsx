import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import subh from "../assets/images/shubham.jpg";
import Navbar from "./Navbar";
import {
  LabelDiv,
  EditProfileContainer,
  EditProfileMainContainer,
  InputDiv,
  LeftEditPage,
  RightChangePassword,
} from "./styledComponents/EditProfile.style";
function ChangPassword() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Navbar />
        <EditProfileMainContainer>
          <EditProfileContainer>
            <LeftEditPage>
              <div>
                <span onClick={() => navigate("/editProfile")}>
                  Edit Profile
                </span>
                <span>Change password</span>
              </div>
            </LeftEditPage>
            <RightChangePassword>
              <LabelDiv >
              <Avatar src={subh} />
              </LabelDiv>
              <InputDiv>
                
                <p>UserName</p>
              </InputDiv>
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
              <InputDiv>
                <input type="submit" value="Change Password" />
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
