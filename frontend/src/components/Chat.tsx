import { CometChatUI } from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import { CometChat } from "@cometchat-pro/chat";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function Chat() {
  
  const params = useParams();
  const [ userId , setUserId] = useState<string>("");
  useEffect(()=>{
    axios.get(`http://localhost:90/getUserId/${params?.targetUserName}`).then((result)=>{
      setUserId(result.data.data);
    })
  },[userId]);
  return (
    <>
      <Navbar />
      <div
        style={{
          width: "100vw",
          height: "92vh",
          marginTop: "8vh",
        }}
      >
        {userId == "" ?
          <CometChatUI />
        :
          <CometChatUI chatWithUser={userId} />
        }
      </div>
    </>
  );
}

export default Chat;
