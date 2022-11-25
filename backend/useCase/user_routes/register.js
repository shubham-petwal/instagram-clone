const { collection, addDoc } = require("firebase/firestore");
const express = require("express");
const router = express.Router({ mergeParams: true });
const dotenv = require("dotenv");
const db = require("../../db");
const bcrypt = require("bcrypt");
const algoliasearch = require('algoliasearch');

dotenv.config();

router.post("/", async (req, res) => {
  const { userId, userName, fullName, email, password ,fcm_token} = req.body;
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
    const instaIndex = searchClient.initIndex("instagram_users");
    const actors = [
      {
        objectID: userId,
        fullName: fullName,
        userName: userName,
        profileImage: "",
      },
    ];
    instaIndex
      .saveObjects(actors)
      .then((response) => {
        console.log("successfully registered user into algolia");
      })
      .catch((err) => {
        console.log("unable to register user into algolia");
      });
    res.send({
      success: true,
      message: "user Registered Successfully",
      data: { userName: userName, fullName: fullName },
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }
});

module.exports = router;
