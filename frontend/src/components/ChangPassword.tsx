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
  PageDetails,
} from "./styledComponents/EditProfile.style";
function ChangPassword() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const handleClick = () => {
    setIsActive(!isActive);
    navigate("/editProfile");
  };
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
                    "background": isActive ? "#f8f8f8" : "",
                    "fontSize": isActive ? "22px" : "",
                    "fontWeight": isActive ? "500":"",
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
