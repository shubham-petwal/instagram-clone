import React from "react";
import { auth } from "../firebaseSetup";

function Home() {
    const signOut = async () => {
        await auth.signOut();
    };
  return (
    <div>
      Home
      <button onClick={signOut}>Log Out</button>
    </div>
  );
}

export default Home;
