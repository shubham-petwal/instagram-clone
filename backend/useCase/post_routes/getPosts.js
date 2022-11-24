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
  where,
  Timestamp
} = require("firebase/firestore");

dotenv.config();

const collectionQueryForNextData = (
  collectionName,
  queryItems,
  pageSize,
  orderRef,
  lastDocId
) => {
  const queryRef = query(
    collection(db, collectionName),
    where(queryItems[0], queryItems[1], queryItems[2]),
    orderBy(orderRef[0], orderRef[1]),
    startAfter(Timestamp.fromMillis(lastDocId)),
    limit(parseInt(pageSize))
  );
  return queryRef;
};

const collectionQuery = (collectionName, queryItems, orderRef, pageSize) => {
  const queryRef = query(
    collection(db, collectionName),
    where(queryItems[0], queryItems[1], queryItems[2]),
    orderBy(orderRef[0], orderRef[1]),
    limit(parseInt(pageSize))
  );
  return queryRef;
};

router.get("/", async (req, res) => {
  const { lastDocId, page, userId } = req.query;
  try {
    if (userId) {
      if (lastDocId) {
        const postArr = [];
        const whereClause = ["userId", "==", userId.toString()];
        const orderByClause = ["createdAt", "desc"];
        const nextPost = collectionQueryForNextData(
          "Posts",
          whereClause,
          page,
          orderByClause,
          lastDocId
        );
        const snapshot = await getDocs(nextPost);
        snapshot.forEach((doc) => {
          postArr.push(doc.data());
        });
        if (postArr.length == 0) {
          res.send({
            success: true,
            message: "followers list of this user is empty",
            data: [],
          });
          return;
        }
        res.send({
          success: true,
          message: "fetched all the followers successfuly",
          data: postArr,
        });
        return;
      } else {
        const postArr = [];
        const whereClause = ["userId", "==", userId.toString()];
        const orderByClause = ["createdAt", "desc"];
        const nextPost = collectionQuery(
          "Posts",
          whereClause,
          orderByClause,
          page
        );
        const snapshot = await getDocs(nextPost);
        snapshot.forEach((doc) => {
          postArr.push(doc.data());
        });
        if (postArr.length == 0) {
          res.send({
            success: true,
            message: "you have reached the end of the follower's list",
            data: [],
          });
          return;
        }
        res.send({
          success: true,
          message: "fetched followers successfuly",
          data: postArr,
        });
        return;
      }
    } else {
      if (lastDocId) {
        // if we are fetching userData with some lastDocId
        const postArr = [];
        const nextPost = query(
          collection(db, "Posts"),
          orderBy("createdAt", "desc"),
          startAfter(Timestamp.fromMillis(lastDocId)),
          limit(parseInt(page))
        );
        const snapshot = await getDocs(nextPost);
        snapshot.forEach((doc) => {
          postArr.push(doc.data());
        });
        if (postArr.length == 0) {
          res.send({
            success: true,
            message: "you have reached the end of the follower's list",
            data: [],
          });
          return;
        }
        res.send({
          success: true,
          message: "fetched all the followers successfuly",
          data: postArr,
        });
        return;
      } else {
        // if we fetching userData for the first time
        const postArr = [];
        const nextPost = query(
          collection(db, "Posts"),
          orderBy("createdAt", "desc"),
          limit(parseInt(page))
        );
        const snapshot = await getDocs(nextPost);
        snapshot.forEach((doc) => {
          postArr.push(doc.data());
        });
        if (postArr.length == 0) {
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
          data: postArr,
        });
        return;
      }
    }
  } catch (error) {
    console.log(error.message);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
