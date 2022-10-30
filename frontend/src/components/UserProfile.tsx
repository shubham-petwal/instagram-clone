import React from "react";
import {
  UserProfileContainer,
  UserDataSection,
  UserHighlightSection,
  UserInfoContainer,
  EditAndSettingsDiv,
  AllPostImages,
} from "./styledComponents/UserProfile.style";
import Navbar from "./Navbar";
import { Avatar } from "@material-ui/core";
import subh from "../assets/images/shubham.jpg";
import WhiteRing from "../assets/images/UserHighlightRing.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import StatusStories from "./StatusStories";
import { useNavigate } from "react-router-dom";
function UserProfile() {
  const navigate = useNavigate();
  let rows = [];
  for (let i = 0; i <= 10; i++) {
    rows.push(
      <StatusStories
        ringImage={WhiteRing}
        key={Math.random()}
        Ringwidth="85"
        Ringheight="85"
        width="80"
        height="80"
      />
    );
  }
  return (
    <div>
      <Navbar />
      <UserProfileContainer>
        <UserDataSection>
          <div>
            <Avatar id="userProfileAvatar" src={subh} />
          </div>
          <UserInfoContainer>
            <EditAndSettingsDiv>
              <p>shubham_petwal_</p>

              <button onClick={() => navigate("/editProfile")}>
                Edit Profile
              </button>

              <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
            </EditAndSettingsDiv>
            <EditAndSettingsDiv>
              <div>
                <span>6 </span>
                posts
              </div>
              <div>
                <span>268</span>
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

        <UserHighlightSection>
          <div id="userProfileHighlight">
            <ul>{rows.map((item) => item)}</ul>
          </div>
        </UserHighlightSection>
        <AllPostImages>
          <ul>
            <li key={Math.random()}>
              <img src={subh} height="280px" width="300px" />
            </li>
            <li key={Math.random()}>
              <img src={subh} height="280px" width="300px" />
            </li>
            <li key={Math.random()}>
              <img src={subh} height="280px" width="300px" />
            </li>
            <li key={Math.random()}>
              <img src={subh} height="280px" width="300px" />
            </li>
            <li key={Math.random()}>
              <img src={subh} height="280px" width="300px" />
            </li>
            <li key={Math.random()}>
              <img src={subh} height="280px" width="300px" />
            </li>
            <li key={Math.random()}>
              <img src={subh} height="280px" width="300px" />
            </li>
            <li key={Math.random()}>
              <img src={subh} height="280px" width="300px" />
            </li>
            <li key={Math.random()}>
              <img src={subh} height="280px" width="300px" />
            </li>
            <li key={Math.random()}>
              <img src={subh} height="280px" width="300px" />
            </li>
          </ul>
        </AllPostImages>
      </UserProfileContainer>
    </div>
  );
}

export default UserProfile;
