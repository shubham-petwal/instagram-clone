import React from 'react'
import StatusStories from './StatusStories'
import { StatusBarContainer } from './styledComponents/StatusBar.style'
import ring from "../assets/images/storyRing.png"
function StatusBar() {
  return (
    <StatusBarContainer>
      <ul>
      <StatusStories ringImage={ring} Ringwidth="65" Ringheight="65" width="60" height="60" />
      <StatusStories ringImage={ring} Ringwidth="65" Ringheight="65" width="60" height="60" />
      <StatusStories ringImage={ring} Ringwidth="65" Ringheight="65" width="60" height="60" />
      <StatusStories ringImage={ring} Ringwidth="65" Ringheight="65" width="60" height="60" />
      <StatusStories ringImage={ring} Ringwidth="65" Ringheight="65" width="60" height="60" />
      <StatusStories ringImage={ring} Ringwidth="65" Ringheight="65" width="60" height="60" />
      <StatusStories ringImage={ring} Ringwidth="65" Ringheight="65" width="60" height="60" />
      <StatusStories ringImage={ring} Ringwidth="65" Ringheight="65" width="60" height="60" />
      <StatusStories ringImage={ring} Ringwidth="65" Ringheight="65" width="60" height="60" />
      <StatusStories ringImage={ring} Ringwidth="65" Ringheight="65" width="60" height="60" />
      </ul>
    </StatusBarContainer>
  )
}
export default StatusBar