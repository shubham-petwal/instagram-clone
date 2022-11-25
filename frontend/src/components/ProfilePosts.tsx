import React, { useContext, useEffect, useState } from "react";
import { PostDetailModal } from "./PostDetailModal";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../db";
import ReactPlayer from "react-player";
import play_svg from "../assets/images/play_svg.svg";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProfilePosts(props: any) {
  function handlePostClick(event: React.MouseEvent<HTMLElement>) {
    setModalState((prev) => {
      return !prev;
    });
  }

  function isImage(url: any) {
    const regex = /.png|.jpg|.jpeg|.webp/;
    return regex.test(url);
  }

  const user = useContext(AuthContext);
  const [modalState, setModalState] = useState(false);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = onSnapshot(
        doc(db, `post_interaction/${props.postId}/likes/${user?.uid}`),
        (doc) => {
          // console.log("Current data: ", doc.data());
          if (doc.data()) {
            setLiked(true);
            return;
          } else {
            setLiked(false);
          }
        }
      );
      return unsubscribe;
    }
  }, []);
  return (
    <div>
      {isImage(props.postImage) ? (
        <img
          onClick={handlePostClick}
          height={props.height}
          width={props.width}
          src={props.postImage}
          alt=""
          style = {{cursor : "pointer"}}
        />
        ) : (
          <div
          onClick={handlePostClick}
          style={{
            width: props.width,
            height: props.height,
            margin: "auto",
            position: "relative",
            top: 0,
            left: 0,
            cursor : "pointer"
          }}
          >
          {/* <ReactPlayer
            url={props.postImage}
            width={"100%"}
            height={"100%"}
            playing={false}
            style={{
              position: "relative",
              top: 0,
              left: 0,
            }}
          /> */}
          <img
            onClick={handlePostClick}
            height={props.height}
            width={props.width}
            src={props.thumbnailImage}
            alt=""
            style={{
              position: "relative",
              top: 0,
              left: 0,
            }}
          />
          <FontAwesomeIcon
            icon={faPlay}
            style={{ position: "absolute", top: "40%", left: "43%",fontSize:"60px",color:"white" }}
          />
        </div>
      )}
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
        liked={liked}
        userId={props.userId}
      />
    </div>
  );
}

export default ProfilePosts;
