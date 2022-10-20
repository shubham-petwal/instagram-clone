import React from "react";
import { auth } from "../firebaseSetup";
import Navbar from "./Navbar";

function Home() {
    const signOut = async () => {
        await auth.signOut();
    };
  return (
    <div style={{"height":"100vh"}}>
      <Navbar/>
      Home
      <button onClick={signOut}>Log Out</button>
    </div>
  );
}

export default Home;
