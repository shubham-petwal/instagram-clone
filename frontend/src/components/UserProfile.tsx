import React, { useContext, useEffect, useRef, useState } from "react";
import {
  UserProfileContainer,
  UserDataSection,
  UserHighlightSection,
  UserInfoContainer,
  EditAndSettingsDiv,
  AllPostImages,
} from "./styledComponents/UserProfile.style";
import Navbar from "./Navbar";
import { Spinner } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import WhiteRing from "../assets/images/UserHighlightRing.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

import StatusStories from "./StatusStories";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PostDetailModal } from "./PostDetailModal";
import { AuthContext } from "../context/AuthContext";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../db";
import FollowerModal from "./FollowerModal";
import ProfilePosts from "./ProfilePosts";
import { Timestamp } from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
interface GetDataInterface {
  image: string;
  caption: string;
  docId: string;
  createdAt: any;
  children: React.ReactNode;
}
interface SocialCount {
  inbound_count: number;
  outbound_count: number;
}
interface ButtonProps {
  targetUserId: string;
}

function FollowingButton(props:ButtonProps){
  const [isFollowing, setFollowing] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const user = useContext(AuthContext);
  const userId = user?.uid;
  const targetUserId = props.targetUserId;
  useEffect(() => {
    if(!targetUserId){
      return;
    }
    setLoading(true);
    axios
      .get(`http://localhost:90/${userId}/isFollowing/${targetUserId}`)
      .then((result) => {
        setFollowing(result.data.data.isFollowing);
      })
      .catch((err)=>{
        console.log("error fetching check following API",err);
      });
    setLoading(false);
  }, [isFollowing,props]);

  async function handleButtonClick() {
    try {
      setLoading(true);
      const result = await axios.post("http://localhost:90/follow", {
        userId,
        target_userId: targetUserId,
      });
      setFollowing(!isFollowing);
      setLoading(false);
      if (result.data.success == false) {
        console.log(result.data.message);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }


   return (
    <>
      {isFollowing ?
        isLoading ? (
          <button>
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </button>
        ) : (
          <button onClick={handleButtonClick}>following</button>
        )
      :
        isLoading ? (
          <button style={{backgroundColor :"rgba( 0, 149, 246, 1)", color : "white"}}>
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </button>
        ) : (
          <button style={{backgroundColor :"rgba( 0, 149, 246, 1)", color : "white"}} onClick={handleButtonClick}>follow</button>
        )
      }
    </>
   );
}

function UserProfile() {
  const params = useParams();
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const chatRef = useRef<any>(null);
  // const userId:string = params?.userId || "";

  const [userId, setUserId] = useState<string>("");
  async function getUserId(){
    try{
      const result = await axios.get(`http://localhost:90/getUserId/${params?.userId}`);
      setUserId(result.data.data);
    }catch(error){
      console.log(error)
    }
  }

  const [imageArray, setImageArray] = useState<Array<GetDataInterface>>([]);
  const [userRetrievedData, setRetrievedData] = useState<any>();
  const [showFollowerModal, setShowFollowerModal] = useState<boolean>(false);
  const [currentMethod, setCurrentMethod] = useState<string>("");
  const [socialCount, setSocialCount] = useState<SocialCount>({
    inbound_count: 0,
    outbound_count: 0,
  });
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const [storyArray, setStoryArray] = useState<any>();

  const getNextDataOfUserPost = async () => {
    try {
      chatRef.current?.scrollIntoView();
      const lastDoc = imageArray[imageArray.length - 1].createdAt;
      const lastDocInMillis = new Timestamp(
        lastDoc.seconds,
        lastDoc.nanoseconds
      ).toMillis();
      const res = await axios.get(
        `http://localhost:90/getPosts?userId=${user?.uid}&page=3&lastDocId=${lastDocInMillis}`
      );
      if (res.data.data.length == 0) {
        setHasMorePosts(false);
      }
      setImageArray((prev) => {
        return [...prev, ...res.data.data];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const StoryNextData = async () => {
    try {
      const lastDoc = storyArray[storyArray.length - 1].deleteAt;
      const date = new Timestamp(
        lastDoc.seconds,
        lastDoc.nanoseconds
      ).toMillis();
      const res = await axios.get(
        `http://localhost:90/getStories?userId=${user?.uid}&page=1&lastDocId=${date}`
      );
      setStoryArray((prev: any) => {
        return [...prev, ...res.data.data];
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(()=>{
    getUserId();
    return ()=>{setUserId("")};
  },[params])

  useEffect(() => {

    if (!userId || userId=="") {
      return;
    }
    try {
      const unsubscribe = onSnapshot(doc(db, "social_graph", userId), (doc) => {
        setSocialCount({
          inbound_count: doc.data()?.inbound_count,
          outbound_count: doc.data()?.outbound_count,
        });
      });

      // const userId = user?.uid;
      axios.get(
        `http://localhost:90/getStories?page=1&userId=${userId}`
      ).then((storyData)=>{
        setStoryArray(storyData.data.data);
      }).catch((err)=>{
        console.log(err.message);
      })

      axios
        .get(`http://localhost:90/users/${userId}`)
        .then((userData) => {
          setRetrievedData(userData.data.data);
        })
        .catch((err)=>{
          console.log(err.message);
        })

      axios.get(`http://localhost:90/getPosts?userId=${userId}&page=3`).then((allPosts) => {
        const Details = allPosts.data;
        if (Details) {
          setImageArray(Details.data);
        }
      });
      return unsubscribe;
    } catch (error: any) {
      console.log(error.message);
    }
  }, [params,userId]);

  return (
    <div>
      <Navbar />
      <UserProfileContainer>
        <div className="align_center">
        <UserDataSection>
          <div>
            <Avatar
              id="userProfileAvatar"
              src={userRetrievedData?.profileImage}
            />
          </div>
          <UserInfoContainer>
            <EditAndSettingsDiv>
              <p>{userRetrievedData?.userName}</p>
              {user?.uid == userId ? (
                <button onClick={() => navigate("/editProfile")}>
                  Edit Profile
                </button>
              ) : 
              <>
                <button onClick={()=>
                    navigate(`/chat/${userRetrievedData?.userName}`)
                  }
                >
                  Message
                </button>
                <FollowingButton targetUserId={userId} />
              </>
              }
              <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
            </EditAndSettingsDiv>
            <EditAndSettingsDiv>
              <div>
                {/* did not implemented post count dynamically as imageArray.length, because we will be getting 3 posts at a time so it will dependent upont post fetched */}
                <span>6 </span>
                posts
              </div>
              <div
                onClick={() => {
                  setCurrentMethod("followers");
                  return setShowFollowerModal(true);
                }}
                style = {{cursor:"pointer"}}
              >
                <span>{socialCount?.inbound_count || 0} </span>
                followers
              </div>
              <div
                onClick={() => {
                  setCurrentMethod("following");
                  return setShowFollowerModal(true);
                }}
                style = {{cursor:"pointer"}}
              >
                <span>{socialCount?.outbound_count || 0} </span>
                following
              </div>
            </EditAndSettingsDiv>
            <EditAndSettingsDiv>
              <span>{userRetrievedData?.fullName}</span>
              <p style={{ fontSize: "16px", display: "block" }}>
                {" "}
                {userRetrievedData?.bioData}{" "}
              </p>
            </EditAndSettingsDiv>
          </UserInfoContainer>
        </UserDataSection>
        </div>
        <div className="align_center">
          <UserHighlightSection>
            <div id="userProfileHighlight"> 
              <ul>
                {storyArray ? (
                  storyArray.length > 0 ? (
                    storyArray.map((item: any) => (
                      //  <li key={Math.random()}><img src={item.image} height="280px" width="300px" /></li>
                      <StatusStories
                        key={Math.random()}
                        Ringwidth="85"
                        Ringheight="85"
                        width="80"
                        height="80"
                        profileImage={item.profileImage}
                        storyId={item.storyId}
                        userName={item.userName}
                        storyImage={item.image}
                        createdAt={item.createdAt}
                        nav={`/userProfile/${item.userName}`}
                      />
                    ))
                  ) : (
                    null
                  )
                ) : (
                  null
                )}
                {storyArray&&storyArray.length>0 ?
                <FontAwesomeIcon onClick={StoryNextData} icon={faCircleArrowRight}/>
                :null}
              </ul>
            </div>
          </UserHighlightSection>
        </div>

        <div className="align_center">
        <AllPostImages>
            <InfiniteScroll
              dataLength={imageArray ? imageArray.length : 0} //This is important field to render the next data
              next={getNextDataOfUserPost}
              hasMore={hasMorePosts}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
          <ul>
            {imageArray ? (
              imageArray.length > 0 ? (
                imageArray.map((item: any) => (
                  <li key={Math.random()}>
                    <ProfilePosts
                      src={item.image}
                      postId={item.postId}
                      profileImage={userRetrievedData?.profileImage}
                      postImage={item.image}
                      caption={item.caption}
                      userName={userRetrievedData?.userName}
                      userId={userId}
                      height="280px"
                      width="300px"
                      role="button"
                    />
                  </li>
                ))
              ) : (
                <p>No content</p>
              )
            ) : (
              <p>No content</p>
            )}
          </ul>
            </InfiniteScroll>
        </AllPostImages>
        </div>
      </UserProfileContainer>
      <div ref={chatRef} />
      <FollowerModal
        show={showFollowerModal}
        onHide={() => setShowFollowerModal(false)}
        userId={userId}
        method={currentMethod}
      />
    </div>
  );
}

// {
//   imageArray?
//  imageArray.length>0?imageArray.map((item:any)=>(
//  <li key={Math.random()}><img src={item.image} height="280px" width="300px" /></li>
// )):<p>No content</p>
// :<p>No content</p>
// }

export default UserProfile;
