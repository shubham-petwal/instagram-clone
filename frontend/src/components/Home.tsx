import React from "react";
import { auth } from "../firebaseSetup";
import Navbar from "./Navbar";
import Posts from './Posts';
import StatusBar from './StatusBar';
import { HomePageContainer } from "./styledComponents/Home.style";
function Home() {
    const signOut = async () => {
        await auth.signOut();
    };
  return (
    <>
      <Navbar/>
      <HomePageContainer>

        <div className='all_posts' >
          <StatusBar/>
          <Posts/>
          <Posts/>
          <Posts/>
        </div>
        <div className='suggestion_container'>
          <h1>SHubham</h1>
        </div>
      </HomePageContainer>
    </>
  );
}

export default Home;
