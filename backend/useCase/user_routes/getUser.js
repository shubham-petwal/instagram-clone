const express = require("express");
const router = express.Router({mergeParams: true});
const dotenv = require("dotenv");
const { collection, query, where, getDocs } = require("firebase/firestore");
const db = require('../../db');

dotenv.config();

router.get("/", async (req, res) => {
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

module.exports = router;
