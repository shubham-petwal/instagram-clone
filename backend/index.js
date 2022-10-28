const express = require("express");
const { collection, getDocs, addDoc } = require("firebase/firestore");
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
  try{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const docRef = await addDoc(collectionRef, {
      userId,
      userName,
      fullName,
      email,
      hashedPassword,
    });
    res.send({ success: true, message: "user Registered Successfully" });
  }catch(error){
    console.log(error);
    res.send({success : false, message: error.message});
  }
});
app.get("/users/:userId",(req,res)=>{
  
})

// console.log("reference of doc on storing user data on firestore : ",docRef);
app.listen(process.env.PORT, () => {
  console.log(`app started at port ${process.env.PORT}`);
});
