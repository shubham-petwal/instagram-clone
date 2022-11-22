import styled, { css } from "styled-components";

export const NavContainer = styled.div`
#last_grid{
  display: none;
  @media screen and (max-width: 750px) {
    display: block;
    margin-left: 8%;
    }
}
  .MuiGrid-item {
    height: 60px !important;
  }
  height: 60px;
  z-index: 100;
  width: 100vw;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
  position: fixed;
  top: 0;
  width: 100%;
  #nav_first_grid {
    @media screen and (max-width: 750px) {
      visibility: hidden;
    }
  }
  #input_grid {
    @media screen and (max-width: 750px) {
      /* display: none; */
    }
  }
  #icons_grid{
    @media screen and (max-width: 750px) {
      /* margin-left:50px; */
      display: none !important;
    }
    @media screen and (max-width: 970px) {
      margin-left:-30px;
    }
  }
  .show {
    width: 250px;
    a {
      padding: 10px 15px;
      font-size: 15px;
    }
    #logout {
      border-top: 1px solid #dbdbdb;
    }
    svg {
      margin-right: 6px;
    }
  }

`;
export const NavLogo = styled.img`
  height: 1.9rem;
  width: 6.8rem;
  margin-top: 15px;
  margin-left: -55px;
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
  @media screen and (max-width: 968px) {
    display: none;
  }
`;
export const NavIcons = styled.img`
  margin: 15px 10px;
  cursor: pointer;
  /* @media screen and (max-width: 580px) {
    margin: 15px 2px 0px 10px;
  } */
`;
export const DropdownProfile = styled.div`
  button {
    margin: 13px 7px;
    border-radius: 50%;
    font-size: 0px;
    max-width: 25px;
    height: 25px;
    border: none;
    background: none;
    &:hover {
      background: none;
    }
  }
`;
export const ProfileAvatar = styled.div`
  position: absolute;
  top: 13px;
  left: 7px;
  #avatar {
    max-width: 27px;
    max-height: 27px;
  }
`;
export const HamburgerDiv = styled.div`
display: none;
@media screen and (max-width: 750px) {
    display: flex;
    margin-left: 35px;
    /* align-items: flex-end; */
  }
`;

