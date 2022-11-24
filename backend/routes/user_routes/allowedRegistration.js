const express = require("express");
const router = express.Router({mergeParams: true});
const dotenv = require("dotenv");
const { collection, query, where, getDocs } = require("firebase/firestore");
const db = require('../../db');

dotenv.config();

router.get('/', async(req,res)=>{
    try{
        const {userName} = req.params;
        const collectionRef = collection(db, "users");
        const q = query(collectionRef, where("userName", "==", userName));
        const querySnapshot = await getDocs(q);
        const resArr = [];
        querySnapshot.forEach((doc) => {
          resArr.push({ ...doc.data(), id: doc.id });
        });
        if(resArr.length!=0){
          res.send({
            success : true,
            message : "Already a user Exists with choosed UserName, choose unique UserName",
            isAllowed : false
          })
          return;
        }
        else{
          res.send({
            success : true,
            message : "no user exists with provided userName",
            isAllowed : true
          })
          return;
        }

    }catch(error){
        res.send({
            success : false,
            message : error.message
          })
    }
})

module.exports = router;



