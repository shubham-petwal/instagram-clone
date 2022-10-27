import React from "react";
import {
  UserProfileContainer,
  UserDataSection,
  UserHighlightSection,
  UserInfoContainer,
  EditAndSettingsDiv,
} from "./styledComponents/UserProfile.style";
import Navbar from "./Navbar";
import { Avatar } from "@material-ui/core";
import subh from "../assets/images/shubham.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
function UserProfile() {
  return (
    <>
      <Navbar />
      <UserProfileContainer>
        <UserDataSection>
          <div>
            <Avatar id="userProfileAvatar" src={subh} />
          </div>
          <UserInfoContainer>
            <EditAndSettingsDiv>
              <p>shubham_petwal_</p>
              <button>Edit Profile</button>
              <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
            </EditAndSettingsDiv>
            <EditAndSettingsDiv>
              <div>
                <span>6 </span>
                posts
              </div>
              <div>
                <span>268 </span>
                followers
              </div>
              <div>
                <span>244 </span>
                following
              </div>
            </EditAndSettingsDiv>
            <EditAndSettingsDiv>
              <span>Shubham Petwal</span>
            </EditAndSettingsDiv>
          </UserInfoContainer>
        </UserDataSection>

        <UserHighlightSection>data</UserHighlightSection>
        <div>data</div>
      </UserProfileContainer>
    </>
  );
}

export default UserProfile;
