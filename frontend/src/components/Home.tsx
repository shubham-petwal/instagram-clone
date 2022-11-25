import React, { useContext, useEffect, useRef, useState } from "react";
import { auth } from "../firebaseSetup";
import Navbar from "./Navbar";
import Posts from "./Posts";
import StatusBar from "./StatusBar";
import {
  HomePageContainer,
  SuggestionContainer,
  SuggestionUserDetailsdiv,
} from "./styledComponents/Home.style";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import BlueButton from "../assets/images/blueButton.png";
import LoadingBar from "react-top-loading-bar";

import { CometChat } from "@cometchat-pro/chat";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadModal from "./UploadModal";
import { Timestamp } from "firebase/firestore";
import ShowStory from "./ShowStory";
import { getMessaging, onMessage,getToken } from "firebase/messaging";
import {messaging} from "../db"


interface DataInterface {
  image: string;
  caption: string;
  postId: string;
  createdAt: any;
  docId: string;
  children: React.ReactNode;
}
interface StoryInterface {
  image: string;
  createdAt: any;
  userName: string;
  profileImage: string;
  children: React.ReactNode;
}

function Home() {
  const [progress, setProgress] = useState(0);
  const user = useContext(AuthContext);
  const [imageArray, setImageArray] = useState<Array<DataInterface>>([]);

  const [userRetrievedData, setRetrievedData] = useState<any>();
  // const [lastDoc, setLastDoc] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isStoryUploaded, setIsStoryUploaded] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleSetStory = (bool: boolean) => {
    return setIsStoryUploaded(bool);
  };

  const getNextData = async () => {
    try {
      const lastDoc = imageArray[imageArray.length - 1].createdAt;
      const lastDocInMillis = new Timestamp(
        lastDoc.seconds,
        lastDoc.nanoseconds
      ).toMillis();
      const res = await axios.get(
        `http://localhost:90/getPosts?page=3&lastDocId=${lastDocInMillis}`
      );
      //have to use query params
      setImageArray((prev) => {
        return [...prev, ...res.data.data];
      });
      if (res.data.data.length == 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProgress(100);
    const getData = async () => {
      try {
        const allPosts = await axios.get(`http://localhost:90/getPosts?page=3`);
        const details = allPosts.data;
        if (details) {
          setImageArray(details.data);
        } else {
          console.log("Post Details not found");
        }
        await axios.get(
          `http://localhost:90/users/${user?.uid}`
        ).then((userData)=>{
            setRetrievedData(userData.data.data);
            // logging user in Cometchat once user data in retrieved on home page
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
        })
      } catch (error: any) {
        console.log(error.message);
      }
    };
      getData();
      
  }, []);



  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar setModalIsOpen={setModalIsOpen} />
      <HomePageContainer>
        <ToastContainer position="top-center" />
        <div id="all_posts">
          <StatusBar setStoryState={handleSetStory} />
          {imageArray.length>0?
          <InfiniteScroll
            dataLength={imageArray ? imageArray.length : 0} //This is important field to render the next data
            next={getNextData}
            hasMore={hasMore}
            loader={
              <div style={{ textAlign: "center" }}>
                <Spinner animation="border" role="status" />
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {imageArray ? (
              imageArray.length > 0 ? (
                imageArray.map((item: any) => (
                  //  <li key={Math.random()}><img src={item.image} height="280px" width="300px" /></li>
                  <Posts
                    key={Math.random()}
                    postImage={item.image}
                    caption={item.caption}
                    postId={item.postId}
                    userId={item.userId}
                    userName={item.userName}
                    profileImage={item.profileImage}
                    currentUserName = {userRetrievedData?.userName}
                    currentUserProfileImage = {userRetrievedData?.profileImage}
                    currentUserFcmToken = {userRetrievedData?.fcm_token}
                  />
                ))
              ) : (
                <p>No content</p>
              )
            ) : (
              <p>No content</p>
            )}
          </InfiniteScroll>:null
          }
        </div>
        <SuggestionContainer>
          <SuggestionUserDetailsdiv>
            <div id="details">
              {isStoryUploaded ? (
                <div
                  onClick={() => {
                    toast("Story Already Uploaded");
                  }}
                >
                  <Avatar
                    id="homeProfileImage"
                    src={userRetrievedData?.profileImage}
                  />
                  <img
                    src={BlueButton}
                    id="bluBtn"
                    width="20px"
                    height="20px"
                  />
                </div>
              ) : (
                <div onClick={() => setModalIsOpen(true)}>
                  <Avatar
                    id="homeProfileImage"
                    src={userRetrievedData?.profileImage}
                  />
                  <img
                    src={BlueButton}
                    id="bluBtn"
                    width="20px"
                    height="20px"
                  />
                </div>
              )}
              {/* <button onClick={getNextData}>Call</button> */}
              <div>
                <span id="username">{userRetrievedData?.userName}</span>
                <br />
                <span id="fullName">{userRetrievedData?.fullName}</span>
              </div>
            </div>
            <div></div>
          </SuggestionUserDetailsdiv>
        </SuggestionContainer>
      </HomePageContainer>
      <UploadModal
        method={"addStory"}
        isModalOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        header={"Add new story"}
      />
    </>

  );
}

export default Home;

// eea0VTGSo4bXmuF0JeOACY:APA91bEDqppFTseVU1UU54aYN5CF1guFaIo277erP_x7-0QWzqXWanOrzCvrBzXSPmBscg_7zWx4YaCFaJbQnNGjPnbs0kGHOGFjyweTFvdvwv84HvhlHBNG4X8MxVk-sJb-U9AvOJRu