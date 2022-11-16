import React, { useState } from "react";
import { PostDetailModal } from "./PostDetailModal";

function ProfilePosts(props: any) {
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
    <div >
      <img
      onClick={handlePostClick}
        height={props.height}
        width={props.width}
        src={props.postImage}
        alt=""
      />
      <PostDetailModal
        modalState={modalState}
        setModal={(prev: boolean) => {
          setModalState(!prev);
        }}
        postId={props.postId}
        postImage={props.postImage}
        profileImage={props.profileImage}
        caption={props.caption}
        userName={props.userName}
        userId = {props.userId}
      />
    </div>
  );
}

export default ProfilePosts;
