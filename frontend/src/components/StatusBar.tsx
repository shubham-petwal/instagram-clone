import React, { useContext, useEffect, useState } from "react";
import StatusStories from "./StatusStories";
import { StatusBarContainer } from "./styledComponents/StatusBar.style";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";

interface StoryInterface {
  image: string;
  userName: string;
  StoryId: string;
  profileImage: string;
  createdAt: any;
  userId:string
  children: React.ReactNode;
}
function StatusBar(props:any) {
  const user = useContext(AuthContext);
  const [storyArray, setStoryArray] = useState<Array<StoryInterface>>([]);
  const [lastDoc, setLastDoc] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getNextData = async () => {
    try {
      // chatRef.current?.scrollIntoView();
      const res = await axios.get(
        `http://localhost:90/getStories?page=1&lastDocId=${lastDoc}`
      );
      //have to use query params
      if(res.data.data){
        console.log(res.data.data)
        setStoryArray((prev) => {
          return [...prev, ...res.data.data];
        });
      }
      setLastDoc(res.data.lastDocId);
      if (res.data.data.length == 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
console.log("My Story=",lastDoc)


  useEffect(() => {
    const getData = async () => {
      try {
        const allStories = await axios.get(`http://localhost:90/getStories?page=1`);
        setLastDoc(allStories.data.lastDocId);
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
                nav = {"/"}

              />
            ))
          ) : (
            <p>No content</p>
          )
        ) : (
          <p>No content</p>
        )}
      </ul>
      <button onClick={getNextData}>Call Next Data</button>
    </StatusBarContainer>
  );
}
export default StatusBar;
