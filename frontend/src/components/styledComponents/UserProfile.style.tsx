import styled, { css } from "styled-components";
import { borderColor, pageBgColor } from "./utilityFiles/variables";

export const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-wrap: wrap;
  flex-direction: column;
  padding-top: 80px;
  background: ${pageBgColor};
  min-height: 110vh;
  min-width: 100vw;
`;
export const UserDataSection = styled.div`
  margin-top: 15px;
  max-width: 950px;
  min-height: 150px;
  display: flex;

  flex-wrap: wrap;

  #userProfileAvatar {
    height: 150px;
    width: 150px;
    @media screen and (max-width: 608px) {
      height: 70px;
      width: 70px;
    }
    @media screen and (max-width: 439px) {
      margin: 0px 0px 10px 150px;
    }
  }
`;
export const UserInfoContainer = styled.div`
  margin-left: 100px;
  width: 350px;
  @media screen and (max-width: 600px) {
    margin-left: 20px;
  }
`;
export const EditAndSettingsDiv = styled.div`
  display: flex;
    div {
    @media screen and (max-width: 400px) {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  }
  flex-wrap: wrap;
  height: 55px;
  justify-content: space-between;
  p {
    font-size: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  button {
    border: 1px solid ${borderColor};
    height: 30px;
    border-radius: 5px;
    margin-top: 5px;
    font-weight: 400;
    background: none;
  }
  svg {
    height: 25px;
    margin-top: 6px;
  }
  span {
    font-weight: 600;
    font-size: 15px;
  }
`;

export const UserHighlightSection = styled.div`
  svg {
    height: 30px;
    cursor: pointer;
    padding: 55px 0 0 10px;
    opacity: 0.4;
    :hover {
      opacity: 0.5;
    }
  }
  display: flex;
  /* margin: 45px 0px 20px 0px; */
  padding: 25px 0px 20px 0px;
  max-width: 80vw;
  overflow-y: hidden;
  ul {
    width: 100%;
    display: flex;
    list-style: none;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding-bottom: 15px;
    li {
      /* margin-right: 30px; */
      width: 100%;
    }
  }
  ul::-webkit-scrollbar {
    display: none;
  }
  border-bottom: 1px solid ${borderColor};
`;

export const AllPostImages = styled.div`
  max-width: 62rem;
  display: flex;
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    li {
      margin: 10px 10px 10px 8px;
      img {
        object-fit: cover;
      }
      @media screen and (max-width: 438px) {
        margin-left: -20px;
      }
    }
    @media screen and (max-width: 670px) {
      flex-direction: column;
      align-items: center;
    }
    @media screen and (max-width: 984px) {
      align-items: center;
    }
    @media screen and (max-width: 985px) {
      max-width: 670px;
      display: flex;
      align-items: center;
      overflow-y: hidden;
    }
  }
`;
