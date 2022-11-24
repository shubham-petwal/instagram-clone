import React, { useState } from "react";
import { StatusStoriesContainer } from "./styledComponents/StatusStories.style";
import ring from "../assets/images/storyRing.png";
import play_svg from "../assets/images/play_svg.svg";
import { useNavigate } from "react-router-dom";

function isImage(url: any) {
  const regex = /.png|.jpg|.jpeg/;
  return regex.test(url);
}

function StatusStories({
  Ringwidth,
  Ringheight,
  width,
  height,
  storyImage,
  userName,
  profileImage,
  createdAt,
  nav,
}: any) {
  const navigate = useNavigate();
  const toComponentB = () => {
    navigate("/showStory", {
      state: { url: storyImage, userName, profileImage, createdAt, nav },
    });
  };
  return (
    <>
      <StatusStoriesContainer
        onClick={() => {
          toComponentB();
        }}
        id="user_story_list"
      >
        <div style={{ position: "relative" }}>
          <img src={ring} width={Ringwidth} height={Ringheight} />
          {isImage(storyImage) ? (
            <img src={storyImage} id="main_image" width={width} height={height} />
          ) : (
            <img src={play_svg} id="main_image" width={width} height={height} />
          )}
        </div>
        <p>{userName}</p>
      </StatusStoriesContainer>
    </>
  );
}

export default StatusStories;
