import styled from "styled-components";

export const StatusBarContainer = styled.div`
  width: 470px;
  height: 120px;
  border-radius: 10px;
  background: whitesmoke;
  display: flex;
  align-items: center;
  overflow: hidden;
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
