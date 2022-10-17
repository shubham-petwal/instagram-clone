import React, { useEffect, useRef, useState, useContext } from "react";
import {links1,links2,links3} from "../utilities/links";
import {Link,useNavigate,Navigate} from 'react-router-dom'
import "../styles/Login.scss";
import Footer from "./Footer";
// authentication imports
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseSetup"
const logo = require("../assets/images/instagram.png");
const fb = require("../assets/images/facebook.png");
const insta1 = require( "../assets/images/insta1.png");
const insta2 = require( "../assets/images/insta2.png");
const insta3 = require( "../assets/images/insta3.png");
const insta4 = require( "../assets/images/insta4.png");
const appstoreImg = require( "../assets/images/appStore.png");
const playStoreImg = require( "../assets/images/playStore.png");
const instaBackgroungImage = require( "../assets/images/instaBackgroung.png");

function Login() {
  const navigate = useNavigate();
  const user = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async (email:string, password:string) => {
    try {
      const response = await auth.signInWithEmailAndPassword(
        email,
        password
      );
        navigate('/home');
      } catch (error : any) {
        console.error(error.messsage);
        // navigate('/home');
    }
  };
  const [showPassword, setShowPassword] = useState(true);
  const [imageCount, setImageCount] = useState(1);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn(email,password)
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
  return (
    user? <Navigate to='/home' /> :
    <div className="complete_login_page">
      <div className="main_login_wrapper">
        <div className="image_container">
          <img
            src={instaBackgroungImage}
            className="background_picture"
            alt="InstaPic"
          />
          <img
            src={arr[imageCount]}
            className="changing_image"
            alt="instaPic"
          />
        </div>
        <div className="login_container">
          <div className="form_container">
            <div className="insta_logo">
              <img src={logo} alt="Instagram" />
            </div>
            <form className="main_form" onSubmit={handleLogin}>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Phone number, username or email address"
                autoComplete="off"
              />
              <div className="password">
                <input
                  type="password"
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="off"
                />
                {password ? (
                  <button className="show_password" onClick={handlePassword}>
                    {showPassword ? "Show" : "Hide"}
                  </button>
                ) : (
                  null
                )}
              </div>
              <button
                type="submit"
                className="login_btn"
                disabled={validation()}
              >
                Log In
              </button>
            </form>
            <span className="horizontal_OR">
              <h4>OR</h4>
            </span>
            <span className="facebook_link">
              <img src={fb} alt="Facebook" />
                <p>Log in with Facebook</ p>
            </span>
            <Link to='/forgotPassword'>
              <span className="forgot_password">Forgotten your password?</span>
            </Link>
          </div>
          <div className="form_signup_container">
            <span>
              Don't have an account?
              <Link to="/signup">
                <button className="sign_up_btn">Sign up</button>
              </Link>
            </span>
          </div>
          <p className="getApp">Get the app.</p>
          <div className="download_btn">
            <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo">
              <img src={appstoreImg} alt="AppStore" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.instagram.android">
              <img src={playStoreImg} alt="PlayStore" />
            </a>
          </div>
        </div>
      </div>
      <footer className="login_footer">
      <div className="footer">
        {links1.map((item)=>(
          <Footer key={Math.random()}  data={item.data} link={item.link}/>
        ))}
      </div>
      <div className="footer">
      {links2.map((item)=>(        
          <Footer key={Math.random()}  data={item.data} link={item.link}/>
        ))}
      </div>
      <div className="footer">
      {links3.map((item)=>(        
          <Footer key={Math.random()}  data={item.data} link={item.link}/>
        ))}
      </div>
          
      </footer>
    </div>
  );
}

export default Login;
