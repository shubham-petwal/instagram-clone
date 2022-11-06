import React from 'react'
import shubh from "../assets/images/shubham.jpg"  
import { PostContainer } from './styledComponents/Posts.style'
interface PostInterFace{
  src:string;
  caption:string
}
function Posts({src,caption}:PostInterFace) {
  return (
    <PostContainer>
        <img src={src} width="400px" height="550px" alt='imageI'/>
        <div className='like'>
            <p>Like</p>
            <p>comment</p>
            <p>Share</p>
        </div>
        <div>
          <p>{caption}</p>
        </div>
    </PostContainer>
  )
}

export default Posts;