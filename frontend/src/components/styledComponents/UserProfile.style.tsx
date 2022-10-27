import styled, { css } from "styled-components";
import { borderColor, pageBgColor } from "./utilityFiles/variables";

export const UserProfileContainer = styled.div`
  display: flex;
  flex-wrap:wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  background: ${pageBgColor};
  gap: 10px;
`;
export const UserDataSection = styled.div`
  margin-top: 15px;
  height: 150px;
  display: flex;
  flex-wrap:wrap;
  
  #userProfileAvatar {
    height: 150px;
    width: 150px;
    @media screen and (max-width: 600px) {
    height: 70px;
    width: 70px;
  }
    
  }

`;
export const UserInfoContainer = styled.div`
  margin-left: 100px;
  width: 350px;
  @media screen and (max-width: 600px) {
    margin-left:20px;
  }
`;
export const EditAndSettingsDiv = styled.div`
  display: flex;
  flex-wrap:wrap;
  height:55px;
  justify-content: space-between;
  p {
    font-size: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
  button {
    border: 1px solid ${borderColor};
    height: 30px;
    border-radius: 5px;
    margin-top: 5px;
    font-weight: 400;
    background: none;
  }
  svg {
    height: 25px;
    margin-top: 5px;
  }
  span{
    font-weight:600;
    font-size:15px
  }
`;

export const UserHighlightSection = styled.div`
  margin: 45px 0px 20px 0px;
  /* background: pink; */
  height: 150px;
  border-bottom: 1px solid ${borderColor};
`;
