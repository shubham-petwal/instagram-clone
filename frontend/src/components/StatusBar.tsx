import React, { useEffect, useState } from "react";
import StatusStories from "./StatusStories";
import { StatusBarContainer } from "./styledComponents/StatusBar.style";

import axios from "axios";

interface StoryInterface {
  image: string;
  userName: string;
  StoryId: string;
  profileImage: string;
  createdAt: any;
  children: React.ReactNode;
}
function StatusBar() {
  const [storyArray, setStoryArray] = useState<Array<StoryInterface>>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const allStories = await axios.get("http://localhost:90/getStories");
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
              />
            ))
          ) : (
            <p>No content</p>
          )
        ) : (
          <p>No content</p>
        )}
      </ul>
    </StatusBarContainer>
  );
}
export default StatusBar;
