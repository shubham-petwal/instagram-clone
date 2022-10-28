const express = require("express");
const { collection, getDocs } = require("firebase/firestore");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./db')

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

app.get("/", async (req, res) => {
  const collectionRef = collection(db, "users");

  getDocs(collectionRef).then((snapshot) => {
    let users = [];
    snapshot.docs.forEach((doc)=>{
        users.push({...doc.data(), id : doc.id})
    })
    console.log(users);
  }).finally(()=>{
      res.send("this is homepage");
  })
});
app.get("/about", (req, res) => {
  res.send("this is about");
});

app.listen(process.env.PORT, () => {
  console.log(`app started at port ${process.env.PORT}`);
});
