import React from 'react'
import { StatusStoriesContainer } from './styledComponents/StatusStories.style'
import shubh from "../assets/images/shubham.jpg"
import ring from "../assets/images/storyRing.png"
function StatusStories() {
  return (
    <StatusStoriesContainer>
        <div style={{"position":"relative"}}>
        <img src={ring} width="65" height="65"/>
        <img src={shubh} id="main_image" width="60" height="60"/>
        </div>
        <p>Shubham_petwal_</p>
    </StatusStoriesContainer>
  )
}

export default StatusStories