const {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  increment,
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
const { v4: uuidv4 } = require("uuid");
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

//the name we are using here in single("file")---should be in the input name  <input type="text" name=file"> than only we can get file
router.post("/", upload.single("file"), async (req, res) => {
  const { userId, caption } = req.body;
  const newDate = new Date().toLocaleString();

  try {
    const url = await uploadImageToBucket(
      "Posts/" + req.file.filename,
      req.file.filename
    );

    const userCollectionRef = collection(db, "users");
    const q = query(
      userCollectionRef,
      where("userId", "==", userId.toString())
    ); //created a query
    const querySnapshot = await getDocs(q);
    const resArr = [];
    querySnapshot.forEach((doc) => {
      resArr.push({ ...doc.data(), documentId: doc.id });
    });
    const updationData = {
      postCount: increment(1),
    };
    const userDocumentRef = doc(db, "users", resArr[0].documentId);

    const collectionRef = collection(db, "Posts");

    const postObj = {
      userId: userId,
      image: url,
      userName: resArr[0].userName,
      profileImage: resArr[0].profileImage,
      caption: caption,
      postId: uuidv4(),
      createdAt: Timestamp.now(),
      thumbnailImage: "",
    };

    const snapshotName = uuidv4();
    if (!isImage(req.file.filename)) {
      const thumblerPromise = new Promise((resolve, reject) => {
        thumbler.extract(
          `./uploads/${req.file.filename}`,
          `./uploads/${snapshotName}.png`,
          "00:00:01",
          "300x400",
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


    addDoc(collectionRef, postObj).then(async (docRef) => {
      // updating the count of posts in userProfile once the post is uploaded;
      const updateDocResponse = await updateDoc(userDocumentRef, updationData);
      console.log("Document Added");
      const documentRef = doc(db, `Posts/${docRef.id}`);
      updateDoc(documentRef, { docId: docRef.id });
      
      if(!isImage(req.file.filename)){
        fs.unlink("uploads/" + snapshotName + ".png", function (err) {
          if (err) return console.log(err);
          console.log("thumbnail deleted successfully");
        });
      }
      fs.unlink("uploads/" + req.file.filename, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
        res.send({ success: true, message: "Uploaded Successfully" });
      });
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }
});

module.exports = router;
