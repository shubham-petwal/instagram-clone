import { Avatar } from "@material-ui/core";
import React from "react";
import shubh from "../assets/images/shubham.jpg";
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

interface PostInterFace {
  src: string;
  caption: string;
}
function Posts({ src, caption }: PostInterFace) {
  return (
    <PostContainer>
      <PostHeader>
        <UserDetailsContainer>
          <Avatar src={src} />
          <div>
            <span>User_Name</span>
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
        <span id="userName">User_Name</span>
        <span>{caption}</span>
      </DescriptionDiv>
      <CommentsDiv>
        <span>View all 10 Comments</span>
      </CommentsDiv>
      <AddCommentsDiv>
      <FontAwesomeIcon icon={faSmile} />
        <input type="text" placeholder="Add a comment..." />
        <button>Post</button>
      </AddCommentsDiv>
    </PostContainer>
  );
}

export default Posts;
