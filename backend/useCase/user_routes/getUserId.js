const express = require("express");
const router = express.Router({ mergeParams: true });
const dotenv = require("dotenv");
const db = require("../../db");
const { collection, query, where, getDocs } = require("firebase/firestore");


dotenv.config();

router.get("/", async (req, res) => {
  const { userName } = req.params;
  try {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q);
    const resArr = [];
    querySnapshot.forEach((doc) => {
      resArr.push({ ...doc.data(), id: doc.id });
    });
    if (resArr.length == 0) {
      res.send({
        success: true,
        message: "no user exist with given userName",
        data: "",
      });
      return;
    } else {
      res.send({
        success: true,
        message: "successfully fetched the userId",
        data: resArr[0].userId,
      });
      return;
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});


module.exports = router;