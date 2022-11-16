import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebaseSetup";
import Navbar from "./Navbar";
import Posts from './Posts';
import StatusBar from './StatusBar';
import { HomePageContainer, SuggestionContainer, SuggestionUserDetailsdiv } from "./styledComponents/Home.style";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Avatar } from "@material-ui/core";

interface DataInterface{
  image:string;
  caption:string;
  postId:string;
  createdAt:any;
  children: React.ReactNode;
}



function Home() {
  const user = useContext(AuthContext);
  const [imageArray,setImageArray] = useState<Array<DataInterface>>([])
  const [userRetrievedData, setRetrievedData] = useState<any>();
  useEffect(()=>{
    const getData = async()=>{
      try {
        const allPosts = await axios.get("http://localhost:90/getPosts");
        const Details = allPosts.data;      
        if(Details){
          setImageArray(Details.data)
        }
        else{
          console.log("Details not found")
        }
        const userData = await axios.get(
          `http://localhost:90/users/${user?.uid}`
        );
        setRetrievedData(userData.data.data);
      } catch (error:any) {
        console.log(error.message)
      }
    }
      getData();
    },[])

  
  // console.log(imageArray)
  return (
    <>
      <Navbar />
      <HomePageContainer>
        <div id='all_posts' >
          <StatusBar/>

          {imageArray? imageArray.length>0?imageArray.map((item:any)=>(
            //  <li key={Math.random()}><img src={item.image} height="280px" width="300px" /></li>
             <Posts key={Math.random()} postImage={item.image} caption={item.caption} postId={item.postId} userId={item.userId}/>
            )):<p>No content</p>
            :<p>No content</p>
            }
        </div>
        <SuggestionContainer>
          <SuggestionUserDetailsdiv>           
          <div id="details">
          <Avatar src={userRetrievedData?.profileImage}/>
          <div>
          <p>{userRetrievedData?.userName}</p>
          <p>{userRetrievedData?.fullName}</p>
          </div>
          </div>
          <span>
            <button>Switch</button>
          </span>
          </SuggestionUserDetailsdiv>
        </SuggestionContainer>
      </HomePageContainer>
    </>
  );
}

export default Home;
