import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
// import "../styles/Navbar.scss";
import logo from "../assets/images/instagram_logo.png";
import home from "../assets/images/home.svg";
import find from "../assets/images/find.svg";
import love from "../assets/images/love.svg";
import message from "../assets/images/message.svg";
import plus from "../assets/images/plus.svg";
import subh from "../assets/images/shubham.jpg";
import Avatar from "@material-ui/core/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faPlaneCircleExclamation,
  faRepeat,
  faUserCheck,
  faStar,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import "react-dropdown/style.css";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseSetup";
import type {} from "styled-components/cssprop";
import {
  DropdownProfile,
  NavContainer,
  NavIcons,
  NavInput,
  NavLogo,
  ProfileAvatar,
} from "./styledComponents/Navbar.style";
import axios from "axios";
interface NavInterFace {
  profileImage: string;
}
interface UserDataInterface{
  profileImage : string;
  fullName : string;
  userName : string;
}
function Navbar() {
  const [userData , setUserData] = useState<UserDataInterface>({
    profileImage : "",
    fullName : "",
    userName : "",
  });
  const user = useContext(AuthContext);
  let navigate = useNavigate();
  const signOut = async () => {
    await auth.signOut();
    navigate("/");
  };
  useEffect(()=>{
    const userID = user?.uid;
    axios.get(`http://localhost:90/users/${userID}`).then((result)=>{
      console.log("navbar useEffect : ",result.data.data);
      setUserData({
        profileImage : result.data.data.profileImage,
        fullName : result.data.data.fullName,
        userName : result.data.data.userName,
      })
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return !user ? (
    <div>
      <NavContainer>
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={2} className="logo_and_dropdown">
            <img className="nav_logo" src={logo} alt="logo" />
          </Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={2} style={{ display: "flex" }}></Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </NavContainer>
    </div>
  ) : (
    <div>
      <NavContainer>
        <Grid container>
          <Grid item xs={2} id="nav_first_grid"></Grid>
          <Grid item xs={3} style={{ display: "flex" }}>
            <NavLink to="/home">
              <NavLogo src={logo} alt="logo" />
            </NavLink>
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  background: "none",
                  border: "none",
                  color: "#dbdbdb",
                  fontSize: "32px",
                }}
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/">
                  <FontAwesomeIcon icon={faUserCheck} /> Following
                </Dropdown.Item>
                <Dropdown.Item href="/">
                  <FontAwesomeIcon icon={faStar} /> Favourites
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid>

          <Grid item xs={3} id="input_grid">
            <NavInput type="text" placeholder="Search" />
          </Grid>
          <Grid item xs={2} id="icons_grid" style={{ display: "flex" }}>
            <NavIcons src={home} width="28px" alt="logo" />
            <NavIcons src={message} width="28px" alt="logo" />
            <NavIcons src={plus} width="28px" height="20px" alt="logo" onClick={()=>navigate("/uploadImage")} />
            <NavIcons src={find} width="28px" alt="logo" />
            <NavIcons src={love} width="28px" alt="logo" />

            {/* <img className="nav_icons" src={home} width="28px" alt="logo" />
            <img className="nav_icons" src={find} width="28px" alt="logo" />
            <img className="nav_icons" src={love} width="28px" alt="logo" />
            <img className="nav_icons" src={message} width="28px" alt="logo" /> */}
            <div style={{ position: "relative" }}>
              <Dropdown>
                <DropdownProfile>
                  <Dropdown.Toggle>
                    <ProfileAvatar>
                      <Avatar id="avatar" src={userData.profileImage} />
                    </ProfileAvatar>
                  </Dropdown.Toggle>
                </DropdownProfile>
                <Dropdown.Menu>
                  {/* <Dropdown.Item onClick={()=>navigate(`/userProfile/${user?.uid}`)}> */}
                  <Dropdown.Item onClick={()=>navigate(`/userProfile/${userData.userName}`)}>
                    <FontAwesomeIcon icon={faCircleUser} />
                    Profile
                  </Dropdown.Item>

                  <Dropdown.Item href="/">
                    <FontAwesomeIcon icon={faBookmark} /> Saved
                  </Dropdown.Item>
                  <Dropdown.Item href="/">
                    <FontAwesomeIcon className="icon" icon={faGear} /> Settings
                  </Dropdown.Item>
                  <Dropdown.Item href="/">
                    <FontAwesomeIcon icon={faPlaneCircleExclamation} /> Report a
                    problem
                  </Dropdown.Item>
                  <Dropdown.Item href="/">
                    <FontAwesomeIcon icon={faRepeat} /> Switch accounts
                  </Dropdown.Item>

                  <Dropdown.Item href="/" id="logout" onClick={signOut}>
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </NavContainer>
    </div>
  );
}

export default Navbar;
