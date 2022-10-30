import React, {
  ReactElement,
  SyntheticEvent,
  useContext,
  useState,
  useRef,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Formik } from "formik";
import { signUpSchema } from "../schemas/validationSchema";
import { links1, links3 } from "../utilities/links";
import Footer from "./Footer";
//importing styled components
import {
  FooterDiv,
  FooterRow,
} from "../components/styledComponents/FooterStyled";
import {
  SignUpPageWrapperDiv,
  SignUpFormWrapperDiv,
  LoginWithFacebookBtn,
  LoginOptionDiv,
  AppDownloadOptionDiv,
  OrStrikeDiv,
  InputStyled,
  InputWrapperDiv,
  InfoDiv,
  SignUpButton,
} from "./styledComponents/SignUpStyled";
// authentication imports
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseSetup";
import axios from "axios";

function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const initialValues = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
  };
  const togglePassword = () => {
    setShowPass((prev) => {
      return !prev;
    });
  };
  const navigate = useNavigate();
  // Authentication code --------------------------------
  const user = useContext(AuthContext);
  const createAccount = async () => {
    try {
      const response = await auth.createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
      //sending post request to server to store the user in the firestore cloud database
      //@types-ignore
      const userId = response.user?.uid;
      const registerObject = {
        userId : userId,
        userName : userNameRef.current?.value,
        fullName : fullNameRef.current?.value,
        email : emailRef.current?.value,
        password : passwordRef.current?.value
      }
      const result = await axios.post('http://localhost:90/register', registerObject)
      navigate("/home");
    } catch (error:any) {
      console.error(error);
      window.alert(error.message);
    }
  };
  return user ? (
    <Navigate to="/home" />
  ) : (
    <SignUpPageWrapperDiv>
      <SignUpFormWrapperDiv>
        <img
          src={require("../assets/images/instagram_logo.png")}
          className="signUpLogo"
          alt="logo"
        />
        <p className="signUpTitle">
          Sign up to see photos and videos from your friends.
        </p>
        <LoginWithFacebookBtn>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </LoginWithFacebookBtn>
        <OrStrikeDiv>
          <span>OR</span>
        </OrStrikeDiv>
        <Formik
          initialValues={initialValues}
          onSubmit={createAccount}
          validationSchema={signUpSchema}
        >
          {({ handleSubmit, values, handleChange, errors, touched }) => (
            <form className="signUpForm" onSubmit={handleSubmit}>
              <InputWrapperDiv>
                <InputStyled
                  ref={emailRef}
                  name="email"
                  placeholder="Mobile number or email address"
                  type="text"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email ? (
                  <FontAwesomeIcon
                    className="validationIcon"
                    icon={faCircleXmark}
                  />
                ) : null}
              </InputWrapperDiv>
              <InputWrapperDiv>
                <InputStyled
                  ref={fullNameRef}
                  name="fullName"
                  placeholder="Full Name"
                  type="text"
                  autoComplete="off"
                  value={values.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && touched.fullName ? (
                  <FontAwesomeIcon
                    className="validationIcon"
                    icon={faCircleXmark}
                  />
                ) : null}
              </InputWrapperDiv>
              <InputWrapperDiv>
                <InputStyled
                  ref={userNameRef}
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
              </InputWrapperDiv>
              <InputWrapperDiv>
                <InputStyled
                  name="password"
                  ref={passwordRef}
                  placeholder="Password"
                  type={!showPass ? "Password" : "text"}
                  autoComplete="off"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password ? (
                  <>
                    <FontAwesomeIcon
                      className="validationIcon"
                      icon={faCircleXmark}
                    />
                    {passwordRef.current?.value ? (
                      <span
                        style={{
                          marginRight: "5px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                        className="togglePasswordBtn"
                        onClick={togglePassword}
                      >
                        {!showPass ? "Show" : "Hide"}
                      </span>
                    ) : null}
                  </>
                ) : passwordRef.current?.value ? (
                  <span
                    onClick={togglePassword}
                    style={{
                      marginRight: "5px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                    className="togglePasswordBtn"
                  >
                    {!showPass ? "Show" : "Hide"}
                  </span>
                ) : null}
              </InputWrapperDiv>

              <InfoDiv>
                People who use our service may have uploaded your contact
                information to Instagram. Learn more
                <br />
                <br />
                By signing up, you agree to our Terms, Privacy Policy and
                Cookies Policy.
              </InfoDiv>
              <SignUpButton type="submit" className="signUpButton">
                Sign Up
              </SignUpButton>
            </form>
          )}
        </Formik>
      </SignUpFormWrapperDiv>
      <LoginOptionDiv>
        Have an account?{" "}
        <span>
          <Link to="/">Log in</Link>
        </span>
      </LoginOptionDiv>
      <AppDownloadOptionDiv className="appDownloadOptions w-25">
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
      </AppDownloadOptionDiv>
      <FooterDiv margin="40px">
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
    </SignUpPageWrapperDiv>
  );
}

export default SignUp;
