import React, { useState } from 'react'
import { PostDetailModal } from './PostDetailModal';

function ProfilePosts(props:any) {
    // function handleClick(){
    //     props.getId(props.postId)
    // }
    function handlePostClick(event: React.MouseEvent<HTMLElement>) {
      setModalState((prev) => {
        return !prev;
      });
    }
    const [modalState, setModalState] = useState(false);
  return (
    <div onClick={handlePostClick} >
        <img height={props.height} width={props.width} src={props.postImage} alt="" />
        <PostDetailModal
                      modalState={modalState}
                      setModal={(prev: boolean) => {
                        setModalState(!prev);
                      }}
                      postId={props.postId}
                      postImage = {props.postImage}
                      caption = {props.caption}
                      userName = {props.userName}
                    />
    </div>
  )
}

export default ProfilePosts



