import React, { useState } from 'react'
import { StatusStoriesContainer } from './styledComponents/StatusStories.style'
import ring from "../assets/images/storyRing.png"
import { useNavigate } from 'react-router-dom';


function StatusStories({Ringwidth,Ringheight,width,height,storyImage,userName,profileImage,createdAt,nav}:any) {
  const navigate = useNavigate();
  const toComponentB=()=>{
    navigate('/showStory',{state:{url:storyImage,userName,profileImage,createdAt,nav}});

      }
  return (
    <>
    <StatusStoriesContainer onClick={()=>{toComponentB()} } id="user_story_list" >
        <div style={{"position":"relative"}} >
        <img src={ring} width={Ringwidth} height={Ringheight}/>
        <img src={storyImage} id="main_image" width={width} height={height}/>
        </div>
        <p>{userName}</p>
    </StatusStoriesContainer>

    </>
  )
}

export default StatusStories