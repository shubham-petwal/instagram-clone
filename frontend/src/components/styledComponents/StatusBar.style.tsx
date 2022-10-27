import styled from "styled-components";
import { borderColor } from "./utilityFiles/variables";

export const StatusBarContainer = styled.div`
  width: 470px;
  height: 120px;
  border-radius: 10px;
  background:white;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid ${borderColor};
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
