import { useState, useEffect, useContext, useRef } from "react";
import {
  ModalBackdrop,
  ModalWrapperDiv,
  ImageWrapperDiv,
  DetailsWrapperDiv,
  ModalCloseButton,
  AuthorProfileDiv,
  CommentsWrapperDiv,
  ActionIconsDiv,
  CommentInput,
  CommentDiv,
} from "./styledComponents/Modal.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import {
  faXmarkCircle,
  faHeart,
  faFaceSmile,
  faComment,
  faBookmark,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Avatar } from "@material-ui/core";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../db";
import redHeart from "../assets/images/red-heart-icon.svg";
import { sendNotification } from "../utilities/sendNotification";
import ReactPlayer from "react-player";

export function PostDetailModal(props: any) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const user = useContext(AuthContext);
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [commentsArray, setcommentsArray] = useState<any[]>([]);
  const [comment, setComment] = useState("");
  const chatRef = useRef<any>(null);

  const data = {
    userId: user?.uid,
    commentData: comment,
    postId: props.postId,
  };
  const handleAddComments = async () => {
    try {
      // chatRef.current?.scrollIntoView();
      setLoading(true);
      const result = await axios.post("http://localhost:90/addComment", data);
      setLoading(false);
      setComment("");
      const token = props.fcm_token;
      if(token!=props.currentUserFcmToken){
        sendNotification(token,"Comment Notification",`${props.currentUserName} has commented on your post`,props.userId,props.currentUserProfileImage,props.postImage)
        console.log("Notification sent")
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  function isImage(url : any) {
    const regex = /.png|.jpg|.jpeg|.webp/;
    return regex.test(url);
  }  

  const handleLikePost = async () => {
    try{
      props.setLiked(!props.liked);
      const result = await axios.post("http://localhost:90/like", {
        likedBy_userId: user?.uid,
        postId: props.postId,
      });
      if(!props.liked){
        const token = props.fcm_token;
        if(token!=props.currentUserFcmToken){
          sendNotification(token,"Like Notification",`${props.currentUserName} has liked your post`,props.userId,props.currentUserProfileImage,props.postImage)
          console.log("Notification sent")
        }
      }
    }catch(err){
      props.setLiked(!props.liked);
    }
  };

  function handleClick() {
    props.setModal(props.modalState);
  }

  const getData =  () => {
    const collectionRef = query(
      collection(db, `post_interaction/${props.postId}/comments`),orderBy("createdAt","asc")
    );
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const commentsDetails: any = [];
      querySnapshot.forEach((doc) => {
        commentsDetails.push(doc.data());
      });
      setcommentsArray(commentsDetails);
    });
    return unsubscribe;
  };
  const getTotalLikesAndComments = ()=>{
    const unsubscribe = onSnapshot(
      doc(db, "post_interaction", props.postId),
      (doc) => {
        setTotalComments(doc.data()?.comments_count);
        setTotalLikes(doc.data()?.likes_count);
      }
    );
    return unsubscribe;
  }

  useEffect(() => {
    const dataUnsbscription =  getData();
    const likesUnsbscription = getTotalLikesAndComments();
    return ()=>{
      dataUnsbscription()
      likesUnsbscription();
    }
  }, []);
  
  useEffect(()=>{
    chatRef.current?.scrollIntoView();
  },[handleAddComments])
  return (
    <>
      {/* <button onClick={handleClick}>Click</button> */}
      {props.modalState && (
        <div>
          <ModalBackdrop>
            <ModalWrapperDiv>
              <ImageWrapperDiv>
                {isImage(props.postImage) ? 
                  <img src={props.postImage} />
                : 
                  <ReactPlayer
                    url={props.postImage}
                    controls
                    width="100%"
                    height="90%"
                    playing={false}
                  />
                }
              </ImageWrapperDiv>
              <DetailsWrapperDiv>
                <AuthorProfileDiv>
                  <div className="profile-img">
                    <img style={{objectFit : "cover"}} src={props.profileImage} alt="profile image" />
                  </div>
                  <div className="description">
                    <p className="user-name" style={{cursor:"pointer"}} onClick={()=>{navigate(`/userProfile/${props.userName}`)}}>{props.userName}</p>
                    <p>Lucknow</p>
                  </div>
                  <div className="ellipsis">
                  </div>
                </AuthorProfileDiv>
                <CommentsWrapperDiv>
                  <CommentDiv>
                    <div className="profile-img">
                      <img  style={{objectFit : "cover"}} src={props.profileImage} alt="profile image" />
                    </div>
                    <div>
                      <p className="comment-data">
                        <span className="userName" style={{cursor:"pointer"}} onClick={()=>{navigate(`/userProfile/${props.userName}`)}} >{props.userName}</span>
                        {props.caption}
                      </p>
                      <p className="comment-info">
                        <span></span>
                      </p>
                    </div>
                    <div className="like-icon">
                    </div>
                  </CommentDiv>
                  {commentsArray ? (
                    commentsArray.map((commentDoc) => {
                      return (
                        <CommentDiv key={Math.random()} >
                          <div className="profile-img">
                            <img
                              src={commentDoc.commentBy_profileImage}
                              style={{objectFit : "cover"}} 
                            />
                          </div>
                          <div>
                            <p className="comment-data">
                              <span style={{cursor:"pointer"}} className="userName" onClick={()=>{navigate(`/userProfile/${commentDoc.commentBy_userName}`)}}>
                                {commentDoc.commentBy_userName}
                              </span>
                              {commentDoc.commentData}
                            </p>
                            <p className="comment-info">
                              <span>{commentDoc.createdAt}</span>
                            </p>
                          </div>
                          <div className="like-icon">
                            
                          </div>
                          <div ref={chatRef}/>
                        </CommentDiv>
                      );
                    })
                  ) : (
                    <p>No Comments</p>
                  )}
                </CommentsWrapperDiv>
                <ActionIconsDiv>
                  <div className="icon-wrapper">
                    <div className="left-icon">
                      {props.liked ? (
                        <img style={{cursor : "pointer"}} onClick={handleLikePost} src={redHeart} />
                      ) : (
                        <FontAwesomeIcon
                          onClick={handleLikePost}
                          icon={faHeart}
                        />
                      )}
                      <FontAwesomeIcon icon={faComment} />
                    </div>
                    <div className="bookmark-icon">
                    </div>
                  </div>
                  <div className="likes-wrapper">
                    <p>{totalLikes ? totalLikes : 0} likes</p>
                  </div>
                </ActionIconsDiv>
                <CommentInput>
                  <div className="emoji-icon">
                    <FontAwesomeIcon icon={faFaceSmile} />
                  </div>
                  <div className="input-div">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                  </div>
                  <div className="post-button">
                    {isLoading?
                    <button>
                      <Spinner animation="border" role="status" size="sm"/>
                    </button>:
                    <button onClick={handleAddComments}>Post</button>
                  }
                  </div>
                </CommentInput>
              </DetailsWrapperDiv>
            </ModalWrapperDiv>
          </ModalBackdrop>
          <ModalCloseButton>
            <FontAwesomeIcon onClick={handleClick} icon={faXmarkCircle} />
          </ModalCloseButton>
        </div>
      )}
    </>
  );
}
