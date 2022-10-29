import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import subh from "../assets/images/shubham.jpg";
import Navbar from "./Navbar";
import {
  EditProfileContainer,
  EditProfileMainContainer,
  FormInput,
  InputDiv,
  LabelDiv,
  LeftEditPage,
  PersonalInformation,
  RightChangePassword,
  RightEditPage,
} from "./styledComponents/EditProfile.style";
function EditProfile() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <EditProfileMainContainer>
        <EditProfileContainer>
          <LeftEditPage height="152.3vh">
            <div>
              <span>Edit Profile</span>
              <span onClick={() => navigate("/ChangePass")}>
                Change password
              </span>
            </div>
          </LeftEditPage>
          <RightEditPage>
            <div>
              <Avatar src={subh} />
            </div>
            <form>
              <LabelDiv>
                <label>Name</label>
              </LabelDiv>
              <InputDiv>
                <input type="text" placeholder="Name of User" />
                <p>
                  You are using the same name on Instagram and Facebook. Go to
                  Facebook to change your name. Change Name
                </p>
              </InputDiv>
              <LabelDiv>
                <label>Username</label>
              </LabelDiv>
              <InputDiv>
                <input type="text" placeholder="Name of User" />
                <p>
                  In most cases, you'll be able to change your username back to
                  shubham_petwal_ for another 14 days. Learn more
                </p>
              </InputDiv>
              <LabelDiv>
                <label>Website</label>
              </LabelDiv>
              <InputDiv>
                <input type="text" placeholder="Website" />
                <p>
                  Editing your links is only available on mobile. Visit the
                  Instagram app and edit your profile to change the websites in
                  your bio.
                </p>
              </InputDiv>
              <LabelDiv>
                <label>Bio</label>
              </LabelDiv>
              <InputDiv>
                <textarea maxLength={150} />
                <p>
                  You are using the same name on Instagram and Facebook. Go to
                  Facebook to change your name. Change Name
                </p>
              </InputDiv>

              <LabelDiv>
                <label></label>
              </LabelDiv>
              <InputDiv>
                <h3>Personal information</h3>
                <p>
                  Provide your personal information, even if the account is used
                  for a business, pet or something else. This won't be part of
                  your public profile.
                </p>
              </InputDiv>

              <LabelDiv>
                <label>Email address</label>
              </LabelDiv>
              <InputDiv>
                <input type="text" />
              </InputDiv>
              <LabelDiv>
                <label>Phone number</label>
              </LabelDiv>
              <InputDiv>
                <input type="text" />
              </InputDiv>
              <LabelDiv>
                <label>Gender</label>
              </LabelDiv>
              <InputDiv>
                <input type="text"/>
              </InputDiv>

              <LabelDiv>
                <label>Similar account suggestions</label>
              </LabelDiv>
              <InputDiv style={{ "display":"flex" }}>
                <input type="checkbox" />
                <span>
                  Include your account when recommending similar accounts that
                  people might want to follow.[?]
                </span>
              </InputDiv>
              <LabelDiv id="submit">
                <button>Submit</button>
              </LabelDiv>
            </form>
          </RightEditPage>
        </EditProfileContainer>
      </EditProfileMainContainer>
    </div>
  );
}

export default EditProfile;
