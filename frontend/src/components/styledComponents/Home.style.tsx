import styled, { css } from "styled-components";
import {
  borderColor,
  globalFacebookColor,
  pageBgColor,
  primaryFontColor,
} from "./utilityFiles/variables";

export const HomePageContainer = styled.div`
  display: flex;
  padding-top: 80px;
  justify-content: center;
  background: ${pageBgColor};
  min-height: 100vh;
  width: 100vw;
`;

export const SuggestionContainer = styled.div`
  color: black;
  background: white;
  width: 350px;
  margin-left: 30px;
border-radius: 10px;
  border: 1px solid ${borderColor};
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
export const SuggestionUserDetailsdiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5px 10px 5px;
  #details {
    display: flex;
    align-items: center;
    position: relative;
    font-size: 15px;
    #homeProfileImage {
      height: 60px;
      width: 60px;
      cursor: pointer;
    }
    #username{
      margin-left: 17px;
      font-weight: 500;
    }
    #fullName{
      margin-left: 17px;
      color: ${primaryFontColor};
    }
    #bluBtn{
      position: absolute;
      left: 40px;
      top: 40px;
      cursor: pointer;
    }
  }
  div {
    float: right;
    button {
      background: none;
      border: none;
      color: ${globalFacebookColor};
      font-size: 14px;
      font-weight: 600;
    }
  }
`;
