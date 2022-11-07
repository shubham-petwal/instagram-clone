import { Avatar } from "@material-ui/core";
import React, { useState, useRef } from "react";
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
  const [emailState, setEmailState] = useState("");
  const [isActive, setIsActive] = useState(true);
  const handleClick = () => {
    setIsActive(!isActive);
    navigate("/editProfile");
  };

  async function handleFormSubmit() {
    try {
      if (emailState === "") {
        throw new Error("email is not provided");
      } else {
        const response = await auth.sendPasswordResetEmail(emailState);
        alert("Reset Password link is sent to your email");
        setEmailState("");
        console.log(response)
      }
    } catch (error) {
      console.log(error);
    }
  }

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
                    <label>Current email Address</label>
                  </LabelDiv>
                  <InputDiv style={{ marginTop: "42px" }}>
                    <input
                      value={emailState}
                      onChange={(event) => {
                        setEmailState(event.target.value);
                      }}
                      type="email"
                      required
                    />
                  </InputDiv>
                </div>
              </div>
              <InputDiv>
                <button onClick={handleFormSubmit}  type="submit">
                  Send Reset Password Link
                </button>
              </InputDiv>
              <LabelDiv>
                <label></label>
              </LabelDiv>
              <InputDiv
                onClick={() => {
                  navigate("/forgotPassword");
                }}
              >
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
