import React, { useRef, useState } from "react";
import Stories from 'react-insta-stories'
import { Link, Router, useLocation, useNavigate } from "react-router-dom";
import { ShowStoryContainer } from "./styledComponents/ShowStory.style";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ShowStory() {
    const location = useLocation();
    const navigate = useNavigate()
    const locationRef = useRef<any>()
    var currentTime = Math.round(new Date().getTime()/1000); //milliSeconds to seconds
    const createdTime = location.state.createdAt.seconds
    const createdAtMinutes = Math.round((currentTime-createdTime)/60)
    const createdAtHrs = Math.round(createdAtMinutes/60)
    const [stories, setStories] = useState([{ url: location.state.url,header: {
        heading: location.state.userName,
        subheading: createdAtMinutes<60?`${createdAtMinutes} min ago `:`${createdAtHrs} hour ago`,
        profileImage: location.state.profileImage,
    }
     }])
  return (
    <ShowStoryContainer>
      <Stories
        defaultInterval={2000}
        stories={stories}
        isPaused={true}
        onAllStoriesEnd={()=>navigate(-1)}
      />
      {/* <FontAwesomeIcon id="cross"  icon={faCircleXmark} /> */}
      <Link ref={locationRef} to={`${location.state.nav}`}/>
    </ShowStoryContainer>
  );
}

export default ShowStory;
