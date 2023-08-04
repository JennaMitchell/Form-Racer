const express = require("express");
const { body } = require("express-validator");

const leardboardController = require("../controllers/leaderboard-controller");
const router = express.Router();

router.get(
  "/get-leaderboard-data:database",
  leardboardController.getLeaderboardData
);
router.put(
  "/update-leader-board-data:database",
  [
    body("username").isLength({ max: 3, min: 3 }),
    body("ranking").custom((value, { req }) => {
      if (value > 11) {
        return Promise.reject("Invalid Limit");
      }
    }),
  ],
  leardboardController.updateLeaderboardData
);
module.exports = router;
