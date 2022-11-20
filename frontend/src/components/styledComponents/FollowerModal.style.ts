import styled,{css} from "styled-components";
import { blueButtonStyles } from "./utilityFiles/styledFunctions";

export const UserNamePara = styled.p`
    font-size: 16px;
    font-weight: 500;
    &:hover{
        cursor:pointer;
    }
`
export const FullNamePara = styled.p`
    font-size: 14px;
    font-weight: 300;
    color: #8E8E8E;
`
export const FollowBtn = styled.button`
    ${blueButtonStyles("90%")}
`
export const FollowingBtn = styled.button`
    ${blueButtonStyles("90%")}
    border: 1px solid #8E8E8E;
    background-color: transparent;
    color: black;
`
export const FollowingDiv = styled.div`
    ${blueButtonStyles("90%")}
    border: 1px solid #B2B2B2;
    background-color: transparent;
    color: #B2B2B2;
    &:hover{
        cursor:default;
    }
`
export const ProfileImage = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    margin: auto 0;
`
export const LoadingDiv = styled.div`
    width: 100%;
    margin : 20px auto 10px auto;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
`