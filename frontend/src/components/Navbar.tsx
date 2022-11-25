import React, { useContext, useEffect, useRef, useState } from "react";
import { Grid } from "@material-ui/core";
// import "../styles/Navbar.scss";
import logo from "../assets/images/instagram_logo.png";
import hamIcon from "../assets/images/icons8-bulleted-list-100.png";
import home from "../assets/images/home.svg";
import love from "../assets/images/love.svg";
import message from "../assets/images/message.svg";
import plus from "../assets/images/plus.svg";
import search from "../assets/images/search-svgrepo-com.svg";
import subh from "../assets/images/shubham.jpg";
import Avatar from "@material-ui/core/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { CometChat } from "@cometchat-pro/chat";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "react-dropdown/style.css";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseSetup";
import type {} from "styled-components/cssprop";
import redDot from "../assets/images/redDot.png"
import {
  DropdownProfile,
  HamburgerDiv,
  NavContainer,
  NavIcons,
  NavInput,
  NavLogo,
  NotificationDiv,
  NotificationModalDiv,
  ProfileAvatar,
} from "./styledComponents/Navbar.style";
import UploadModal from "./UploadModal";
import SearchModal from "./SearchModal";
import axios from "axios";
import { collection, doc, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../db";

interface UserDataInterface {
  profileImage: string;
  fullName: string;
  userName: string;
}
function Navbar() {
  const [userData, setUserData] = useState<UserDataInterface>({
    profileImage: "",
    fullName: "",
    userName: "",
  });
  const [isNotification,setIsNotification] = useState<boolean>(false)
  const [showSearchModal, setModal] = useState<boolean>(false);
  const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);
  const isRedDot = useRef<any>(false);
  
  const user = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [storyModalIsOpen, setStoryModalIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any>();
  let navigate = useNavigate();
  const handleNotification = ()=>{
    setShowNotificationModal(true)
    setIsNotification(false)
  }
  const signOut = async () => {
    await auth.signOut();
    CometChat.logout().then(
      () => {
        console.log("Logout completed successfully");
      },
      (error) => {
        console.log("Logout failed with exception:", { error });
      }
    );
    navigate("/");
  };
  const getNotificationData = () => {
    const collectionRef = query(
      collection(db,"notifications"),orderBy("createdAt","desc"),where("userId", "==", user?.uid),limit(20)
    );
    const unsubscribe = onSnapshot(collectionRef,(querySnapshot) => {
      const details: any = [];
      querySnapshot.forEach((doc) => {
        details.push(doc.data());
      });
      setNotifications(details);
      if(isRedDot.current){
        setIsNotification(true)
      }
      isRedDot.current = true;
    });
    return unsubscribe
  };

  useEffect(() => {
    const userID = user?.uid;
    axios
      .get(`http://localhost:90/users/${userID}`)
      .then((result) => {
        let authKey = "002a47a79f08f99cbf6dac2c6eb18e0946c57fa3";
        var chat_uid = user?.uid;
        
        CometChat.login(chat_uid, authKey).then(
          (user) => {
            console.log("logged in ", user);
          },
          (error) => {
            console.log("error", error);
          }
        );
        setUserData({
          profileImage: result.data.data.profileImage,
          fullName: result.data.data.fullName,
          userName: result.data.data.userName,
        });
      })
      .catch((err) => {
        console.log(err);
      });
      const unsubscribe = getNotificationData()
      return unsubscribe
  }, []);
  
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
          </Grid>

          <Grid item xs={3} id="input_grid">
            <NavInput
              type="text"
              placeholder="Search"
              onClick={() => setModal(true)}
            />
          </Grid>
          <Grid item xs={2} id="icons_grid" style={{ display: "flex" }}>
            <NavIcons
              src={home}
              width="28px"
              alt="logo"
              onClick={() => navigate("/home")}
            />
            <NavIcons
              src={message}
              width="28px"
              alt="logo"
              onClick={() => navigate(`/chat`)}
            />
            <NavIcons
              src={plus}
              width="28px"
              height="20px"
              alt="logo"
              onClick={() => setModalIsOpen(true)}
            />
            <NavIcons
              src={search}
              width="28px"
              height="20px"
              alt="logo"
              onClick={() => setModal(true)}
            />
              <NotificationDiv>
            <NavIcons src={love} width="28px" alt="logo" onClick={handleNotification}/>
            {isNotification?
            <img id="red_dot" src={redDot} width="12px"/>
            :null}
              </NotificationDiv>

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
                <Dropdown.Item
                  onClick={() => navigate(`/userProfile/${userData.userName}`)}
                >
                  <FontAwesomeIcon icon={faCircleUser} />
                  Profile
                </Dropdown.Item>

                <Dropdown.Item onClick={()=>setStoryModalIsOpen(true)}>
                <FontAwesomeIcon icon={faPlusSquare} />
                  Add story
                </Dropdown.Item>
                <Dropdown.Item href="/" id="logout" onClick={signOut}>
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid>
          <Grid item xs={3} id="last_grid">
            <HamburgerDiv>
              <Dropdown>
                <DropdownProfile>
                  <Dropdown.Toggle>
                    <img id="avatar" width="30px" src={hamIcon} />
                  </Dropdown.Toggle>
                </DropdownProfile>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      navigate(`/userProfile/${userData.userName}`)
                    }
                  >
                    <NavIcons
                      src={userData.profileImage}
                      width="25px"
                      height="22px"
                      alt="logo"
                    />{" "}
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate(`/home`)}>
                    <NavIcons
                      src={home}
                      width="25px"
                      height="22px"
                      alt="logo"
                    />{" "}
                    Home
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate(`/chat`)}>
                    <NavIcons
                      src={message}
                      width="25px"
                      height="22px"
                      alt="logo"
                    />{" "}
                    Messages
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setModalIsOpen(true)}>
                    <NavIcons
                      src={plus}
                      width="25px"
                      height="22px"
                      alt="logo"
                    />{" "}
                    Create post
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setModal(true)}>
                    <NavIcons
                      src={search}
                      width="25px"
                      height="22px"
                      alt="logo"
                    />{" "}
                    Search
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=>setShowNotificationModal(true)}>
                    <NavIcons
                      src={love}
                      width="25px"
                      height="22px"
                      alt="logo"
                    />
                    Notifications
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=>setStoryModalIsOpen(true)}>
                    <NavIcons
                      src={plus}
                      width="25px"
                      height="22px"
                      alt="logo"
                    />
                    Add story
                  </Dropdown.Item>

                  <Dropdown.Item href="/" id="logout" onClick={signOut}>
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </HamburgerDiv>
          </Grid>
        </Grid>
      </NavContainer>

      <UploadModal
        method={"uploadPost"}
        isModalOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        header={"Create new post"}
      />
            <UploadModal
        method={"addStory"}
        isModalOpen={storyModalIsOpen}
        setModalIsOpen={setStoryModalIsOpen}
        header={"Add new story"}
      />
      <Modal
        size="xl"
        scrollable={true}
        show={showNotificationModal}
        onHide={() => setShowNotificationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          Notifications
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NotificationModalDiv>
          <ul>
            {notifications?
            notifications.map((item:any)=>(
              <li key={Math.random()} id="notification_list">
                <Avatar src={item.profileImage}/>
                <span>
                {item.message}
                </span>
                {item.postImage?
                <img id="image" src={item.postImage} height="45px" width="45px"/>:null
                }
                </li>
            ))
            :null}
          </ul>
          </NotificationModalDiv>
        </Modal.Body>
      </Modal>

      <SearchModal show={showSearchModal} onHide={() => setModal(false)} />
    </div>
  );
}

export default Navbar;
