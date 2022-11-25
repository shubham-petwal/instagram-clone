const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

//user related routes
const getUser = require("./useCase/user_routes/getUser");
const allowedRegistration = require("./useCase/user_routes/allowedRegistration");
const register = require("./useCase/user_routes/register");
const updateUser = require("./useCase/user_routes/updateUser");
const isFollowingUser = require("./useCase/user_routes/isFollowingUser");
const getUserId = require("./useCase/user_routes/getUserId");
const updateProfileImage = require("./useCase/user_routes/updateProfileImage");
// social-graph routes
const follow = require("./useCase/social_graph_routes/follow");
const getFollowers = require("./useCase/social_graph_routes/getFollowers");
const getFollowing = require("./useCase/social_graph_routes/getFollowing");
// post related routes
const getPosts = require("./useCase/post_routes/getPosts");
const uploadPost = require("./useCase/post_routes/uploadPosts");
//post-interaction routes
const like = require("./useCase/post_interaction_routes/like");
const addComment = require("./useCase/post_interaction_routes/addComment");
//stories routes
const getStories = require("./useCase/stories_routes/getStories");
const addStory = require("./useCase/stories_routes/addStory");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //it will provide posted data in the req.body json object

dotenv.config();



app.post("/register", async (req, res) => {
  const { userId, userName, fullName, email, password,fcm_token } = req.body;
  try {
    const collectionRef = collection(db, "users");
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    //need to initialise "profileImage" as some dummy image and then store in the database, can be updated afterwards
    const docRef = await addDoc(collectionRef, {
      userId,
      userName,
      fullName,
      email,
      hashedPassword,
      bioData: "", //this is the initial data passes, can be updated further
      postCount: 0,
      profileImage: "",
      fcm_token
    });
    const searchClient = algoliasearch(
      process.env.ALOGOLIA_APP_ID,
      process.env.ALOGOLIA_ADMIN_API_KEY
    );
    const instaIndex = searchClient.initIndex("instagram_users")
    const actors = [{
      objectID : userId,
      fullName : fullName,
      userName : userName,
      profileImage : ""
    }] 
    instaIndex.saveObjects(actors).then((response)=>{
      console.log("successfully registered user into algolia")
    }).catch((err)=>{
      console.log("unable to register user into algolia");
    })
    res.send({ success: true, message: "user Registered Successfully",data:{userName : userName, fullName : fullName}  });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message});
  }
});

app.get("/users/:userId", async (req, res) => {
  //need to send the userId, profileImg url in the response
  try {
    const userId = req.params.userId;
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("userId", "==", userId.toString())); //created a query
    const querySnapshot = await getDocs(q);
    const resArr = [];
    querySnapshot.forEach((doc) => {
      resArr.push(doc.data());
    });
    if (resArr.length == 0) {
      throw new Error("unable to find the user with provided userId");
    }
    res.send({
      success: true,
      message: "request fetched successfully",
      data: {
        profileImage: resArr[0].profileImage,
        fullName: resArr[0].fullName,
        postCount: resArr[0].postCount,
        userName: resArr[0].userName,
        bioData: resArr[0].bioData,
        email: resArr[0].email,
        fcm_token: resArr[0].fcm_token,
        gender: resArr[0].gender || undefined,
      },
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});



// using middlewares for different endpoints

app.use("/allowedRegistration/:userName", allowedRegistration);

app.use("/register", register);

app.use("/users/:userId", getUser);

app.use("/uploadPost", uploadPost);

app.use("/getPosts", getPosts);

app.use("/updateUser", updateUser);

app.use("/addComment", addComment);

app.use("/updateProfileImage", updateProfileImage);

app.use("/like", like);

app.use("/follow", follow);

app.use("/followers/:userId", getFollowers);

app.use("/following/:userId", getFollowing);

app.use("/addStory", addStory);

app.use("/:userId/isFollowing/:targetId", isFollowingUser);

app.use("/getUserId/:userName", getUserId);

app.use("/getStories", getStories);

app.post("/addNotification", async (req, res) => {
  const { userId,profileImage,message,postImage} = req.body;
  try {
    const collectionRef = collection(db, "notifications");
    const docRef = await addDoc(collectionRef, {
      userId,
      profileImage,
      message,
      postImage,
      createdAt:Timestamp.now()
    });
    res.send({ success: true, message: "notification added Successfully" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message});
  }
});

app.listen(process.env.PORT, () => {
  console.log(`app started at port ${process.env.PORT}`);
});
