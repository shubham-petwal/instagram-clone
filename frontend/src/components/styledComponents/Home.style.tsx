import styled, { css } from "styled-components";
import { borderColor, pageBgColor } from "./utilityFiles/variables";

export const HomePageContainer = styled.div`
  display: flex;
  padding-top: 80px;
  justify-content: center;
  background:${pageBgColor};
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