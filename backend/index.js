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
