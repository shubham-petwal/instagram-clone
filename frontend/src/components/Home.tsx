import React, { useEffect, useState } from "react";
import { auth } from "../firebaseSetup";
import Navbar from "./Navbar";
import Posts from './Posts';
import StatusBar from './StatusBar';
import { HomePageContainer, SuggestionContainer } from "./styledComponents/Home.style";
import axios from "axios";

interface DataInterface{
  image:string;
  caption:string;
  postId:string;
  createdAt:any;
  children: React.ReactNode;
}



function Home() {
  const [imageArray,setImageArray] = useState<Array<DataInterface>>([])
  useEffect(()=>{
    const getData = async()=>{
      try {
        const allPosts = await axios.get("http://localhost:90/getPosts");
        const Details = allPosts.data;      
        if(Details){
          setImageArray(Details.data)
          return
        }
        else{
          console.log("Details not found")
        }
      } catch (error:any) {
        console.log(error.message)
      }
    }
      getData();
  },[])
  
  return (
    <>
      <Navbar/>
      <HomePageContainer>
        <div id='all_posts' >
          <StatusBar/>

          { imageArray? imageArray.length>0?imageArray.map((item:any)=>(
            //  <li key={Math.random()}><img src={item.image} height="280px" width="300px" /></li>
             <Posts key={Math.random()} src={item.image} caption={item.caption} postId={item.postId} userName={item.userName}/>
            )):<p>No content</p>
            :<p>No content</p>
            }
        </div>
        <SuggestionContainer>
          <h1>SHubham</h1>
        </SuggestionContainer>
      </HomePageContainer>
    </>
  );
}

export default Home;
