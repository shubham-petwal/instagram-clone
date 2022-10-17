import React, { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { auth } from "../firebaseSetup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { links1, links3 } from "../utilities/links";
import Footer from "./Footer";
import "../styles/ForgotPassword.scss";

function ForgotPassword() {
  const [emailState, setEmailState] = useState<string>("");
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (emailState === "") {
        throw new Error("ref is not assigned to the email input field");
      } else {
        const response = await auth.sendPasswordResetEmail(emailState);
        alert("Reset Password link is sent to your email");
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
      <div className="forgotPassPageWrapper">
        <div className="navbar">
          <div className="navbarLogo">
            <img
              src={require("../assets/images/instagram_logo.png")}
              alt="logo"
            />
          </div>
        </div>
        <div className="forgotPassFormWrapper">
          <FontAwesomeIcon icon={faLock} size="6x" className="lockIcon w-73" />
          {/* <img src={require("../assets/images/lock.png")} /> */}
          <h4 className="w-73">Trouble with Logging in ?</h4>
          <p className="information w-73">
            Enter your email address, phone number or username, and we'll send
            you a link to get back into your account.
          </p>
          <form onSubmit={handleFormSubmit} className="resetPassForm w-73">
            <input
              name="email"
              placeholder="Email Address"
              autoComplete="off"
              type="email"
              onChange={handleInputChange}
              value={emailState}
              required
            />
            <button disabled={emailState === "" ? true : false} type="submit">
              Send Login Link
            </button>
            <span>
              <a href="https://help.instagram.com/374546259294234">
                Can't Reset your password ?
              </a>
            </span>
          </form>
          <div className="strike">
            <span>OR</span>
          </div>
          <div className="signUpLink">
            <Link to="/signup">Create New Account</Link>
          </div>
          <div className="loginLink">
            <Link to="/">Back to Login</Link>
          </div>
        </div>
        <footer className="login_footer">
          <div className="footer">
            {links1.map((item) => (
              <Footer key={Math.random()} data={item.data} link={item.link} />
            ))}
          </div>
          <div className="footer">
            {links3.map((item) => (
              <Footer key={Math.random()} data={item.data} link={item.link} />
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}

export default ForgotPassword;
