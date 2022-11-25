const {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} = require("firebase/firestore");
// import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
const express = require("express");
const router = express.Router({ mergeParams: true });
const { ref, getDownloadURL } = require("firebase/storage");
const dotenv = require("dotenv");
const db = require("../../db");
const bucket = require("../../bucket");
const storage = require("../../storage");
const multer = require("multer");
const fs = require("fs");
const algoliasearch = require("algoliasearch");

// DiskSotrage function accepts an object with two values which is {destination:"", filename:""}

const fileStoragePath = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "--" + file.originalname);
  },
});

async function uploadImageToBucket(destination, fileName) {
  await bucket.upload("./uploads/" + fileName, {
    destination: destination,
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });
  const storageRef = ref(storage, destination);
  const url = await getDownloadURL(storageRef);
  return url;
}

const upload = multer({ storage: fileStoragePath });

dotenv.config();

router.post("/", upload.single("file"), async (req, res) => {
  const { userId } = req.body;
  //finding user and getting its document id
  try {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("userId", "==", userId.toString())); //created a query
    const findQuerySnapshot = await getDocs(q);
    const resArr = [];
    findQuerySnapshot.forEach((doc) => {
      resArr.push({ ...doc.data(), id: doc.id });
    });
    // updating user document
    const documentRef = doc(db, "users", resArr[0].id);
    const url = await uploadImageToBucket(
      "profiles/" + req.file.filename,
      req.file.filename
    );
    const postObj = {
      profileImage: url,
    };
    await updateDoc(documentRef, postObj);
    fs.unlink("uploads/" + req.file.filename, function (err) {
      if (err) return console.log(err);
      console.log("file deleted successfully");
    });

    const searchClient = algoliasearch(
      process.env.ALOGOLIA_APP_ID,
      process.env.ALOGOLIA_ADMIN_API_KEY
    );
    const instaIndex = searchClient.initIndex("instagram_users");
    const actors = {
      fullName: resArr[0].fullName,
      userName: resArr[0].userName,
      profileImage: url,
      objectID: resArr[0].userId,
    };
    instaIndex
      .saveObject(actors)
      .then(() => {
        console.log("done updating the profile image in instaIndex");
      })
      .catch((err) => {
        console.log("updation error : ", err.message);
      });

    res.send({ success: true, message: "updated profile picture" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }
});

module.exports = router;
