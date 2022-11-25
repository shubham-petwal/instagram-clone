const { collection, query, where, getDocs ,doc, updateDoc} = require("firebase/firestore");
const express = require("express");
const router = express.Router({ mergeParams: true });
const dotenv = require("dotenv");
const db = require("../../db");
const algoliasearch = require("algoliasearch");

dotenv.config();

router.post("/", async (req, res) => {
  const { fullName, userName, gender, bioData, userId } = req.body;
  const data = {
    fullName,
    userName,
    bioData,
    gender,
  };
  try {
    //finding user and getting its document id
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("userId", "==", userId.toString())); //created a query
    const findQuerySnapshot = await getDocs(q);
    const resArr = [];
    findQuerySnapshot.forEach((doc) => {
      resArr.push({ ...doc.data(), id: doc.id });
    });
    // updating user document
    const documentRef = doc(db, "users", resArr[0].id);
    const updateDocResponse = await updateDoc(documentRef, data);

    const searchClient = algoliasearch(
      process.env.ALOGOLIA_APP_ID,
      process.env.ALOGOLIA_ADMIN_API_KEY
    );
    const instaIndex = searchClient.initIndex("instagram_users");

    const actor = {
      fullName: fullName,
      userName: userName,
      profileImage: resArr[0].profileImage,
      objectID: resArr[0].userId,
    };
    instaIndex
      .saveObject(actor)
      .then(() => {
        console.log("done updating user data in the instaIndex");
      })
      .catch((err) => {
        console.log("updation error : ", err.message);
      });

    //sending response once user is updated
    res.send({
      success: true,
      message: "user update successful",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
