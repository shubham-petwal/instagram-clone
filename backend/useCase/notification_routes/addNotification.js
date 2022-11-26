const express = require("express");
const router = express.Router({ mergeParams: true });
const dotenv = require("dotenv");
const db = require("../../db");
const { v4: uuidv4 } = require("uuid");

const {
  collection,
  addDoc,
  Timestamp,
} = require("firebase/firestore");

dotenv.config();


router.post("/", async (req, res) => {
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
  module.exports = router;