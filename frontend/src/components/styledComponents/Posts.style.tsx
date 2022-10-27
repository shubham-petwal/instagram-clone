import styled, { css } from "styled-components";
import { borderColor } from "./utilityFiles/variables";

export const PostContainer = styled.div`
  margin-top: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 470px;
  background: white;
  justify-content: center;
  align-items: center;
  border: 1px solid ${borderColor};
  img {
    object-fit: cover;
  }

  .like{
    display: flex;  
    p{
        margin: 1rem;
    }
}
`;
