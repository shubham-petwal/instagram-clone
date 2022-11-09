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
  increment,
  FieldValue,
  getDoc,
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
const { async } = require("@firebase/util");

// DiskSotrage function accepts an object with two values which is {destination:"", filename:""}

const fileStoragePath = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "--" + file.originalname);
  },
});


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
    console.log(resArr)
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

    const userscollectionRef = collection(db, "users");
    const q = query(userscollectionRef, where("userId", "==", userId.toString())); //created a query
    const querySnapshot = await getDocs(q);
    const resArr = [];
    querySnapshot.forEach((doc) => {
      resArr.push(doc.data());
    });


    const postObj = {
      userId: userId,
      image: url,
      caption: caption,
      postId: uuidv4(),
      createdAt: newDate,
      userName:resArr[0].userName
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
    });
    if (resArr.length == 0) {
      throw new Error("unable to find the user with provided userId");
    }
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
    const collectionRef = query(collection(db, 'Posts'))
    const documentSnapshots = await getDocs(collectionRef)
    documentSnapshots.forEach(doc => {
      resArr.push(doc.data());
    })
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

app.post("/addComment",async(req,res)=>{
  const {userId, postId, commentData} = req.body;
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
    console.log("commentData:",commentData)
   const data =  {
      commentBy_fullName: resArr[0].fullName,
      commentBy_userName: resArr[0].userName,
      commentBy_userId:userId,
      commentData:commentData,
      commentId:uuidv4(),
      commentBy_profileImage:""
    }
    const commentsDocumentRef =  collection(db, `post_interaction/${postId}/comments`);
    Promise.all([
      addDoc(commentsDocumentRef, data),
      setDoc(doc(db, "post_interaction", postId), {comments_count: increment(1)},{merge:true})      //write merge:true to make doc if not exists and update it as well if it exist
    ]).then(()=>{
      res.send({
        success: true,
        message: "request fetched successfully",
      });
    }).catch ((error)=>{
      console.log(error)
      res.send({success : false, message : error.message});
    })
    // console.log(docRef)
    
  } catch (error) {
    console.log(error)
    res.send({success : false, message : error.message});
  }
})

app.get("/getComments/:postId",async(req,res)=>{
  try {
    const postId = req.params.postId;
    const resArr = [];
    const collectionRef = query(collection(db, `post_interaction/${postId}/comments`))
    const documentSnapshots = await getDocs(collectionRef)
    documentSnapshots.forEach(doc => {
      resArr.push(doc.data());
    })
    if (resArr.length == 0) {
      throw new Error("unable to find the comments with provided userId");
    }
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
// app.get("/totalLikesAndComments/:postId",async(req,res)=>{
//   try {
//     const postId = req.params.postId;
//     const resArr = [];
//     // console.log("Started")
//     const docRef = doc(db, "post_interaction",postId);
//     const docSnap = await getDoc(docRef)
//     if (docSnap.exists()) {
//       res.send({
//         success: true,
//         message: "request fetched successfully",
//         data: docSnap.data().comments_count,
//       });
//     } else {
//       console.log('No such document!')
//     }

//   } catch (error) {
//     console.log(error.message)
//     res.send({
//       success: false,
//       message: error.message,
//     });

//   }
// })

// app.get("/totalLikesAndComments/:postId",async(req,res)=>{
//   try {
//     const postId = req.params.postId;
//     const resArr = [];
//     // console.log("Started")


//     const docRef = doc(db, "post_interaction",postId);
//     // const docSnap = await getDoc(docRef)
//     // const doc = db.collection('post_interaction').doc(postId);

//     const unsub =  onSnapshot(doc(db, "post_interaction", postId), (doc) => {
//       console.log("Current data: ", doc.data());
//   });
//     // console.log(observer)

//     // if (docSnap.exists()) {
//     //   res.send({
//     //     success: true,
//     //     message: "request fetched successfully",
//     //     data: docSnap.data().comments_count,
//     //   });
//     // } else {
//     //   console.log('No such document!')
//     // }

//   } catch (error) {
//     console.log(error.message)
//     res.send({
//       success: false,
//       message: error.message,
//     });

//   }
// })



app.listen(process.env.PORT, () => {
  console.log(`app started at port ${process.env.PORT}`);
});



