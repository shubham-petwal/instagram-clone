import styled, { css } from "styled-components";

export const PostContainer = styled.div`
  margin-top: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 470px;
  background: red;
  justify-content: center;
  align-items: center;
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
