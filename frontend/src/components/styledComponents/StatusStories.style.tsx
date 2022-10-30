import styled, { css } from "styled-components";

export const StatusStoriesContainer = styled.li`
  cursor: pointer;
  list-style: none;
  width: 70px;
  height: 90px;
  margin-top: 18px;
  margin-right: 12px;
  img {
    border-radius: 50%;
    object-fit:cover;
  }
  #main_image {
    position: absolute;
    top: 2.5px;
    left: 2.5px;
    z-index: 1;
  }
  p {
    box-sizing: border-box;
    display: block;
    max-width: 64px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 5px;
    font-size: 10px;
  }
`;
