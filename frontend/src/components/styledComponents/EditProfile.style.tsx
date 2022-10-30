import styled, { css } from "styled-components";
import { borderColor, globalFontFamily, pageBgColor, primaryFontColor } from "./utilityFiles/variables";
export const EditProfileMainContainer = styled.div`
  background: ${pageBgColor};
`;
interface Props {
  height: string;
}
export const EditProfileContainer = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: ${globalFontFamily};
  margin: auto;
  padding-top: 100px !important;
  #topavatar{
    height: 70px;
    p{
        font-weight: 500;
        font-size:16px;
        color: black;
      }
    @media screen and (max-width: 740px) {
      padding-left:12px;
      display: flex;
      width: fit-content;
      div{
        display: flex;
        align-items: center;
      }
      p{
        margin-top:30px;
        font-weight: 500;
        color: black;

      }
  }
  }
`;
export const LeftEditPage = styled.div`
  background: white;
  width: 30%;
  border: 1px solid ${borderColor};
  overflow-y: hidden;
  @media screen and (max-width: 950px) {
    display: none;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  span {
    justify-content: "center";
    align-items: center;
    margin-top: 10px;
    display: flex;
    /* justify-content: center; */
    padding-left:30px;
    font-weight: 400;
    width: 100%;
    font-size: 20px;
    height: 55px;
    cursor: pointer;
    :hover {
      background: #f8f8f8;
    }
    :active {
      background: #f8f8f8;
    }
  }
`;
export const RightEditPage = styled.div`
  width: 70%;
  height: 100%;
  background: white;
  border: 1px solid ${borderColor};
  border-left: none;
  padding-bottom: 30px;
  @media screen and (max-width: 740px) {
    form{
      display: flex;
      flex-direction: column;
      padding:0px 10px 0px 10px;
    }
    width: 100%;
    padding-left:10px;
    label{
      padding-bottom:-10px;
    }
  }

  #submit {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    button {
      background: #0095f6;
      border: #0095f6;
      border-radius: 5px;
      color: white;
    }
  }
`;

export const RightChangePassword = styled.div`
  width: 70%;
  min-height: 100vh;
  background: white;
  border: 1px solid ${borderColor};
  border-left: none;
  /* padding-bottom: 30px; */
  @media screen and (max-width: 754px) {
      width: 100% !important;
      margin-top:-5px;
  }
`;
export const LabelDiv = styled.div`
  width: 25%;
  float: left;
  text-align: right;
  margin-top: 30px;
  padding-right:10px;
  #Avatar{
float: right;
margin-right:5px;
  }
  @media screen and (max-width: 740px) {
      width: 100% !important;
      margin-left:3px;
      text-align: left;
      #Avatar{
float: left;
margin-right:5px;
  }
  }
  label {
    padding: 8px 8px 8px 0;
    font-weight: 700;
  }
`;
export const InputDiv = styled.div`
  width: 65%;
  float: left;
  margin-top: 30px;
  @media screen and (max-width: 740px) {
      width: 100% !important;
      margin-top:-3px;
  }
  textarea{
    width: 100%;
  }
  p{
    color: ${primaryFontColor};
    font-size:12px;
  }
  input[type="text"] {
    width: 100%;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    border-radius: 7px;
    background: #f8f8f8;
    @media screen and (max-width: 740px) {
      width: 100% !important;
  }
  }
  input[type="checkbox"] {
    margin-right: 10px;
  }
  input[type="submit"] {
    background-color: #0095f6;
    color: white;
    padding: 4px 4px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top:20px;
  }
  span {
    font-weight: 500;
  }
  #forgotPassword{
    font-weight: 500;
    color: #0095f6; 
  }
  a{
    text-decoration:none;
  }
`;
export const PageDetails = styled.div`
  width: 100%;
  display: flex;
  font-size: 20px;
  text-align:center;
  justify-content: center;
  align-items: center;
  padding-top:10px;
`
