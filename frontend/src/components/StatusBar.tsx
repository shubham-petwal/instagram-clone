import React, { useContext, useEffect, useRef, useState } from "react";
import StatusStories from "./StatusStories";
import { StatusBarContainer } from "./styledComponents/StatusBar.style";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Timestamp } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import rightArrow from "../assets/images/rightArrow.png";
import leftArrow from "../assets/images/leftArrow.png";

interface StoryInterface {
  image: string;
  userName: string;
  StoryId: string;
  profileImage: string;
  createdAt: any;
  deleteAt: any;
  userId: string;
  docId: string;
  children: React.ReactNode;
}
function StatusBar(props: any) {
  const user = useContext(AuthContext);
  const [storyArray, setStoryArray] = useState<Array<StoryInterface>>([]);
  // const [lastDoc, setLastDoc] = useState<string>("");
  let scrl = useRef<any>(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  const getNextData = async () => {
    try {
      const lastDoc = storyArray[storyArray.length - 1].deleteAt;
      const lastDocInMillis = new Timestamp(
        lastDoc.seconds,
        lastDoc.nanoseconds
      ).toMillis();
      const res = await axios.get(
        `http://localhost:90/getStories?page=5&lastDocId=${lastDocInMillis}`
      );
      if (res.data.data.length == 0) {
        setscrolEnd(true);
        return;
      }
      if(res.data.data) {
        setStoryArray((prev) => {
          return [...prev,...res.data.data];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const slide = (shift:any) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
      console.log("Slide  function True")
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      getNextData()
    } else {
      setscrolEnd(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const allStories = await axios.get(
          `http://localhost:90/getStories?page=10`
        );
        const storyData = allStories.data;
        if (storyData) {
          setStoryArray(storyData.data);
        } else {
          console.log("Story Details not found not found");
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getData();
  }, []);
  useEffect(() => {
    if (storyArray && storyArray.length > 0) {
      storyArray.map((item) => {
        if (item.userId == user?.uid) {
          props.setStoryState(true);
          return;
        }
      });
    } else {
      props.setStoryState(false);
    }
  }, [storyArray]);
  useEffect(() => {

    if (
      scrl.current &&
      scrl?.current?.scrollWidth === scrl?.current?.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
    return () => {};
  }, [scrl?.current?.scrollWidth, scrl?.current?.offsetWidth]);
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
      {storyArray.length > 0 ? (
        <>
          {scrollX !== 0 && (
            <img
              id="left_arrow"
              src={leftArrow}
              onClick={() => slide(-200)}
              width="25px"
              height="25px"
            />
          )}

          {!scrolEnd && (
            <img
              id="right_arrow"
              src={rightArrow}
              onClick={() => slide(200)}
              width="25px"
              height="25px"
            />
          )}
        </>
      ) : null}
    </StatusBarContainer>
  );
}
export default StatusBar;
