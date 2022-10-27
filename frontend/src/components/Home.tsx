import React from "react";
import { auth } from "../firebaseSetup";
import Navbar from "./Navbar";
import Posts from './Posts';
import StatusBar from './StatusBar';
import { HomePageContainer, SuggestionContainer } from "./styledComponents/Home.style";
function Home() {
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
        <SuggestionContainer>
          <h1>SHubham</h1>
        </SuggestionContainer>
      </HomePageContainer>
    </>
  );
}

export default Home;
