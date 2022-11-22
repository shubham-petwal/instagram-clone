import { CometChatUI } from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import { CometChat } from "@cometchat-pro/chat";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";

function Chat() {
  
  const params = useParams();
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
        {params?.targetUserName ?
          <CometChatUI chatWithUser={params?.targetUserName} />
        :
          <CometChatUI />
        }
      </div>
    </>
  );
}

export default Chat;
