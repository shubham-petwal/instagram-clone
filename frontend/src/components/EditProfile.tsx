import { Avatar } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import subh from "../assets/images/shubham.jpg";
import Navbar from "./Navbar";
import axios from "axios";
import {
  EditProfileContainer,
  EditProfileMainContainer,
  InputDiv,
  LabelDiv,
  LeftEditPage,
  PageDetails,
  RightEditPage,
  GenderRadioWrapperDiv
} from "./styledComponents/EditProfile.style";
import { auth } from "../firebaseSetup";
import { CometChat } from "@cometchat-pro/chat";
import UploadModal from "./UploadModal";

function EditProfile() {
  const navigate = useNavigate();
  const [gender,setGender] = useState("NA")
  const [isActive, setIsActive] = useState(true);
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [userRetrievedData, setRetrievedData] = useState<any>();
  const emailRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const bioDataRef = useRef<HTMLTextAreaElement>(null);
  var imageUrl = "";

  const handleClick = () => {
    setIsActive(!isActive);
    navigate("/ChangePass");
  };
  const userId = auth.currentUser?.uid;
  useEffect( ()=>{
    let userData;
    axios.get(`http://localhost:90/users/${userId}`).then((res)=>{
      userData= res.data.data;
      // imageUrl = userData.profileImage;
      setRetrievedData(userData);
      if(emailRef.current && fullNameRef.current && userNameRef.current && bioDataRef.current ){
        emailRef.current.value = userData.email;
        fullNameRef.current.value = userData.fullName;
        userNameRef.current.value = userData.userName;
        bioDataRef.current.value = userData.bioData;
      }
      if(userData.gender){
        setGender(userData.gender)
      }else{
        setGender("NA")
      }
    })
  },[])

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    try{
      e.preventDefault();
      const userUpdateObject = {
        fullName : fullNameRef?.current?.value,
        userName : userNameRef?.current?.value,
        bioData : bioDataRef?.current?.value,
        gender,
        userId
      }
      const checkResponse = await axios.get(`http://localhost:90/allowedRegistration/${userNameRef.current?.value}`);
      if(!checkResponse.data.isAllowed){
        throw new Error(checkResponse.data.message);
      }
      const response = await axios.post('http://localhost:90/updateUser',userUpdateObject);
  
      let authKey = "002a47a79f08f99cbf6dac2c6eb18e0946c57fa3";
      let uid = userId;
      let name = fullNameRef?.current ? fullNameRef?.current.value : "";
  
      var user = new CometChat.User(uid);
  
      user.setName(name);
      
      CometChat.updateUser(user, authKey).then(
          user => {
              console.log("user updated", user);
          }, error => {
              console.log("error", error);
          }
      )
    }catch(error){
      console.log(error);
    }
  };

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    console.log(event.target.name , " : ", event.target.value)
  }
  const handleGenderChange = async (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    // console.log(event.target.name , " : ", event.target.value)
    setGender(event.target.value);
  }

  return (
    <div>
      <Navbar />
      <EditProfileMainContainer>
        <EditProfileContainer>
          <LeftEditPage>
            <div>
              <span
                style={{
                  background: isActive ? "#f8f8f8" : "",
                  fontSize: isActive ? "22px" : "",
                  fontWeight: isActive ? "500" : "",
                }}
              >
                Edit Profile
              </span>
              <span onClick={handleClick}>Change password</span>
            </div>
          </LeftEditPage>
          <RightEditPage>
            <PageDetails>
              <p>Edit Profile</p>
            </PageDetails>
            <div id="topavatar">
              <LabelDiv>
                <Avatar src={userRetrievedData?.profileImage} id="Avatar" />
              </LabelDiv>
              <InputDiv>
                <p id="username">{userRetrievedData?.userName}</p>
                <span onClick={()=>setModalIsOpen(true)} style={{fontSize : "12px", border:"none", background:"none", margin : "0px 3px", display:"block",color:"#4086fe"}}>Update profile</span>
              </InputDiv> 
            </div>
            <form onSubmit={handleFormSubmit}>
              <LabelDiv>
                <label>Name</label>
              </LabelDiv>
              <InputDiv>
                <input onChange={handleInputChange} name="fullName" type="text" ref={fullNameRef} placeholder="Name of User" />
                <p>
                  You are using the same name on Instagram and Facebook. Go to
                  Facebook to change your name. <Link to="">Change Name</Link>
                </p>
              </InputDiv>
              <LabelDiv>
                <label>Username</label>
              </LabelDiv>
              <InputDiv>
                <input onChange={handleInputChange} name="userName" type="text" ref={userNameRef} placeholder="Username" />
                <p>
                  In most cases, you'll be able to change your username back to
                  shubham_petwal_ for another 14 days.{" "}
                  <Link to="">Learn more</Link>
                </p>
              </InputDiv>
              <LabelDiv>
                <label>Website</label>
              </LabelDiv>
              <InputDiv>
                <input disabled type="text" placeholder="Website" />
                <p>
                  Editing your links is only available on mobile. Visit the
                  Instagram app and edit your profile to change the websites in
                  your bio.
                </p>
              </InputDiv>
              <LabelDiv>
                <label>Bio</label>
              </LabelDiv>
              <InputDiv>
                <textarea onChange={handleInputChange} name="bioData" ref={bioDataRef} maxLength={150} />
                <p>
                  You are using the same name on Instagram and Facebook. Go to
                  Facebook to change your name. Change Name
                </p>
              </InputDiv>

              <LabelDiv>
                <label></label>
              </LabelDiv>
              <InputDiv>
                <h3>Personal information</h3>
                <p>
                  Provide your personal information, even if the account is used
                  for a business, pet or something else. This won't be part of
                  your public profile.
                </p>
              </InputDiv>

              <LabelDiv>
                <label>Email address</label>
              </LabelDiv>
              <InputDiv>
                <input type="email" disabled name="email" onChange={handleInputChange} ref={emailRef} />
              </InputDiv>
              <LabelDiv>
                <label>Phone number</label>
              </LabelDiv>
              <InputDiv>
                <input type="text" placeholder="null" disabled />
              </InputDiv>
              <LabelDiv>
                <label>Gender</label>
              </LabelDiv>
              <InputDiv>
                <GenderRadioWrapperDiv>
                  <div>
                    <input checked={gender==="male"} onChange={handleGenderChange} type="radio" value="male" name="gender" /><span>Male</span>
                  </div>
                  <div>
                    <input checked={gender==="female"} onChange={handleGenderChange} type="radio" value="female" name="gender" /><span>Female</span>
                  </div>
                  <div>
                    <input checked={gender==="NA"} onChange={handleGenderChange} type="radio" value="NA" name="gender" /><span>Prefer Not to say</span>
                  </div>
                </GenderRadioWrapperDiv>
                {/* <input type="text" placeholder="gender" disabled /> */}
              </InputDiv>

              <LabelDiv>
                <label>Similar account suggestions</label>
              </LabelDiv>
              <InputDiv style={{ display: "flex" }}>
                <input type="checkbox" />
                <span>
                  Include your account when recommending similar accounts that
                  people might want to follow.<Link to="">[?]</Link>
                </span>
              </InputDiv>
              <LabelDiv id="submit">
                <button>Submit</button>
              </LabelDiv>
            </form>
          </RightEditPage>
        </EditProfileContainer>
      </EditProfileMainContainer>
      <UploadModal method={"updateProfileImage"} isModalOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} header={"Update profile image"}/>
    </div>
  );
}

export default EditProfile;
