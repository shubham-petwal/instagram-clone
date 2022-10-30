import React from 'react'
import shubh from "../assets/images/shubham.jpg"  
import { PostContainer } from './styledComponents/Posts.style'
function Posts() {
  return (
    <PostContainer>
        <img src={shubh} width="400px" height="550px" alt='imageI'/>
        <div className='like'>
            <p>Like</p>
            <p>comment</p>
            <p>Share</p>
        </div>
    </PostContainer>
  )
}

export default Posts;