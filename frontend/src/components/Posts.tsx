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
  profileImage:string;
  currentUserName:string;
  userName:string;
}

function Posts({ postImage, caption, postId, userId ,userName,profileImage,currentUserName}: PostInterFace) {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [userRetrievedData, setRetrievedData] = useState<any>();
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likesArrayDetails, setLikesArrayDetails] = useState<any>();
  const [modalState, setModalState] = useState(false);
  const user = useContext(AuthContext);


  const sendNotification = (token:string,Notifi_title:string,Notifi_body:string)=>{
    let body = {
      to: token,
      notification:{
        title: Notifi_title,
        body:Notifi_body,
        icon:"",
        click_action:"https://google.com"
      }
    }
    
    let options = {
      method: "POST",
      headers: new Headers({
        Authorization: "key=AAAAfnSlWp8:APA91bH-KZ3UngzLMme_8e9vDt4jEw-HvSOI_BOX361qxxsJAOrkXM3ehUiadPywIqNqBeKnokDOVJmKO8jKLVhS5_8k0UzflLx4CuAin2SbTw_tsDYSdH3f9a37YJ6mGG3AxIXoWsZO",
        "Content-Type":"application/json"
      }),
      body: JSON.stringify(body)
    }
    
    fetch("https://fcm.googleapis.com/fcm/send", options).then(res=>{
      console.log(res)
      console.log("SENT")
    }).catch((e)=>console.log(e))
  }


  const data = {
    userId: user?.uid,
    commentData: comment,
    postId: postId,
  };
  const handleAddComments = async () => {
    try {
      const result = await axios.post("http://localhost:90/addComment", data);
      setComment("");
      const token = userRetrievedData?.fcm_token;
      sendNotification(token,"Comment Notification",`${currentUserName} has Commented on your post`)
      console.log("Notification sent")
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const userData = await axios.get(
        `http://localhost:90/users/${userId}`
      );
      setRetrievedData(userData.data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getData = async () => {
    const collectionRef = query(
      collection(db, `post_interaction/${postId}/likes`)
    );
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const likesDetails: any = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        likesDetails.push(doc.data());
      });
      setLikesArrayDetails(likesDetails);
    });
    return unsubscribe;
  };

  useEffect(() => {
    getData();
    if (user?.uid) {
      const unsubscribe = onSnapshot(
        doc(db, `post_interaction/${postId}/likes/${user?.uid}`),
        (doc) => {
          // console.log("Current data: ", doc.data());
          if (doc.data()) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        }
      );
    }
    const unsubscribe = onSnapshot(
      doc(db, "post_interaction", postId),
      (doc) => {
        setTotalComments(doc.data()?.comments_count);
        setTotalLikes(doc.data()?.likes_count);
      }
    );

    getUserData()
  },[]);
  function handlePostClick(event: React.MouseEvent<HTMLElement>) {
    setModalState((prev) => {
      return !prev;
    });
  }
  const handleLikePost = async () => {
    const result = await axios.post("http://localhost:90/like", {
      likedBy_userId: user?.uid,
      postId: postId,
    })
    if(!liked){
      const token = userRetrievedData?.fcm_token;
      sendNotification(token,"Like Notification",`${currentUserName} has liked your post`)
      console.log("Notification sent")
    }
  };
  return (
    <PostContainer>
      <PostHeader>
        <UserDetailsContainer>
          <Avatar src={userRetrievedData?.profileImage} />
          <div>
            <span style={{cursor:"pointer"}} onClick={()=>{navigate(`/userProfile/${userName}`)}}>{userName}</span>
          </div>
        </UserDetailsContainer>
        <div>
  
        </div>
      </PostHeader>
      <PostImageDiv>
        <img src={postImage} alt="imageI" onDoubleClick={handleLikePost} />
      </PostImageDiv>
      <LikeCommentShareDiv>
        <ThreeIconsDiv>
          {liked ? (
            <img onClick={handleLikePost} src={redHeart} />
          ) : (
            <FontAwesomeIcon onClick={handleLikePost} icon={faHeart} />
          )}

          <span onClick={handlePostClick}>
            <FontAwesomeIcon icon={faComment} />
          </span>
          {/* <FontAwesomeIcon icon={faShareSquare} /> */}
        </ThreeIconsDiv>
        <div>
          {/* <FontAwesomeIcon icon={faBookmark} /> */}
        </div>
      </LikeCommentShareDiv>
      <LikesDiv>
        <span>{totalLikes ? totalLikes : 0} likes</span>
      </LikesDiv>
      <DescriptionDiv>
        <span id="userName" style={{cursor:"pointer"}} onClick={()=>{navigate(`/userProfile/${userName}`)}}>{userName}</span>
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
        userName={userName}
        liked = {liked}
        userId = {userId}
        fcm_token = {userRetrievedData?.fcm_token}
        currentUserName={currentUserName}

      />
    </PostContainer>
  );
}

export default Posts;
