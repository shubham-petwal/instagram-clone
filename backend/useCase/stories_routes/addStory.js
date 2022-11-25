const {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
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
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require("fs");
var thumbler = require("video-thumb");

// DiskSotrage function accepts an object with two values which is {destination:"", filename:""}

const fileStoragePath = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "--" + file.originalname);
  },
});
function isImage(url) {
  const regex = /.png|.jpg|.jpeg/;
  return regex.test(url);
}

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

router.post(
  "/",
  upload.single("file"), //the name we are using here in single("file")---should be in the input name  <input type="text" name=file"> than only we can get file
  async (req, res) => {
    const { userId } = req.body;
    // const newDate = new Date();
    function addHours(numOfHours, date = new Date()) {
      date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
      return date;
    }
    try {
      const url = await uploadImageToBucket(
        "Stories/" + req.file.filename,
        req.file.filename
      );
      const userCollectionRef = collection(db, "users");
      const q = query(
        userCollectionRef,
        where("userId", "==", userId.toString())
      );
      //created a query
      const querySnapshot = await getDocs(q);
      const resArr = [];
      querySnapshot.forEach((doc) => {
        resArr.push(doc.data());
      });
      const storiesCollectionRef = collection(db, "stories");
      const postObj = {
        userId: userId,
        userName: resArr[0].userName,
        profileImage: resArr[0].profileImage,
        image: url,
        StoryId: uuidv4(),
        deleteAt: addHours(0.1),
        createdAt: Timestamp.now(),
        thumbnailImage: "",
      };
      //if file is not an image
      const snapshotName = uuidv4();
      if (!isImage(req.file.filename)) {
        const thumblerPromise = new Promise((resolve, reject) => {
          thumbler.extract(
            `./uploads/${req.file.filename}`,
            `./uploads/${snapshotName}.png`,
            "00:00:01",
            "200x125",
            () => {
              uploadImageToBucket(
                "Thumbnail/" + `${snapshotName}.png`,
                `${snapshotName}.png`
              )
                .then((snapshotURL) => {
                  resolve(snapshotURL);
                })
                .catch((err) => {
                  reject(err);
                });
            }
          );
        });
        const thumbnailImage = await thumblerPromise;
        postObj.thumbnailImage = thumbnailImage;
      }
      const docRef = await addDoc(storiesCollectionRef, postObj);
      // const documentRef = doc(db, `stories/${docRef.id}`);
      // await updateDoc(documentRef, { docId: docRef.id });
      console.log("Document Added");

      if (!isImage(req.file.filename)) {
        fs.unlink("uploads/" + snapshotName + ".png", function (err) {
          if (err) return console.log(err);
          console.log("thumbnail deleted successfully");
        });
      }
      fs.unlink("uploads/" + req.file.filename, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
      });

      res.send({ success: true, message: "Uploaded Successfully" });

    } catch (error) {
      console.log(error);
      res.send({ success: false, message: error.message });
    }
  }
);

module.exports = router;
