import React, { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { auth } from "../firebaseSetup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { links1, links3 } from "../utilities/links";
import Footer from "./Footer";
import {
  FooterDiv,
  FooterRow,
} from "../components/styledComponents/FooterStyled";
import { PageWrapperdiv, NavbarStyled, ForgotPassFormWrapper, EmailInput, FormSubmitButton, StyledForm } from "./styledComponents/ForgotPasswordStyled";
import { InfoDiv, OrStrikeDiv } from "./styledComponents/SignUpStyled";

function ForgotPassword() {
  const [emailState, setEmailState] = useState<string>("");
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (emailState === "") {
        throw new Error("email is not provided");
      } else {
        const response = await auth.sendPasswordResetEmail(emailState);
        alert("Reset Password link is sent to your email");
        setEmailState("")
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmailState(event.target?.value);
  }
  return (
    <>
      <PageWrapperdiv>
        <NavbarStyled>
          <div className="navbarLogo">
            <img
              src={require("../assets/images/instagram_logo.png")}
              alt="instagram logo"
            />
          </div>
        </NavbarStyled>
        <ForgotPassFormWrapper className="forgotPassFormWrapper">
          <FontAwesomeIcon icon={faLock} size="6x" className="lockIcon w-73" />
          <h4 className="w-73">Trouble with Logging in ?</h4>
          <InfoDiv>
            Enter your email address, phone number or username, and we'll send
            you a link to get back into your account.
          </InfoDiv>
          <StyledForm onSubmit={handleFormSubmit} className="resetPassForm w-73">
            <EmailInput
              name="email"
              placeholder="Email Address"
              autoComplete="off"
              type="email"
              onChange={handleInputChange}
              value={emailState}
              required
            />
            <FormSubmitButton disabled={emailState === "" ? true : false} type="submit">
              Send Login Link
            </FormSubmitButton>
            <span>
              <a href="https://help.instagram.com/374546259294234">
                Can't Reset your password ?
              </a>
            </span>
          </StyledForm>
          <OrStrikeDiv>
            <span>OR</span>
          </OrStrikeDiv>
          <div className="signUpLink">
            <Link to="/signup">Create New Account</Link>
          </div>
          <div className="loginLink">
            <Link to="/">Back to Login</Link>
          </div>
        </ForgotPassFormWrapper>
        <FooterDiv margin = "60px">
          <FooterRow>
            {links1.map((item) => (
              <Footer key={Math.random()} data={item.data} link={item.link} />
            ))}
          </FooterRow>
          <FooterRow>
            {links3.map((item) => (
              <Footer key={Math.random()} data={item.data} link={item.link} />
            ))}
          </FooterRow>
        </FooterDiv>
      </PageWrapperdiv>
    </>
  );
}

export default ForgotPassword;
