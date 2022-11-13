import React, { useState } from "react";
import Stories from 'react-insta-stories'
import { useLocation, useNavigate } from "react-router-dom";
import { ShowStoryContainer } from "./styledComponents/ShowStory.style";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ShowStory() {
    const location = useLocation();
    const navigate = useNavigate()
    const [stories, setStories] = useState([{ url: location.state.url,header: {
        heading: location.state.userName,
        subheading: 'Posted 30m ago',
        profileImage: location.state.profileImage,
    },storyStyles: {margin:"100px"}
     }])
  return (
    <ShowStoryContainer>
      <Stories
        defaultInterval={1500}
        stories={stories}
        isPaused={true}
        onAllStoriesEnd={()=>navigate("/")}
        
      />
      {/* <FontAwesomeIcon id="cross"  icon={faCircleXmark} /> */}
    </ShowStoryContainer>
  );
}

export default ShowStory;
