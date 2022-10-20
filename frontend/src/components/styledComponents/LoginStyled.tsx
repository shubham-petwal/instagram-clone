import styled, { css } from "styled-components";

const background = "#fafafa";
const borderColor = "rgb(217, 214, 214)";
const globalFontFamily =
  "-apple-system, BlinkMacSystemFont, “Segoe UI”, Roboto,Helvetica, Arial, sans-serif";
const fontSize = "12px";
interface Props {
  right: number;
}
function globalDisplay(direction: string) {
  return css`
    display: flex;
    flex-direction: ${direction};
    align-items: center;
    justify-content: center;
  `;
}
export const LoginPage = styled.div`
  ${globalDisplay("column")}
  font-family: ${globalFontFamily};
  background: ${background};
  min-height: 100vh;
`;
export const LoginWrapper = styled.div`
  ${globalDisplay("row")}
`;

export const ImageContainer = styled.div`
  position: relative;
  margin-top: 2rem;
  @media screen and (max-width: 875px) {
    display: none;
  }
`;
export const ChangingImages = styled.img`
  position: absolute;
  right: 3.5rem;
  top: 1.5rem;
  z-index: 2;
`;
export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 22.5rem !important;
  margin-left: 1rem;
`;
export const FormContainer = styled.div`
  ${globalDisplay("column")}
  background-color: white;
  border: 1px solid ${borderColor};
  border-width: thin;
  height: 26rem;
  @media screen and (max-width: 450px) {
    border: none;
    width: 100%;
    background-color: ${background};
    margin-bottom: 1.5rem;
  }
`;
export const Logo = styled.img`
  margin-bottom: 2rem;
  width: 12rem;
  cursor: pointer;
`;
export const MainForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const Input = styled.input<Props>`
  background-color: ${background};
  font-size: ${fontSize};
  width: 17rem !important;
  height: 2.5rem !important;
  text-overflow: ellipsis;
  margin-top: 0.7rem;
  border-radius: 3px;
  outline: none;
  border: solid 1px ${borderColor};
  padding: 3px 9px 3px 5px;
  padding-right: ${(props) => props.right}px;
  &:focus {
    border-color: rgb(147, 146, 146);
  }
  &::placeholder {
    opacity: 0.7;
    font-size: ${fontSize};
  }
`;
export const ShowPasswordBtn = styled.button`
  position: absolute;
  font-size: 14px;
  opacity: 0.7;
  top: 70px;
  left: 14rem;
  background-color: ${background};
  z-index: 20;
  border: none;
  background: none;
  font-weight: 700 !important;
`;
export const LoginBtn = styled.button`
  background-color: #c0e1fd;
  margin-top: 1rem;
  height: 2rem;
  border-radius: 4px;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  &:enabled {
    background-color: #3695f6;
    cursor: pointer;
  }
`;

export const OrSplitter = styled.h4`
  margin-top: 1.5rem;
  display: flex;
  opacity: 0.5;
  &::before,
  &::after {
    content: "";
    opacity: 0.5;
    width: 6.4rem !important;
    flex: 1 1;
    border-bottom: 1px solid;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 8px;
  }
`;

export const FacebookLink = styled.span`
  ${globalDisplay("row")}
  cursor: pointer;
  color: #263d6f;
  font-weight: bold;
`;
export const ForgotPassword = styled.span`
  color: #0c72e5;
  font-size: 12px;
  margin-top: 0.5rem;
  font-weight: 500;
`;

export const FormSignUpContainer = styled(FormContainer)`
  margin-top: 1rem;
  height: 4rem;
`;
export const GetTheApp = styled.p`
  text-align: center;
  margin: 1.3rem;
`;
export const DownloadBtn = styled.div`
  ${globalDisplay("row")};
`;
