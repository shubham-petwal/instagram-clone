import styled, { css } from "styled-components";
import { borderColor, globalFacebookColor, primaryFontColor } from "./utilityFiles/variables";

export const PostContainer = styled.div`
  margin-bottom: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  max-width: 470px;
  background: white;
  justify-content: center;
  font-size: 14px;
  /* align-items: center; */
  border: 1px solid ${borderColor};
  @media screen and (max-width: 475px) {
    /* width: auto; */
    width: 370px;
    display: flex;
    /* align-items: center; */
    overflow-y: hidden;
  }
`;

export const PostImageDiv = styled.div`
  img {
    object-fit: contain;
    max-height: 500px;
    width: 100%;
  }
`;

export const PostHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0px 15px 0px 10px;
  border-bottom: 1px solid ${borderColor};
`;
export const UserDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  text-overflow: ellipsis;
  img {
    width: 60px;
  }
  span {
    margin-left: 10px;
    font-weight: 500;
    display: block;
    max-width: 350px;
    overflow: hidden;
  }
`;

export const LikeCommentShareDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 0px 0px 10px;
  align-items: center;
  svg {
    padding-right: 15px;
    height: 25px;
    cursor: pointer;
    :hover{
      opacity: 0.4;
    }
  }
  span{
    padding-top: 5px;
  }
`;
export const ThreeIconsDiv = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  img{
    width: 26px;
    margin-right: 14px;
    cursor: pointer;
    :hover{
      opacity: 0.6;
    }
    /* margin-left: 8px; */
  }
`;
export const LikesDiv = styled.div`
  padding: 0px 0px 0px 10px;
  font-weight: 600;
`;
export const DescriptionDiv = styled.div`
  padding: 3px 0px 3px 10px;
  display: flex;
  /* background: red; */
  #userName {
    font-weight: 600;
    margin-right: 5px;
  }
`;
export const CommentsDiv = styled.div`
  padding: 3px 0px 3px 10px;
  font-size: 14px;
  color:${primaryFontColor};
  span{
    cursor: pointer;
  }
`;

export const AddCommentsDiv = styled.div`
margin-top: 12px;
border-top: 1px solid ${borderColor};
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 0px 3px 10px;
  input{
    width: 100%;
    border: none;
    text-overflow: ellipsis;

    outline: none;
  &::placeholder {
    opacity: 0.7;
  }
  }
  svg{
    padding-right: 15px;
    height: 25px;
  }
  button {
    border: none;
    background: none;
    margin-right:10px;
    width: 50px;
    color: ${globalFacebookColor};
    font-weight: 600;
  }
`