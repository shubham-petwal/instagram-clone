import styled from "styled-components";
import { globalFacebookColor } from "./utilityFiles/variables";

const modalDivisions = `
    min-width: 50%;
    height: 100%;
    padding: 20px;
`;
const detailsWrapperDivisions = `
    width: 100%;
    padding: 6px 8px;
    display: grid;
    grid-template-columns: 1fr 8fr 1fr;
    grid-template-rows: 1;
`;
const imageWrapperDiv = `
    width: 45px;
    height: 45px;
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c0c0c0;
    img{
        width: 100%;
        object-fit: contain;
    }
`;

export const ModalBackdrop = styled.div`
font-size: 15px;
  width: 100vw;
  height: 100vh;
  background-color: #414141c0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
export const ModalWrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  overflow: hidden;
`;
export const ImageWrapperDiv = styled.div`
  ${modalDivisions}
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    /* display: block; */
    max-width: 100%;
    max-height: 100%;
    /* margin: auto; */
  }
`;
export const DetailsWrapperDiv = styled.div`
  ${modalDivisions}
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
export const ModalCloseButton = styled.button`
  position: fixed;
  top: 4%;
  right: 2%;
  font-size: 30px;
  border: none;
  background: none;
  color: white;
  z-index: 100;
`;
export const AuthorProfileDiv = styled.div`
  ${detailsWrapperDivisions}
  border-bottom: 1px solid #c7c7c7;
  padding: 10px 8px 10px 8px;
  min-height: 70px;
  max-height: 70px;
  div.profile-img {
    ${imageWrapperDiv}
  }
  div.description {
    p {
      margin: 0;
    }
    p.user-name {
      font-weight: 700;
    }
  }
  div.ellipsis {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const CommentsWrapperDiv = styled.div`
  border-bottom: 1px solid #c7c7c7;
  width: 100%;
  /* border: 1px solid red; */
  min-height: 160px;
  flex: 1;
  overflow: auto;
`;
export const CommentDiv = styled.div`
  margin: 0 0 10px 0;
  ${detailsWrapperDivisions}
  min-height: 55px;
  padding-bottom: 0;
  .like-icon {
    font-size: 16px;
    margin: 5px auto 0 auto;
  }
  div.profile-img {
    ${imageWrapperDiv}
    
  }
  span.userName {
    margin: 0 10px 0 0;
    font-weight: 700;
  }
  p {
    margin-bottom: 5px;
  }
  p.comment-info > span {
    color: #969696;
    font-size: 14px;
    margin-right: 15px;
  }
`;
export const ActionIconsDiv = styled.div`
  width: 100%;
  padding: 2px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid #c7c7c7;
  max-height: 90px;
  min-height: 90px;
  div.icon-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    font-size: 25px;
    svg {
      margin: 10px;
      cursor: pointer;
      :hover{
        opacity: 0.4;
      }
    }
    img{
    width: 26px;
    margin-left: 9px;
    margin-right: 9px;
  }
  }
  div.likes-wrapper {
    width: 100%;
    padding: 0 10px 10px 14px;
    color: #3d3d3d;
    display: flex;
    align-items: center;
    p{
        margin: 0;
        display: inline-block;
        font-weight: 700;
    }
    img{
        display: inline-block;
        height: 25px;
        border-radius: 20px;
        margin-right: 15px;
        /* width: 100%; */
    }
  }
`;
export const CommentInput = styled.div`
  ${detailsWrapperDivisions}
  max-height: 50px;
  min-height: 50px;
  div.emoji-icon {
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div.input-div {
    display: flex;
    align-items: center;
    justify-content: center;
    input[type="text"] {
      border: none;
      background-color: white;
      width: 90%;
      height: 100%;
      :focus {
        outline: none;
      }
    }
  }
  div.post-button {
    button {
      border: none;
      width: 100%;
      height: 100%;
      background-color: transparent;
      color: ${globalFacebookColor};
    }
  }
`;
