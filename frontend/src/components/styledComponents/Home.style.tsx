import styled, { css } from "styled-components";
import { borderColor, globalFacebookColor, pageBgColor } from "./utilityFiles/variables";

export const HomePageContainer = styled.div`
  display: flex;
  padding-top: 80px;
  justify-content: center;
  background:${pageBgColor};
  width: 100vw;
`;

export const SuggestionContainer = styled.div`
  color: black;
  background:white;
  width:350px;
  margin-left:30px;
  border: 1px solid ${borderColor};
  @media screen and (max-width: 1000px) {
    display: none;
  }
`
export const SuggestionUserDetailsdiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  #details{
    display: flex;

    
  }
  span{
    float: right;
    button{
      background: none;
      border: none;
      color:${globalFacebookColor};
    }
  }
  
`