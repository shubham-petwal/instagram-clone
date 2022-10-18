import styled, { css } from "styled-components";

export const NavContainer = styled.div`
  height: 60px;
  width: 100vw;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
  position: fixed;
`;
export const NavLogo = styled.img`
  height: 1.9rem;
  width: 6.8rem;
  margin-top: 15px;
  cursor: pointer;
`;
export const NavInput = styled.input`
  height: 35px;
  width: 250px;
  font-size: 16px;
  margin-top: 10px;
  border: 1px solid #dbdbdb;
  padding-left: 1rem;
  border-radius: 7px;
  background-color: #efefef;
  &::placeholder {
    opacity: 0.5;
    font-weight: 400;
  }
  &:focus {
    outline: none;
  }
`;
export const NavIcons = styled.img`
  margin: 15px 12px;
  cursor: pointer;
`;
export const DropdownProfile = styled.div`
  button {
    margin: 13px 7px;
    border-radius: 50%;
    font-size: 0px;
    width: 25px;
    height: 25px;
    border: none;
    background: none;
    &:hover{
        background: none;
    }
  }
`;
export const ProfileAvatar = styled.div`
    position: absolute;
    top: 13px;
    left: 7px;
    #avatar{
      max-width: 27px;
      max-height: 27px;

  }
`;
