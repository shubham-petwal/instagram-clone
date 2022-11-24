const express = require("express");
const router = express.Router({ mergeParams: true });
const dotenv = require("dotenv");
const db = require("../../db");

const {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  increment,
  getDoc,
  deleteDoc,
  doc,
} = require("firebase/firestore");

dotenv.config();

router.post("/", async (req, res) => {
  const { target_userId, userId } = req.body;
  if (!target_userId || !userId) {
    res.send({
      success: false,
      message: "send the userId and target userId",
    });
    return;
  }
  if (target_userId == userId) {
    res.send({
      success: false,
      message: "you can not follow yourself",
    });
    return;
  }
  try {
    // on clicking follow button inbound of target user increases and outbound of current use increases
    const inboundDocRef = doc(
      db,
      `social_graph/${target_userId}/inbound_users`,
      userId
    );
    const outboundDocRef = doc(
      db,
      `social_graph/${userId}/outbound_users`,
      target_userId
    );
    const currentSocialUserDocumentRef = doc(db, "social_graph", userId);
    const targetSocialUserDocumentRef = doc(db, "social_graph", target_userId);
    const userCollectionRef = collection(db, "users");
    const userQuery = query(
      userCollectionRef,
      where("userId", "==", userId.toString())
    ); //created a query
    const targetUserQuery = query(
      userCollectionRef,
      where("userId", "==", target_userId.toString())
    ); //created a query

    // check if target user's document is present in particular user's collection
    const targetUserSnapshot = await getDoc(outboundDocRef);
    if (targetUserSnapshot.exists()) {
      return Promise.all([
        setDoc(
          currentSocialUserDocumentRef,
          { outbound_count: increment(-1), inbound_count: increment(0) },
          { merge: true }
        ),
        setDoc(
          targetSocialUserDocumentRef,
          { inbound_count: increment(-1), outbound_count: increment(0) },
          { merge: true }
        ),
        deleteDoc(outboundDocRef),
        deleteDoc(inboundDocRef),
      ])
        .then((response) => {
          return res.send({
            success: true,
            message: "successfuly unfollowed the user",
          });
        })
        .catch((err) => {
          return res.send({
            success: false,
            message: err.message,
          });
        });
    }

    const userQuerySnapshot = await getDocs(userQuery);
    const targetUserQuerySnapshot = await getDocs(targetUserQuery);

    // these are two different arrays to store userData and target user data
    const userInfoArr = [];
    const targetUserInfoArr = [];
    userQuerySnapshot.forEach((doc) => {
      userInfoArr.push({ ...doc.data(), id: doc.id });
    });
    targetUserQuerySnapshot.forEach((doc) => {
      targetUserInfoArr.push({ ...doc.data(), id: doc.id });
    });
    Promise.all([
      //  storing user info in respective collection
      setDoc(inboundDocRef, {
        userId: userInfoArr[0].userId,
        userName: userInfoArr[0].userName,
        fullName: userInfoArr[0].fullName,
        profileImage: userInfoArr[0].profileImage,
      }),
      setDoc(outboundDocRef, {
        userId: targetUserInfoArr[0].userId,
        userName: targetUserInfoArr[0].userName,
        fullName: targetUserInfoArr[0].fullName,
        profileImage: targetUserInfoArr[0].profileImage,
      }),
      // increase the inbound count of target user and outbound count of current user
      setDoc(
        currentSocialUserDocumentRef,
        { outbound_count: increment(1) },
        { merge: true }
      ),
      setDoc(
        targetSocialUserDocumentRef,
        { inbound_count: increment(1) },
        { merge: true }
      ),
    ])
      .then((result) => {
        res.send({
          success: true,
          message: "successfully followed the user",
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: err.message,
        });
      });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
