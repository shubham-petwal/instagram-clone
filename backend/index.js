const express = require("express");
const {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  setDoc,
  onSnapshot,
  Timestamp,
} = require("firebase/firestore");
// import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const { ref,getStorage, uploadBytes, getDownloadURL,uploadBytesResumable } = require("firebase/storage");
const { doc, updateDoc, arrayUnion } = require("firebase/firestore");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("./db");
const bucket = require("./bucket")
const storage = require("./storage");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require("fs");

// DiskSotrage function accepts an object with two values which is {destination:"", filename:""}


async function uploadImageToBucket(destination,fileName){
  await bucket.upload("./uploads/"+fileName, {
    destination: destination,
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000'
    }
  });
    const storageRef =  ref(storage, destination)
    const url = await getDownloadURL(storageRef)
    return url;
}


const fileStoragePath = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStoragePath });

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //it will provide posted data in the req.body json object

dotenv.config();

//endpoints are described below

app.post("/register", async (req, res) => {
  const { userId, userName, fullName, email, password } = req.body;
  const collectionRef = collection(db, "users");
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    //need to initialise "profileImage" as some dummy image and then store in the database, can be updated afterwards
    const docRef = await addDoc(collectionRef, {
      userId,
      userName,
      fullName,
      email,
      hashedPassword,
      bioData : "",  //this is the initial data passes, can be updated further
      postCount: 0,
      profileImage : ""
    });
    res.send({ success: true, message: "user Registered Successfully" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }
});

app.get("/users/:userId", async (req, res) => {
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
        fullName: resArr[0].fullName,
        postCount: resArr[0].postCount,
        userName: resArr[0].userName,
        bioData : resArr[0].bioData,
        email : resArr[0].email,
        gender : resArr[0].gender || undefined
      },
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

app.post(
  "/uploadPost",
  upload.single("file"), //the name we are using here in single("file")---should be in the input name  <input type="text" name=file"> than only we can get file
  async (req, res) => {
    const { userId, caption } = req.body;
    const newDate = new Date().toLocaleString();

  try {
    const url = await uploadImageToBucket('Posts/'+req.file.filename,req.file.filename);
    const collectionRef = collection(db, "Posts");
    const postObj = {
      userId: userId,
      image: url,
      caption: caption,
      postId: uuidv4(),
      createdAt: newDate,
    };
    addDoc(collectionRef, postObj).then(()=>{
      console.log("Document Added")
      fs.unlink("uploads/"+req.file.filename,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
        res.send({ success: true, message: "Uploaded Successfully" });
  
   });
    })
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: error.message });
    }
  }
);


app.get("/getPosts/:userId",async(req,res)=>{
  try {
    const userId = req.params.userId;
    const collectionRef = collection(db, "Posts");
    const q = query(collectionRef, where("userId", "==", userId.toString()));
    const querySnapshot = await getDocs(q);
    const resArr = [];
    querySnapshot.forEach((doc) => {
      resArr.push(doc.data());
      console.log(doc.data())
    });
    if (resArr.length == 0) {
      throw new Error("unable to find the user with provided userId");
    }
    console.log(resArr)
    res.send({
      success: true,
      message: "request fetched successfully",
      data: resArr,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
})


app.get("/getPosts/",async(req,res)=>{
  try {
    const resArr = [];
    console.log("Started")
    const collectionRef = query(collection(db, 'Posts'))
    const documentSnapshots = await getDocs(collectionRef)
    documentSnapshots.forEach(doc => {
      resArr.push(doc.data()); 
    })
    console.log("Ended")
    res.send({
      success: true,
      message: "request fetched successfully",
      data: resArr,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
})

// In Post method we can get data using "req.body" and in GET method we get data by "req.query"

app.post('/updateUser',async (req,res)=>{
  const {fullName,userName, gender, bioData, userId}=req.body;
  const data = {
    fullName,
    userName,
    bioData,
    gender
  }
  try{
    //finding user and getting its document id
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("userId", "==", userId.toString())); //created a query
    const findQuerySnapshot = await getDocs(q);
    const resArr = [];
    findQuerySnapshot.forEach((doc) => {
      resArr.push({...doc.data(), id : doc.id});
    });
    // updating user document
    const documentRef = doc(db,"users",resArr[0].id)
    const updateDocResponse = await updateDoc(documentRef,data);
    console.log(updateDocResponse);
    //sending response once user is updated
    res.send({
      success : true,
      message : "user update successful"
    });

  }catch(error){
    res.send({
      success : false,
      message : error.message
    });
  }

})



app.listen(process.env.PORT, () => {
  console.log(`app started at port ${process.env.PORT}`);
});



