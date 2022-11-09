import { Avatar } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import shubh from "../assets/images/shubham.jpg";
import axios from "axios";
import {
  AddCommentsDiv,
  CommentsDiv,
  DescriptionDiv,
  LikeCommentShareDiv,
  LikesDiv,
  PostContainer,
  PostHeader,
  PostImageDiv,
  ThreeIconsDiv,
  UserDetailsContainer,
} from "./styledComponents/Posts.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faHeart,
  faSave,
  faShareSquare,
  faBookmark,
  faSmile,
} from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { Value } from "sass";
import { PostDetailModal } from "./PostDetailModal";
import { db } from "../db";
import { doc, onSnapshot } from "firebase/firestore";
import { async } from "@firebase/util";

interface PostInterFace {
  src: string;
  caption: string;
  postId: string;
  userName: string;
}

function Posts({ src, caption, postId, userName }: PostInterFace) {
  const [comment, setComment] = useState("");
  const [totalComments, setTotalComments] = useState("");
  const [modalState, setModalState] = useState(false);
  const user = useContext(AuthContext);
  const data = {
    userId: user?.uid,
    commentData: comment,
    postId: postId,
  };
  const handleAddComments = async () => {
    try {
      const result = await axios.post("http://localhost:90/addComment", data);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=>{
  //   const getData = async()=>{
  //     const res = await axios.get(`http://localhost:90/totalLikesAndComments/${postId}`)
  //     // console.log("Total Comments", res.data)
  //     setTotalComments(res.data.data)
  //   }
  //   getData();
  // },[])
  //when you call onSnapShot you will get unsubscribe function
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "post_interaction", postId),
      (doc) => {
        setTotalComments(doc.data()?.comments_count);
      }
    );
    return unsubscribe;
  }, []);

  function handlePostClick(event: React.MouseEvent<HTMLElement>) {
    setModalState((prev) => {
      return !prev;
    });
  }
  return (
    <PostContainer>
      <PostHeader>
        <UserDetailsContainer>
          <Avatar src={src} />
          <div>
            <span>{userName}</span>
          </div>
        </UserDetailsContainer>
        <div>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </PostHeader>
      <PostImageDiv>
        <img src={src} alt="imageI" />
      </PostImageDiv>
      <LikeCommentShareDiv>
        <ThreeIconsDiv>
          <FontAwesomeIcon icon={faHeart} />
          <FontAwesomeIcon icon={faComment} />
          <FontAwesomeIcon icon={faShareSquare} />
        </ThreeIconsDiv>
        <div>
          <FontAwesomeIcon icon={faBookmark} />
        </div>
      </LikeCommentShareDiv>
      <LikesDiv>
        <span>10 likes</span>
      </LikesDiv>
      <DescriptionDiv>
        <span id="userName">{userName}</span>
        <span>{caption}</span>
      </DescriptionDiv>
      <CommentsDiv>
        <span onClick={handlePostClick}>View all {totalComments} Comments</span>
      </CommentsDiv>
      <AddCommentsDiv>
        <FontAwesomeIcon icon={faSmile} />
        <input
          type="text"
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button onClick={handleAddComments}>Post</button>
      </AddCommentsDiv>
      <PostDetailModal
        key={Math.random()}
        modalState={modalState}
        setModal={(prev: boolean) => {
          setModalState(!prev);
        }}
        postId={postId}
        postImage={src}
        caption={caption}
        userName={userName}
      />
    </PostContainer>
  );
}

export default Posts;
