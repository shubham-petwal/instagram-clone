import styled,{css} from "styled-components";
import { blueButtonStyles } from "./utilityFiles/styledFunctions";

export const UserNamePara = styled.p`
    font-size: 16px;
    font-weight: 500;
`
export const FullNamePara = styled.p`
    font-size: 14px;
    font-weight: 300;
    color: #8E8E8E;
`
export const FollowBtn = styled.button`
    ${blueButtonStyles("90%")}
    margin: 0px 0px 0px 0px;
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