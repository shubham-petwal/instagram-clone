import React, { ReactElement, SyntheticEvent, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faCircleXmark, faEye } from "@fortawesome/free-regular-svg-icons";
import "../styles/SignUp.scss";
import { Link } from "react-router-dom";
import {
  Formik,
} from "formik";
import { signUpSchema } from "../schemas/validationSchema";

function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const passswordRef = useRef<HTMLInputElement>(null);
  const initialValues = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
  };
  const togglePassword = ()=>{
    setShowPass((prev)=>{
      return !prev
    })
  }
  return (
    <div className="signUpPageWrapper">
      <div className="signUpFormWrapper w-25 commonContainer">
        <img
          src={require("../assets/images/instagram_logo.png")}
          className="signUpLogo"
          alt="logo"
        />
        <p className="signUpTitle">
          Sign up to see photos and videos from your friends.
        </p>
        <button className="logInWithFacebookButton">
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </button>
        <div className="strike">
          <span>OR</span>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            alert(JSON.stringify(values));
          }}
          validationSchema={signUpSchema}
        >
          {({ handleSubmit, values, handleChange, errors, touched}) => (
            <form className="signUpForm" onSubmit={handleSubmit}>
              <div className="inputWrapper">
                <input
                  name="email"
                  placeholder="Mobile number or email address"
                  type="text"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                />
                {(errors.email && touched.email) ? (
                  <FontAwesomeIcon
                    className="validationIcon"
                    icon={faCircleXmark}
                  />
                ) : null}
              </div>
              <div className="inputWrapper">
                <input
                  name="fullName"
                  placeholder="Full Name"
                  type="text"
                  autoComplete="off"
                  value={values.fullName}
                  onChange={handleChange}
                />
                {(errors.fullName && touched.fullName) ? (
                  <FontAwesomeIcon
                    className="validationIcon"
                    icon={faCircleXmark}
                  />
                ) : null}
              </div>
              <div className="inputWrapper">
                <input
                  name="userName"
                  placeholder="Username"
                  type="text"
                  autoComplete="off"
                  value={values.userName}
                  onChange={handleChange}
                />
                {errors.userName && touched.userName ? (
                  <FontAwesomeIcon
                    className="validationIcon"
                    icon={faCircleXmark}
                  />
                ) : null}
              </div>
              <div className="inputWrapper">
                <input
                  name="password"
                  ref={passswordRef}
                  placeholder="Password"
                  type={!showPass ? "Password" : "text"}
                  autoComplete="off"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password ? (
                  <>
                    <FontAwesomeIcon className="validationIcon" icon={faCircleXmark} />
                    {passswordRef.current?.value  ?  (
                      <span style={{marginRight: "5px", fontSize:"12px",cursor:"pointer"}} className="togglePasswordBtn" onClick={togglePassword} >
                        {!showPass ? "Show" : "Hide"}
                      </span>
                    ): null}
                  </>
                ) : passswordRef.current?.value ? (
                  <span onClick={togglePassword} style={{marginRight: "5px", fontSize:"12px",cursor:"pointer"}} className="togglePasswordBtn">
                    {!showPass ? "Show" : "Hide"}
                  </span>
                ): null}
              </div>

              <div className="info">
                People who use our service may have uploaded your contact
                information to Instagram. Learn more
                <br />
                <br />
                By signing up, you agree to our Terms, Privacy Policy and
                Cookies Policy.
              </div>
              <button type="submit" className="signUpButton">
                Sign Up
              </button>
            </form>

          )}
        </Formik>
      </div>
      <div className="logInOption w-25 commonContainer">
        Have an account?{" "}
        <span>
          <Link to="/">Log in</Link>
        </span>
      </div>
      <div className="appDownloadOptions w-25">
        <div>Get the app.</div>
        <div className="downloadLinkWrapper">
          <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo">
            <img
              src={require("../assets/images/insta_appstore.png")}
              alt="apple_store_link"
            />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.instagram.android">
            <img
              src={require("../assets/images/insta_playstore.png")}
              alt="play_store_link"
            />
          </a>
        </div>
      </div>
      <div className="footer w-25"></div>
    </div>
  );
}

export default SignUp;
