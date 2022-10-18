import styled, {css} from 'styled-components';
import * as styledVariables from './utilityFiles/variables';
import { blueButtonStyles, flexBoxStyles, globalFontFamily } from './utilityFiles/styledFunctions'
import { InputStyled } from "./SignUpStyled"

function w73(){
    return css`
        width: 73%;
    `
}

const NavbarStyled = styled.div`
    z-index: 1000; //it will remain on the top of everything
    margin: 0;
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid ${styledVariables.borderColor};
    background-color: white;
    div.navbarLogo{
        ${flexBoxStyles('row')};
      height: 100%;
      width: 50%;
      img{
        height: 60%;
      }
      text-align: center;
    }
`
const EmailInput = styled(InputStyled)`
    border: 1px solid ${styledVariables.borderColor};
    margin: 4px 0 4px 0;
`
const FormSubmitButton = styled.button`
    ${blueButtonStyles('107%')}
    margin: 10px 0 10px 0;
    &:disabled {
        opacity: 0.4;
    }
`

const ForgotPassFormWrapper = styled.div`
    ${flexBoxStyles('column')};
    width: 370px;
    min-width: 370px;
    background-color: white;
    border: 1px solid ${styledVariables.borderColor};
    padding: 0;
    margin-top: 50px;
    a {
        text-decoration: none;
        &:active,
        &:visited {
          color: ${styledVariables.globalLinkColor};
        }
    }
    .lockIcon {
      margin: 30px 0;
    }
    h4 {
      text-align: center;
      margin: 0;
      font-size: 20px;
      font-weight: 400;
    }
    div.signUpLink {
      margin: 0;
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      a {
        display: inline-block;
        width: 100%;
      }
    }
    div.loginLink {
      ${flexBoxStyles('column')};
      margin: 60px 0 0 0;
      height: 40px;
      background-color: ${styledVariables.pageBgColor};
      border: 1px solid ${styledVariables.borderColor};
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      a {
        display: inline-block;
        width: 100%;
      }
    }
`

const StyledForm = styled.form`
    ${flexBoxStyles('column')};
    span {
        a {
        font-size: 12px;
        }
    }
`

const PageWrapperdiv = styled.div`
  ${globalFontFamily()}
  ${flexBoxStyles('column')};
  background-color: ${styledVariables.pageBgColor};
  min-width: 370px;
  min-height: 100vh;
  padding: 50px 0 0 0;
  .w-73 {
    width: 73%;
  }
`


export { PageWrapperdiv, NavbarStyled, ForgotPassFormWrapper, EmailInput ,FormSubmitButton, StyledForm};