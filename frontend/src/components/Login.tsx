import React, { useEffect, useRef, useState, useContext } from "react";
import { links1, links2, links3 } from "../utilities/links";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  FooterDiv,
  FooterRow,
} from "../components/styledComponents/FooterStyled";
import Footer from "./Footer";
// authentication imports
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseSetup";
import {
  ChangingImages,
  DownloadBtn,
  FacebookLink,
  ForgotPassword,
  FormContainer,
  FormSignUpContainer,
  GetTheApp,
  ImageContainer,
  Input,
  LoginBtn,
  LoginFormContainer,
  LoginPage,
  LoginWrapper,
  Logo,
  MainForm,
  OrSplitter,
  ShowPasswordBtn,
} from "./styledComponents/LoginStyled";
import { CometChat } from "@cometchat-pro/chat";
const logo = require("../assets/images/instagram.png");
const fb = require("../assets/images/facebook.png");
const insta1 = require("../assets/images/insta1.png");
const insta2 = require("../assets/images/insta2.png");
const insta3 = require("../assets/images/insta3.png");
const insta4 = require("../assets/images/insta4.png");
const appstoreImg = require("../assets/images/appStore.png");
const playStoreImg = require("../assets/images/playStore.png");
const instaBackgroungImage = require("../assets/images/instaBackgroung.png");

function Login() {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async (email: string, password: string) => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      let authKey = "002a47a79f08f99cbf6dac2c6eb18e0946c57fa3";
      var chat_uid = "test2";
    
      CometChat.login(chat_uid, authKey).then(
        (user) => {
          console.log("logged in ", user);
        },
        (error) => {
          console.log("error", error);
        }
      );
      navigate("/home");
    } catch (error: any) {
      window.alert(error);
      // navigate('/home');
    }
  };
  const [showPassword, setShowPassword] = useState(true);
  const [imageCount, setImageCount] = useState(1);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn(email, password);
  };
  const validation = () => {
    if (email && password.length >= 6) {
      return false;
    } else {
      return true;
    }
  };
  const handlePassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowPassword(!showPassword);
    if (showPassword) {
      passwordRef.current?.setAttribute("type", "text");
    } else {
      passwordRef.current?.setAttribute("type", "password");
    }
  };
  const arr = [insta1, insta2, insta3, insta4];
  let index = 0;

  function cycleContent() {
    setInterval(() => {
      index %= arr.length;
      setImageCount(index);
      index++;
    }, 8000);
  }
  useEffect(() => {
    cycleContent();
    // eslint-disable-next-line
  }, []);
  return user ? (
    <Navigate to="/home" />
  ) : (
    <LoginPage className="complete_login_page">
      <LoginWrapper>
        <ImageContainer>
          <img
            src={instaBackgroungImage}
            className="background_picture"
            alt="InstaPic"
            width="464px"
          />
          <ChangingImages
            src={arr[imageCount]}
            className="changing_image"
            alt="instaPic"
          />
        </ImageContainer>
        <LoginFormContainer>
          <FormContainer>
            <Logo src={logo} alt="Instagram" />
            <MainForm>
              <Input
                right={0}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Phone number, username or email address"
                autoComplete="off"
              />
              <Input
                type="password"
                right={46}
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password"
                placeholder="Password"
                autoComplete="off"
              />
              {password ? (
                <ShowPasswordBtn onClick={handlePassword}>
                  {showPassword ? "Show" : "Hide"}
                </ShowPasswordBtn>
              ) : null}
              {/* below ts ignore is place to ignore the onClick method call */}
              {/* @ts-ignore */}
              <LoginBtn onClick={handleLogin} disabled={validation()}>
                Log In
              </LoginBtn>
            </MainForm>
            <span>
              <OrSplitter style={{ fontSize: "13px" }}>OR</OrSplitter>
            </span>
            <FacebookLink>
              <img
                src={fb}
                alt="Facebook"
                width="16px"
                style={{ marginRight: "8px" }}
              />
              <p style={{ marginTop: "16px" }}>Log in with Facebook</p>
            </FacebookLink>
            <ForgotPassword>
              <Link to="/forgotPassword" style={{ color: "#0c72e5" }}>
                Forgotten your password?
              </Link>
            </ForgotPassword>
          </FormContainer>
          <FormSignUpContainer>
            <span>
              Don't have an account?{" "}
              <Link
                className="sign_up_btn"
                to="/signup"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#3695f6",
                }}
              >
                Sign Up
              </Link>
            </span>
          </FormSignUpContainer>
          <GetTheApp>Get the app.</GetTheApp>
          <DownloadBtn>
            <a
              href="https://apps.apple.com/app/instagram/id389801252?vt=lo"
              style={{ marginLeft: "12px" }}
            >
              <img src={appstoreImg} alt="AppStore" width="144px" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.instagram.android"
              style={{ marginLeft: "12px" }}
            >
              <img src={playStoreImg} alt="PlayStore" width="144px" />
            </a>
          </DownloadBtn>
        </LoginFormContainer>
      </LoginWrapper>

      <FooterDiv margin="0px">
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
    </LoginPage>
  );
}

export default Login;
