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
  deleteDoc,
  limit,
  startAfter,
  orderBy,
  documentId,
  FieldPath
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
    res.send({
      success: true,
      message: "request fetched successfully",
      data: {
        profileImage : resArr[0].profileImage,
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

app.post('/updateProfileImage',upload.single("file"),async (req, res) => {
    const { userId } = req.body;
  //finding user and getting its document id
  try {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("userId", "==", userId.toString())); //created a query
    const findQuerySnapshot = await getDocs(q);
    const resArr = [];
    findQuerySnapshot.forEach((doc) => {
      resArr.push({...doc.data(), id : doc.id});
    });
  // updating user document
    const documentRef = doc(db,"users",resArr[0].id)
    const url = await uploadImageToBucket('profiles/'+req.file.filename,req.file.filename);
    const postObj = {
      profileImage : url
    };
    await updateDoc(documentRef,postObj);
    res.send({success : true, message : "updated profile picture"})
  } 
  catch (error) {
      console.log(error);
      res.send({ success: false, message: error.message });
  }
  
});

app.get("/likedByUser",(req,res)=>{
})


app.post("/like", async (req, res) => {
  const { likedBy_userId, postId } = req.body;
  try {
    const likesCollectionRef = collection( db,`post_interaction/${postId}/likes`);
    const likesDocRef = doc(db,`post_interaction/${postId}/likes`,likedBy_userId);
    const userCollectionRef = collection(db, "users");
    const likeQuery = query(likesCollectionRef,where("likedBy_userId", "==", likedBy_userId.toString()));
    const userQuery = query(userCollectionRef, where("userId", "==", likedBy_userId.toString())); 
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
          likedBy_profileImage: userArray[0].profileImage?userArray[0].profileImage:"",
          likedBy_userName: userArray[0]?.userName,
        };
        Promise.all([
          setDoc(likesDocRef, likeDocData),
          setDoc(documentRef, { likes_count: increment(1) }, {merge : true}) 
        ]).then((result)=>{
          res.send({
            success : true,
            message : "liked the post successfully"
          })
        }).catch((error)=>{
          res.send({
            success: false,
            message: error.message,
          });
        })
      }
    } 
    // if user has already liked the post and clicks the like button again
    else {
      const documentRef = doc(db, "post_interaction", postId);
      Promise.all([
        updateDoc(documentRef, { likes_count: increment(-1) }),
        deleteDoc(
          doc(db, `post_interaction/${postId}/likes`, resArr[0].id)
        ),
      ]).then(()=>{
        res.send({
          success: true,
          message: "unliked the post",
        });
      }).catch((err)=>{
        res.send({
          success: false,
          message : err.message
        })
      })
    }
  } 
  catch(error){
    console.log(error)
    res.send({
      success: false,
      message: error.message,
    });
  }
});

app.post("/follow", async (req, res) => {
  const { target_userId, userId } = req.body;
  if(!target_userId || !userId){
    res.send({
      success : false,
      message : "send the userId and target userId"
    });
    return;
  }
  try {
    // on clicking follow button inbound of target user increases and outbound of current use increases
    const inboundDocRef = doc( db,`social_graph/${target_userId}/inbound_users`,userId);  
    const outboundDocRef = doc( db,`social_graph/${userId}/outbound_users`,target_userId);
    const currentSocialUserDocumentRef = doc(db,"social_graph",userId)
    const targetSocialUserDocumentRef = doc(db,"social_graph",target_userId)
    const userCollectionRef = collection(db, "users");
    const userQuery = query(userCollectionRef, where("userId", "==", userId.toString() )); //created a query
    const targetUserQuery = query(userCollectionRef, where("userId", "==", target_userId.toString())); //created a query

    // check if target user's document is present in particular user's collection
    const targetUserSnapshot = await getDoc(outboundDocRef);
    if(targetUserSnapshot.exists()){
      return Promise.all([
        setDoc(currentSocialUserDocumentRef, { outbound_count : increment(-1), inbound_count : increment(0) }, {merge : true}) ,
        setDoc(targetSocialUserDocumentRef, { inbound_count : increment(-1), outbound_count : increment(0)  }, {merge : true}) ,
        deleteDoc(outboundDocRef),
        deleteDoc(inboundDocRef),
      ]).then((response)=>{
        return res.send({
          success : true,
          message : "successfuly unfollowed the user"
        });
      }).catch((err)=>{
        return res.send({
          success : false,
          message: err.message
        });
      })
      
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
      setDoc(inboundDocRef,{
        userId : userInfoArr[0].userId,
        userName : userInfoArr[0].userName,
        fullName : userInfoArr[0].fullName,
        profileImage : userInfoArr[0].profileImage
      }),
       setDoc(outboundDocRef,{
        userId : targetUserInfoArr[0].userId,
        userName : targetUserInfoArr[0].userName,
        fullName : targetUserInfoArr[0].fullName,
        profileImage : targetUserInfoArr[0].profileImage
      }),
      // increase the inbound count of target user and outbound count of current user
       setDoc(currentSocialUserDocumentRef, { outbound_count : increment(1)}, {merge : true}) ,
       setDoc(targetSocialUserDocumentRef, { inbound_count : increment(1) }, {merge : true}) ,
    ]).then((result)=>{
      res.send({
        success : true,
        message : "successfully followed the user"
      })
    }).catch((err)=>{
      res.send({
        success : false,
        message : err.message
      })
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

app.get('/followers/:userId', async (req,res)=>{
  const {userId} = req.params;
  const {lastDocId} = req.query;
  if(!userId){
    res.send({
      success : false,
      message : "provide userId"
    })
    return;
  }

  const followersCollectionRef = collection(db, `social_graph/${userId}/inbound_users`);
  
  try{
    if(!lastDocId){ // if we fetching userData for the first time
      const followersArr = [];
      const nextFollowers = query(followersCollectionRef,orderBy(documentId()),limit(2));
      const snapshot = await getDocs(nextFollowers);
      snapshot.forEach((doc) => {
        followersArr.push({...doc.data(), document_id : doc.id});
      });
      if(snapshot.docs.length == 0){ // if first document fetch of the user contains no document
        res.send({
          success : true,
          message : "followers list of this user is empty",
          data : []
        })
        return;
      }
      res.send({
        success : true,
        message : "fetched followers successfuly",
        data : followersArr,
        lastDocId : followersArr[followersArr.length-1].document_id
      })
      return;
    }
    else{
      // if we are fetching userData with some lastDocId
      const followersArr = [];
      // below query to check if documents after the lastDocId exists or not
      const checkSnapshot = await getDocs(query(followersCollectionRef,orderBy(documentId()),startAfter(lastDocId),limit(1) ));
      if(checkSnapshot.docs.length == 0){
          res.send({
              success : true,
              message : "you have reached the end of the follower's list",
              data : []
            })
            return;
      }
      const nextFollowers = query(followersCollectionRef,orderBy(documentId()),startAfter(lastDocId),limit(2));
      const snapshot = await getDocs(nextFollowers);
      snapshot.forEach((doc) => {
        followersArr.push({...doc.data(), document_id : doc.id});
      });
      res.send({
        success : true,
        message : "fetched all the followers successfuly",
        data : followersArr,
        lastDocId : followersArr[followersArr.length-1].document_id
      })
      return;
    }
  }catch(err){
    res.send({
      success : false,
      message : err.message
    })
  }
})


app.get('/following/:userId', async (req,res)=>{
  const {userId} = req.params;
  const {lastDocId} = req.query;
  if(!userId){
    res.send({
      success : false,
      message : "provide userId"
    })
    return;
  }

  const followingCollectionRef = collection(db, `social_graph/${userId}/outbound_users`);
  
  try{
    if(!lastDocId){ // if we fetching userData for the first time
      const followingArray = [];
      const nextFollowing = query(followingCollectionRef,orderBy(documentId()),limit(2));
      const snapshot = await getDocs(nextFollowing);
      snapshot.forEach((doc) => {
        followingArray.push({...doc.data(), document_id : doc.id});
      });
      if(snapshot.docs.length == 0){ // if first document fetch of the user contains no document
        res.send({
          success : true,
          message : "following list of this user is empty",
          data : []
        })
        return;
      }
      res.send({
        success : true,
        message : "fetched 2 users you are following successfuly",
        data : followingArray,
        lastDocId : followingArray[followingArray.length-1].document_id
      })
      return;
    }
    else{
      // if we are fetching userData with some lastDocId
      const followingArray = [];
      // below query to check if documents after the lastDocId exists or not
      const checkSnapshot = await getDocs(query(followingCollectionRef,orderBy(documentId()),startAfter(lastDocId),limit(1) ));
      if(checkSnapshot.docs.length == 0){
          res.send({
              success : true,
              message : "you have reached the end of the following user's list",
              data : []
            })
            return;
      }
      const nextFollowing = query(followingCollectionRef,orderBy(documentId()),startAfter(lastDocId),limit(2));
      const snapshot = await getDocs(nextFollowing);
      snapshot.forEach((doc) => {
        followingArray.push({...doc.data(), document_id : doc.id});
      });
      res.send({
        success : true,
        message : "fetched all the users you are following successfuly",
        data : followingArray,
        lastDocId : followingArray[followingArray.length-1].document_id
      })
      return;
    }
  }catch(err){
    res.send({
      success : false,
      message : err.message
    })
  }
})




app.listen(process.env.PORT, () => {
  console.log(`app started at port ${process.env.PORT}`);
});