const express = require("express");
const router = express.Router({ mergeParams: true });
const dotenv = require("dotenv");
const db = require("../../db");
const { v4: uuidv4 } = require("uuid");

const {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  setDoc,
  increment,
  doc,
} = require("firebase/firestore");

dotenv.config();

router.post("/", async (req, res) => {
  const { userId, postId, commentData } = req.body;
  try {
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
    const newDate = new Date().toLocaleString();
    const data = {
      commentBy_fullName: resArr[0].fullName,
      commentBy_userName: resArr[0].userName,
      commentBy_userId: userId,
      commentData: commentData,
      commentId: uuidv4(),
      commentBy_profileImage: resArr[0].profileImage,
      createdAt: newDate,
    };
    const commentsDocumentRef = collection(
      db,
      `post_interaction/${postId}/comments`
    );
    Promise.all([
      addDoc(commentsDocumentRef, data),
      setDoc(
        doc(db, "post_interaction", postId),
        { comments_count: increment(1) },
        { merge: true }
      ), //write merge:true to make doc if not exists and update it as well if it exist
    ])
      .then(() => {
        res.send({
          success: true,
          message: "request fetched successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        res.send({ success: false, message: error.message });
      });
    // console.log(docRef)
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }
});

module.exports = router;
