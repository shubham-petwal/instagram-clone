import styled, { css } from "styled-components";
import { borderColor } from "./utilityFiles/variables";

export const PostContainer = styled.div`
  margin-top: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  max-width: 470px;
  background: white;
  justify-content: center;
  align-items: center;
  border: 1px solid ${borderColor};
  @media screen and (max-width: 475px) {
      /* width: auto; */
      width:370px;
      display: flex;
      align-items: center;
      overflow-y: hidden;
      }
  img {

    object-fit: contain;
  }

  .like{
    display: flex;  
    p{
        margin: 1rem;
    }
}
`;
