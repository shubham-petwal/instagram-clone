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
import { Avatar } from "@material-ui/core";
import subh from "../assets/images/shubham.jpg";
import WhiteRing from "../assets/images/UserHighlightRing.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import StatusStories from "./StatusStories";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { string } from "yup";
import { PostDetailModal } from "./PostDetailModal";
import ProfilePosts from "./ProfilePosts";
interface GetDataInterface {
  image: string;
  caption: string;
  children: React.ReactNode;
}
function UserProfile() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const chatRef = useRef<any>(null);
  const [lastDoc, setLastDoc] = useState<string>("");


  const [imageArray, setImageArray] = useState<Array<GetDataInterface>>([]);
  const [userRetrievedData, setRetrievedData] = useState<any>();
  const [storyArray, setStoryArray] = useState<any>();
  const getNextData = async () => {
    try {
      chatRef.current?.scrollIntoView();
      const res = await axios.get(
        `http://localhost:90/getPosts/?userId=${user?.uid}&page=1&lastDocId=${lastDoc}`
      );
      setImageArray((prev)=>{
        return [...prev, ...res.data.data]})
        if(res.data.lastDocId){
          setLastDoc(res.data.lastDocId)
        }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const userId = user?.uid
        const storyData = await axios.get(`http://localhost:90/getStories?page=3&userId=${userId}`)
        setStoryArray(storyData.data.data)

        const userData = await axios.get(
          `http://localhost:90/users/${user?.uid}`
        );
        setRetrievedData(userData.data.data);

        const allPosts = await axios.get(
          `http://localhost:90/getPosts?userId=${userId}&page=1`
        );
        setLastDoc(allPosts.data.lastDocId)
        
        const details = allPosts.data;
        if (details) {
          setImageArray(details.data);
        } else {
          console.log("Post Details not found");
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <Navbar profileImage={userRetrievedData?.profileImage} />
      <UserProfileContainer>
        <UserDataSection>
          <div>
            <Avatar id="userProfileAvatar" src={userRetrievedData?.profileImage} />
            <button onClick={getNextData}>Call Next</button>
          </div>
          <UserInfoContainer>
            <EditAndSettingsDiv>
              <p>{userRetrievedData?.userName}</p>

              <button onClick={() => navigate("/editProfile")}>
                Edit Profile
              </button>

              <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
            </EditAndSettingsDiv>
            <EditAndSettingsDiv>
              <div>
                <span>6 </span>
                posts
              </div>
              <div>
                <span>268</span>
                followers
              </div>
              <div>
                <span>244 </span>
                following
              </div>
            </EditAndSettingsDiv>
            <EditAndSettingsDiv>
              <span>{userRetrievedData?.fullName}</span>
            </EditAndSettingsDiv>
          </UserInfoContainer>
        </UserDataSection>

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
                createdAt = {item.createdAt}
                nav={"/userProfile"}
              />
            ))
          ) : (
            <p>No content</p>
          )
        ) : (
          <p>No content</p>
        )}
      </ul>
          </div>
        </UserHighlightSection>
        <AllPostImages>
          <ul>
            {/* {randomPosts.map((item) => {
              return item;
            })} */}
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
        </AllPostImages>
      </UserProfileContainer>
      <div ref={chatRef} />
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
