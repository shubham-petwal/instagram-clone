import React from 'react'
import { StatusStoriesContainer } from './styledComponents/StatusStories.style'
import shubh from "../assets/images/shubham.jpg"
import ring from "../assets/images/storyRing.png"
function StatusStories({ringImage,Ringwidth,Ringheight,width,height}:any) {
  return (
    <StatusStoriesContainer>
        <div style={{"position":"relative"}}>
        <img src={ringImage} width={Ringwidth} height={Ringheight}/>
        <img src={shubh} id="main_image" width={width} height={height}/>
        </div>
        <p>Shubham_petwal_</p>
    </StatusStoriesContainer>
  )
}

export default StatusStories