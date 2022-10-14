import React from "react";
import { auth } from "../firebaseSetup";
import { Link } from "react-router-dom";

function Home() {
    const signOut = async () => {
        await auth.signOut();
    };
  return (
    <div>
      Home
      <Link to="/anotherProtected">Go to another Protected Route</Link>
      <button onClick={signOut}>Log Out</button>
    </div>
  );
}

export default Home;
