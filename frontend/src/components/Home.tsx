import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebaseSetup";
import Navbar from "./Navbar";
import Posts from "./Posts";
import StatusBar from "./StatusBar";
import {
  HomePageContainer,
  SuggestionContainer,
  SuggestionUserDetailsdiv,
} from "./styledComponents/Home.style";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import BlueButton from "../assets/images/blueButton.png";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";


interface DataInterface {
  image: string;
  caption: string;
  postId: string;
  createdAt: any;
  children: React.ReactNode;
}


function Home() {
  const user = useContext(AuthContext);
  const [imageArray, setImageArray] = useState<Array<DataInterface>>([]);
  const [userRetrievedData, setRetrievedData] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      try {
        const allPosts = await axios.get("http://localhost:90/getPosts");
        const Details = allPosts.data;
        if (Details) {
          setImageArray(Details.data);
        } else {
          console.log("Post Details not found");
        }

        const userData = await axios.get(
          `http://localhost:90/users/${user?.uid}`
        );
        setRetrievedData(userData.data.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  // console.log(imageArray)
  return (
    <>
      <Navbar profileImage={userRetrievedData?.profileImage} />
      <HomePageContainer>
        <div id="all_posts">
          <StatusBar/>
        

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
                />
              ))
            ) : (
              <p>No content</p>
            )
          ) : (
            <p>No content</p>
          )}
        </div>
        <SuggestionContainer>
          <SuggestionUserDetailsdiv>
            <div id="details">
              <Link to="/addStory">
                <Avatar
                  id="homeProfileImage"
                  src={userRetrievedData?.profileImage}
                />
                <img src={BlueButton} id="bluBtn" width="20px" height="20px" />
              </Link>
              <div>
                <span id="username">{userRetrievedData?.userName}</span>
                <br />
                <span id="fullName">{userRetrievedData?.fullName}</span>
              </div>
            </div>
            <div>
              <button>Switch</button>
            </div>
          </SuggestionUserDetailsdiv>
        </SuggestionContainer>
      </HomePageContainer>
    </>
  );
}

export default Home;
