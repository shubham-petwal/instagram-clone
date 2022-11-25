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
  deleteDoc,
  doc,
  updateDoc,
} = require("firebase/firestore");

dotenv.config();

router.post("/", async (req, res) => {
  const { likedBy_userId, postId } = req.body;
  try {
    const likesCollectionRef = collection(
      db,
      `post_interaction/${postId}/likes`
    );
    const likesDocRef = doc(
      db,
      `post_interaction/${postId}/likes`,
      likedBy_userId
    );
    const userCollectionRef = collection(db, "users");
    const likeQuery = query(
      likesCollectionRef,
      where("likedBy_userId", "==", likedBy_userId.toString())
    );
    const userQuery = query(
      userCollectionRef,
      where("userId", "==", likedBy_userId.toString())
    );
    const querySnapshot = await getDocs(likeQuery);
    const resArr = [];
    querySnapshot.forEach((doc) => {
      resArr.push({ ...doc.data(), id: doc.id });
    });
    // if user likes the post for the first time
    if (resArr.length == 0) {
      const querySnapshot = await getDocs(userQuery);
      const userArray = [];
      querySnapshot.forEach((doc) => {
        userArray.push(doc.data());
      });
      if (userArray.length == 0) {
        throw new Error("unable to find the user with provided userId");
      } else {
        const documentRef = doc(db, "post_interaction", postId);
        const likeDocData = {
          likedBy_userId,
          likedBy_fullName: userArray[0]?.fullName,
          likedBy_profileImage: userArray[0].profileImage
            ? userArray[0].profileImage
            : "",
          likedBy_userName: userArray[0]?.userName,
        };
        Promise.all([
          setDoc(likesDocRef, likeDocData),
          setDoc(documentRef, { likes_count: increment(1) }, { merge: true }),
        ])
          .then((result) => {
            res.send({
              success: true,
              message: "liked the post successfully",
            });
          })
          .catch((error) => {
            res.send({
              success: false,
              message: error.message,
            });
          });
      }
    }
    // if user has already liked the post and clicks the like button again
    else {
      const documentRef = doc(db, "post_interaction", postId);
      Promise.all([
        updateDoc(documentRef, { likes_count: increment(-1) }),
        deleteDoc(doc(db, `post_interaction/${postId}/likes`, resArr[0].id)),
      ])
        .then(() => {
          res.send({
            success: true,
            message: "unliked the post",
          });
        })
        .catch((err) => {
          res.send({
            success: false,
            message: err.message,
          });
        });
    }
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
