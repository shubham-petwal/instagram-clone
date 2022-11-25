const express = require("express");
const router = express.Router({ mergeParams: true });
const dotenv = require("dotenv");
const db = require("../../db");

const {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
  startAfter,
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
        const storiesArray = [];
        const whereClause = ["userId", "==", userId.toString()];
        const orderByClause = ["deleteAt", "desc"];
        const nextStories = collectionQueryForNextData(
          "stories",
          whereClause,
          page,
          orderByClause,
          lastDocId
        );
        const snapshot = await getDocs(nextStories);
        snapshot.forEach((doc) => {
          storiesArray.push(doc.data());
        });
        if (storiesArray.length == 0) {
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
          data: storiesArray,
        });
        return;
      } else {
        const storiesArray = [];
        const whereClause = ["userId", "==", userId.toString()];
        const orderByClause = ["deleteAt", "desc"];
        const nextStories = collectionQuery(
          "stories",
          whereClause,
          orderByClause,
          page
        );
        const snapshot = await getDocs(nextStories);
        snapshot.forEach((doc) => {
          storiesArray.push(doc.data());
        });
        if (storiesArray.length == 0) {
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
          data: storiesArray,
        });

        return;
      }
    } else {
      const currentTime = new Date();
      if (lastDocId) {
        const storiesArray = [];
        const whereClause = ["deleteAt", ">=", currentTime];
        const orderByClause = ["deleteAt", "desc"];
        const nextStories = collectionQueryForNextData(
          "stories",
          whereClause,
          page,
          orderByClause,
          lastDocId
        );
        const snapshot = await getDocs(nextStories);
        snapshot.forEach((doc) => {
          storiesArray.push(doc.data());
        });
        if (storiesArray.length == 0) {
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
          data: storiesArray,
        });
        return;
      } else {
        const storiesArray = [];
        const whereClause = ["deleteAt", ">=", currentTime];
        const orderByClause = ["deleteAt", "desc"];
        const nextStories = collectionQuery(
          "stories",
          whereClause,
          orderByClause,
          page
        );
        const snapshot = await getDocs(nextStories);
        snapshot.forEach((doc) => {
          storiesArray.push(doc.data());
        });
        if (storiesArray.length == 0) {
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
          data: storiesArray,
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
