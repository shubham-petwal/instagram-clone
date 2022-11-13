import React, { useState } from 'react'
import { StatusStoriesContainer } from './styledComponents/StatusStories.style'
import shubh from "../assets/images/shubham.jpg"
import ring from "../assets/images/storyRing.png"
import { useNavigate } from 'react-router-dom';


function StatusStories({Ringwidth,Ringheight,width,height,storyImage,userName,profileImage,createdAt}:any) {
  const navigate = useNavigate();
  // console.log(createdAt.seconds-parseInt(last))
  const toComponentB=()=>{
    navigate('/showStory',{state:{url:storyImage,userName:userName,profileImage:profileImage}});
      }
  return (
    <StatusStoriesContainer onClick={()=>{toComponentB()}} >
        <div style={{"position":"relative"}} >
        <img src={ring} width={Ringwidth} height={Ringheight}/>
        <img src={storyImage} id="main_image" width={width} height={height}/>
        </div>
        <p>{userName}</p>

    </StatusStoriesContainer>
  )
}

export default StatusStories