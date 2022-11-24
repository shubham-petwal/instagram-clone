import styled from "styled-components";
import { borderColor } from "./utilityFiles/variables";

export const StatusBarContainer = styled.div`
position: relative;
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
    /* display: flex;
    margin-left: -20px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none; */




    display: flex;
  align-items: center;
  list-style: none;
  max-width: 100%;
  overflow-x: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    background: transparent; /* make scrollbar transparent */
    -webkit-appearance: none;
    width: 0;
    height: 0;
  }
  }
  ul::-webkit-scrollbar {
    display: none;
}

#right_arrow{
  background: white;
  border-radius: 50%;
  position: absolute;
  right: 0;
  margin-right: 20px;
  z-index: 1;
  cursor: pointer;
  float: right;
  justify-content: right;
}
#left_arrow{
  background: white;
  border-radius: 50%;
  position: absolute;
  margin-left: 20px;
  z-index: 1;
  cursor: pointer;
  float: right;
  justify-content: right;
}
`;
