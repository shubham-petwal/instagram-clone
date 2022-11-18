import React, { useContext, useEffect, useState } from "react";
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
import WhiteRing from "../assets/images/UserHighlightRing.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import StatusStories from "./StatusStories";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PostDetailModal } from "./PostDetailModal";
import { AuthContext } from "../context/AuthContext";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../db";
import FollowerModal from "./FollowerModal";
import ProfilePosts from "./ProfilePosts";
interface GetDataInterface {
  image: string;
  caption: string;
  children: React.ReactNode;
}
interface SocialCount {
  inbound_count: number;
  outbound_count: number;
}
function UserProfile() {
  const params = useParams();
  const user = useContext(AuthContext);
  const navigate = useNavigate();
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

  let rows = [];
  for (let i = 0; i <= 10; i++) {
    rows.push(
      <StatusStories
        ringImage={WhiteRing}
        key={Math.random()}
        Ringwidth="85"
        Ringheight="85"
        width="80"
        height="80"
      />
    );
  }
  const [imageArray, setImageArray] = useState<Array<GetDataInterface>>([]);
  const [userRetrievedData, setRetrievedData] = useState<any>();
  const [showFollowerModal, setShowFollowerModal] = useState<boolean>(false);
  const [currentMethod, setCurrentMethod] = useState<string>("");
  const [socialCount, setSocialCount] = useState<SocialCount>({
    inbound_count: 0,
    outbound_count: 0,
  });
  
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

      axios
        .get(`http://localhost:90/users/${userId}`)
        .then((userData) => {
          setRetrievedData(userData.data.data);
        })
        .catch((err)=>{
          console.log(err.message);
        })

      axios.get(`http://localhost:90/getPosts/${userId}`).then((allPosts) => {
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
              ) : null}
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
              >
                <span>{socialCount?.inbound_count || 0} </span>
                followers
              </div>
              <div
                onClick={() => {
                  setCurrentMethod("following");
                  return setShowFollowerModal(true);
                }}
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

        <UserHighlightSection>
          <div id="userProfileHighlight">
            <ul>{rows.map((item) => item)}</ul>
          </div>
        </UserHighlightSection>
        <AllPostImages>
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
        </AllPostImages>
      </UserProfileContainer>
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
