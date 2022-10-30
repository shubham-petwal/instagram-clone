import styled from "styled-components";
import { borderColor } from "./utilityFiles/variables";

export const StatusBarContainer = styled.div`
  max-width: 470px;
  height: 120px;
  border-radius: 10px;
  background:white;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid ${borderColor};
  @media screen and (max-width: 475px) {
      /* width: auto; */
      width:370px;
      display: flex;
      align-items: center;
      overflow-y: hidden;
      }
  ul {
    display: flex;
    margin-left: -20px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  ul::-webkit-scrollbar {
    display: none;
}
`;
