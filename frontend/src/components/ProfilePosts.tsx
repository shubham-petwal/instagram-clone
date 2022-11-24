import React, { useContext, useEffect, useState } from "react";
import { PostDetailModal } from "./PostDetailModal";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../db";

function ProfilePosts(props: any) {
  // function handleClick(){
  //     props.getId(props.postId)
  // }
  function handlePostClick(event: React.MouseEvent<HTMLElement>) {
    setModalState((prev) => {
      return !prev;
    });
  }
  const user = useContext(AuthContext);
  const [modalState, setModalState] = useState(false);
  const [liked,setLiked] = useState(false);
  useEffect(() => {
      if(user?.uid){
        const unsubscribe = onSnapshot(doc(db, `post_interaction/${props.postId}/likes/${user?.uid}`), (doc) => {
          // console.log("Current data: ", doc.data());
          if(doc.data()){
            setLiked(true)
            return
          }
          else{
            setLiked(false)
          }
        });
        return unsubscribe;
      }
  },[]);
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
        liked = {liked}
        userId = {props.userId}
      />
    </div>
  );
}

export default ProfilePosts;
