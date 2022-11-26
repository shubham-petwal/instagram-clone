import styled from "styled-components";
import {
  flexBoxStyles,
  globalFontFamily,
  commonContainer,
  w25,
  blueButtonStyles,
} from "./utilityFiles/styledFunctions";
import * as styledVariables from "./utilityFiles/variables";

const OrStrikeDiv = styled.div`
  ${flexBoxStyles("column")};
  font-size: 13px;
  font-weight: 600;
  margin: 18px 0;
  width: 73%;
  color: ${styledVariables.primaryFontColor};
  & > span {
    ${flexBoxStyles("row")};
    width: 99%;
    justify-content: space-between;
    &::before,
    &::after {
      content: "";
      height: 1px;
      background-color: #c9c9c9;
      display: inline-block;
      width: 42%;
    }
  }
`;
const InputStyled = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 8px 8px 8px 8px;
  text-overflow: hidden;
  background-color: ${styledVariables.pageBgColor};
  border: none;
  border-radius: 2px;
  &::placeholder {
    color: rgb(152, 152, 152);
    font-size: 12px;
  }
  &:focus {
    outline: none;
  }
`;
const InputWrapperDiv = styled.div`
  ${flexBoxStyles("row")};
  width: 73%;
  background-color: ${styledVariables.pageBgColor};
  border: 1px solid ${styledVariables.borderColor};
  margin: 4px 0 4px 0;
  .validationIcon {
    text-align: center;
    width: 15%;
    color: ${styledVariables.globalDangerColor};
  }
`;
const InfoDiv = styled.div`
  width: 73%;
  display: block;
  font-size: 12px;
  margin: 10px 40px;
  line-height: 16px;
  text-align: center;
  color: ${styledVariables.primaryFontColor};
`;

const SignUpFormWrapperDiv = styled.div`
  ${flexBoxStyles("column")};
  ${commonContainer()};
  ${w25()};
  img.signUpLogo {
    margin: 35px 0 15px 0;
    width: 170px;
  }
  p.signUpTitle {
    margin: 0 40px 20px 40px;
    text-align: center;
    color: ${styledVariables.primaryFontColor};
    font-size: 17px;
    font-weight: 600;
    line-height: 20px;
  }
  .signUpForm {
    ${flexBoxStyles("column")};
    width: 100%;
  }
`;
const SignUpButton = styled.button`
  ${blueButtonStyles("73%")};
  margin: 20px 0 30px 0;
  button{
    ${blueButtonStyles("73%")};
  }
`;
const LoginWithFacebookBtn = styled(SignUpButton)`
  //we are inheriting the styles of signup button
  span {
    margin: 0px 10px;
  }
  margin: 0;
`;

const LoginOptionDiv = styled.div`
  ${flexBoxStyles("row")};
  ${commonContainer()};
  ${w25()};
  height: 35px;
  font-size: 14px;
  background-color: white;
  color: ${styledVariables.secondaryFontColor} span {
    margin: 0 5px;
    color: ${styledVariables.globalFacebookColor};
  }
`;
const AppDownloadOptionDiv = styled.div`
  ${flexBoxStyles("column")};
  ${w25()};
  font-size: 14px;
  color: ${styledVariables.secondaryFontColor};
  margin: 20px 0;
  div.downloadLinkWrapper {
    ${flexBoxStyles("row")};
    margin: 20px;
    width: 85%;
    justify-content: space-evenly;
    a {
      width: 100%;
      height: 100%;
      cursor: pointer;
      img {
        width: 90%;
      }
    }
  }
`;

const SignUpPageWrapperDiv = styled.div`
  ${flexBoxStyles("column")};
  ${globalFontFamily};
  background-color: ${styledVariables.pageBgColor}; //need to change this color, just for testing purpose
  min-width: 390px;
  padding: 30px 0;
`;

export {
  SignUpPageWrapperDiv,
  SignUpFormWrapperDiv,
  LoginOptionDiv,
  AppDownloadOptionDiv,
  OrStrikeDiv,
  InputStyled,
  InputWrapperDiv,
  InfoDiv,
  SignUpButton,
  LoginWithFacebookBtn,
};
