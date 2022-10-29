import styled, { css } from "styled-components";
import { borderColor, pageBgColor } from "./utilityFiles/variables";
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
  /* align-items: center; */
  margin: auto;
  padding-top: 100px !important;
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
    justify-content: center;
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
  #topavatar{
    @media screen and (max-width: 740px) {
      padding-left:12px;
  }
  }
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
  padding-left: 30px;
  border: 1px solid ${borderColor};
  border-left: none;
  /* padding-bottom: 30px; */
  @media screen and (max-width: 739px) {
      width: 100% !important;
      margin-top:-5px;
  }
`;
export const LabelDiv = styled.div`
  width: 25%;
  float: left;
  margin-top: 30px;
  margin-left: 15px;
  @media screen and (max-width: 739px) {
      width: 100% !important;
      margin-left:3px;
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
  input[type="text"] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    border-radius: 7px;
    background: #f8f8f8;
    @media screen and (max-width: 739px) {
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
`;
