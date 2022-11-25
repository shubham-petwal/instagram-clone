const { getDoc, doc } = require("firebase/firestore");

const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../../db");

router.get("/", async (req, res) => {
  const { userId, targetId } = req.params;
  if (!userId || !targetId) {
    res.send({
      success: false,
      message: "send userId and targetId in URL",
    });
  }
  const outboundDocRef = doc(
    db,
    `social_graph/${userId}/outbound_users`,
    targetId
  );
  try {
    const targetSnapshot = await getDoc(outboundDocRef);
    if (targetSnapshot.exists()) {
      res.send({
        success: true,
        message: "user is following the target user",
        data: {
          isFollowing: true,
        },
      });
      return;
    } else {
      res.send({
        success: true,
        message: "user is not following the target user",
        data: {
          isFollowing: false,
        },
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
