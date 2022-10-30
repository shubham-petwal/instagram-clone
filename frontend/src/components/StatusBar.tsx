import React from 'react'
import StatusStories from './StatusStories'
import { StatusBarContainer } from './styledComponents/StatusBar.style'
import ring from "../assets/images/storyRing.png"
function StatusBar() {
  let rows = [];
  for (let i = 0; i <=10; i++) {
    rows.push(<StatusStories key={Math.random()} ringImage={ring} Ringwidth="65" Ringheight="65" width="60" height="60" />);
  }
  return (
    <StatusBarContainer>
      <ul>
        {rows.map((item)=>(
          item
        ))}
         </ul>
    </StatusBarContainer>
  )
}
export default StatusBar