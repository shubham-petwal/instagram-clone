const express = require("express");
const {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} = require("firebase/firestore");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
