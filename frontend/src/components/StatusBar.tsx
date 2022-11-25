import React, { useContext, useEffect, useState } from "react";
import StatusStories from "./StatusStories";
import { StatusBarContainer } from "./styledComponents/StatusBar.style";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Timestamp } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

interface StoryInterface {
  image: string;
  userName: string;
  StoryId: string;
  profileImage: string;
  createdAt: any;
  deleteAt:any;
  userId:string;
  docId:string;
  children: React.ReactNode;
}
function StatusBar(props:any) {
  const user = useContext(AuthContext);
  const [storyArray, setStoryArray] = useState<Array<StoryInterface>>([]);
  // const [lastDoc, setLastDoc] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  

  const getNextData = async () => {
    try {
      // chatRef.current?.scrollIntoView();
      const lastDoc = storyArray[storyArray.length - 1].deleteAt
      const lastDocInMillis = new Timestamp(lastDoc.seconds , lastDoc.nanoseconds).toMillis();
      const res = await axios.get(
        `http://localhost:90/getStories?page=1&lastDocId=${lastDocInMillis}`
      );
      //have to use query params
      if(res.data.data){
        // console.log(res.data.data)
        setStoryArray((prev) => {
          return [...prev, ...res.data.data];
        });
      }
      console.log("lastDoc Id is",lastDoc)
      if (res.data.data.length == 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("Story Array is=",storyArray)


  useEffect(() => {
    const getData = async () => {
      try {
        const allStories = await axios.get(`http://localhost:90/getStories?page=1`);
        const storyData = allStories.data;
        if (storyData) {
          setStoryArray(storyData.data);
        } else {
          console.log("Story Details not found not found");
        }
        // console.log(newDate)
      } catch (error: any) {
        console.log(error.message);
      }
    };
    
    
    getData();
  }, []);
  useEffect(()=>{
    if(storyArray&&storyArray.length>0 && storyArray[0].userId==user?.uid){
      props.setStoryState(true)
    }
    else{
      props.setStoryState(false)
    }
  },[storyArray])
  return (
    <StatusBarContainer>
      <ul>
        {storyArray ? (
          storyArray.length > 0 ? (
            storyArray.map((item: any) => (
              //  <li key={Math.random()}><img src={item.image} height="280px" width="300px" /></li>
              <StatusStories
                key={Math.random()}
                Ringwidth="65"
                Ringheight="65"
                width="60"
                height="60"
                profileImage={item.profileImage}
                storyId={item.storyId}
                userName={item.userName}
                storyImage={item.image}
                createdAt = {item.createdAt}
                thumbnailImage={item.thumbnailImage}
                nav = {"/"}
              />
            ))
          ) : (
            null
          )
        ) : (
          null
        )}
      </ul>
      {storyArray.length>0?
      <FontAwesomeIcon onClick={getNextData} icon={faCircleArrowRight}/>
      :null}
    </StatusBarContainer>
  );
}
export default StatusBar;
