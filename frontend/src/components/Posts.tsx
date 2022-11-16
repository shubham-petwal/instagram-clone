import { Avatar } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
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
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { async } from "@firebase/util";
import redHeart from "../assets/images/red-heart-icon.svg";

interface PostInterFace {
  postImage: string;
  caption: string;
  postId: string;
  userId: string;
}

function Posts({ postImage, caption, postId, userId }: PostInterFace) {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [liked,setLiked] = useState(false);
  const [likesArrayDetails, setLikesArrayDetails] = useState<any>();
  const [modalState, setModalState] = useState(false);
  const [userRetrievedData, setRetrievedData] = useState<any>();
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

  const getData = async () => {
    const collectionRef = query(
      collection(db, `post_interaction/${postId}/likes`)
    );
    const unsubscribeLikesDetails = onSnapshot(collectionRef, (querySnapshot) => {
      const likesDetails: any = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        likesDetails.push(doc.data());
      });
      setLikesArrayDetails(likesDetails);
    });
  };

  // if(user?.uid){
  //   const unsub = onSnapshot(doc(db, `post_interaction/${postId}/likes/${user?.uid}`), (doc) => {
  //     // console.log("Current data: ", doc.data());
  //     if(doc.data()){
  //       setLiked(true)
  //     }
  //     else{
  //       setLiked(false)
  //     }
  // });
  // }

  useEffect(() => {
    getData();
    let userData;
    axios
      .get(`http://localhost:90/users/${userId}`)
      .then((res) => {
        userData = res.data.data;
        // imageUrl = userData.profileImage;
        setRetrievedData(userData);
      })
      .catch((error) => {
        console.log(error);
      });
      if(user?.uid){
        const unsub = onSnapshot(doc(db, `post_interaction/${postId}/likes/${user?.uid}`), (doc) => {
          // console.log("Current data: ", doc.data());
          if(doc.data()){
            setLiked(true)
          }
          else{
            setLiked(false)
          }
      });
      }
    const unsubscribe = onSnapshot(
      doc(db, "post_interaction", postId),
      (doc) => {
        setTotalComments(doc.data()?.comments_count);
        setTotalLikes(doc.data()?.likes_count);
      }
    );
  },[]);
console.log(liked)
  function handlePostClick(event: React.MouseEvent<HTMLElement>) {
    setModalState((prev) => {
      return !prev;
    });
  }
  const handleLikePost = async () => {
    const result = await axios.post("http://localhost:90/like", {
      likedBy_userId: user?.uid,
      postId: postId,
    });
  };
  return (  
    <PostContainer>
      <PostHeader>
        <UserDetailsContainer>
          <Avatar src={userRetrievedData?.profileImage} />
          <div>
            <span style={{cursor:"pointer"}} onClick={()=>{navigate(`/userProfile/${userId}`)}}>{userRetrievedData?.userName}</span>
          </div>
        </UserDetailsContainer>
        <div>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </PostHeader>
      <PostImageDiv>
        <img src={postImage} alt="imageI" onDoubleClick={handleLikePost} />
      </PostImageDiv>
      <LikeCommentShareDiv>
        <ThreeIconsDiv>
          {liked?
            <img onClick={handleLikePost} src={redHeart} />
         :
            <FontAwesomeIcon onClick={handleLikePost} icon={faHeart} />
          }

          <FontAwesomeIcon icon={faComment} />
          <FontAwesomeIcon icon={faShareSquare} />
        </ThreeIconsDiv>
        <div>
          <FontAwesomeIcon icon={faBookmark} />
        </div>
      </LikeCommentShareDiv>
      <LikesDiv>
        <span>{totalLikes?totalLikes : 0} likes</span>
      </LikesDiv>
      <DescriptionDiv>
        <span id="userName" style={{cursor:"pointer"}} onClick={()=>{navigate(`/userProfile/${userId}`)}}>{userRetrievedData?.userName}</span>
        <span>{caption}</span>
      </DescriptionDiv>
      <CommentsDiv>
        <span onClick={handlePostClick}>
          View all {totalComments ? totalComments : 0} Comments
        </span>
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
        postImage={postImage}
        profileImage={userRetrievedData?.profileImage}
        caption={caption}
        userName={userRetrievedData?.userName}
        liked = {liked}
        userId = {userId}
      />
    </PostContainer>
  );
}

export default Posts;
