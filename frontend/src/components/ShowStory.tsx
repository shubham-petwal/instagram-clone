import React, { useRef, useState } from "react";
import Stories from 'react-insta-stories'
import { Link, Router, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { ShowStoryContainer } from "./styledComponents/ShowStory.style";
import ReactPlayer from "react-player";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ShowStory() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationRef = useRef<any>();
  var currentTime = Math.round(new Date().getTime() / 1000); //milliSeconds to seconds
  const createdTime = location.state.createdAt.seconds;
  const createdAtMinutes = Math.round((currentTime - createdTime) / 60);
  const createdAtHrs = Math.round(createdAtMinutes / 60);
  const [stories, setStories] = useState([
    {
      url: location.state.url,
      header: {
        heading: location.state.userName,
        subheading:
          createdAtMinutes < 60
            ? `${createdAtMinutes} min ago `
            : `${createdAtHrs} hour ago`,
        profileImage: location.state.profileImage,
      },
    },
  ]);

  function isImage(url: any) {
    const regex = /.png|.jpg|.jpeg/;
    return regex.test(url);
  }
  return (
    <ShowStoryContainer>
      {isImage(stories[0].url) ? (
        <Stories
          defaultInterval={2000}
          stories={stories}
          isPaused={true}
          onAllStoriesEnd={() => locationRef.current.click()}
        />
      ) : (
        <ReactPlayer
          url={stories[0].url}
          controls
          width="360px"
          height="90%"
          playing={true}
          onEnded={() => {
            navigate(-1);
          }}
        />
      )}
      {/* <FontAwesomeIcon id="cross"  icon={faCircleXmark} /> */}
      <Link ref={locationRef} to={`${location.state.nav}`} />
    </ShowStoryContainer>
  );
}

export default ShowStory;
