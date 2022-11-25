const express = require("express");
const router = express.Router({ mergeParams: true });
const dotenv = require("dotenv");
const db = require("../../db");

const {
    collection,
    query,
    getDocs,
    limit,
    startAfter,
    orderBy,
    documentId,
} = require("firebase/firestore");

dotenv.config();


router.get("/", async (req, res) => {
    const { userId } = req.params;
    const { lastDocId } = req.query;
    if (!userId) {
      res.send({
        success: false,
        message: "provide userId",
      });
      return;
    }
  
    const followersCollectionRef = collection(
      db,
      `social_graph/${userId}/inbound_users`
    );
  
    try {
      if (!lastDocId) {
        // if we fetching userData for the first time
        const followersArr = [];
        const nextFollowers = query(
          followersCollectionRef,
          orderBy(documentId()),
          limit(2)
        );
        const snapshot = await getDocs(nextFollowers);
        snapshot.forEach((doc) => {
          followersArr.push({ ...doc.data(), document_id: doc.id });
        });
        if (snapshot.docs.length == 0) {
          // if first document fetch of the user contains no document
          res.send({
            success: true,
            message: "followers list of this user is empty",
            data: [],
          });
          return;
        }
        res.send({
          success: true,
          message: "fetched followers successfuly",
          data: followersArr,
          lastDocId: followersArr[followersArr.length - 1].document_id,
        });
        return;
      } else {
        // if we are fetching userData with some lastDocId
        const followersArr = [];
        const nextFollowers = query(followersCollectionRef,orderBy(documentId()),startAfter(lastDocId),limit(2));
        const snapshot = await getDocs(nextFollowers);
        if(snapshot.docs.length == 0){
            res.send({
                success : true,
                message : "you have reached the end of the follower's list",
                data : []
              })
              return;
        }
        snapshot.forEach((doc) => {
          followersArr.push({ ...doc.data(), document_id: doc.id });
        });
        res.send({
          success: true,
          message: "fetched all the followers successfuly",
          data: followersArr,
          lastDocId: followersArr[followersArr.length - 1].document_id,
        });
        return;
      }
    } catch (err) {
      res.send({
        success: false,
        message: err.message,
      });
    }
  });





module.exports = router;