const express = require("express");
const scoreboardController = require("../controllers/scoreboards/scoreboard-controller");
const router = express.Router();
const { body } = require("express-validator");
router.get(
  "/get-scoreboard-data",
  scoreboardController.getAllSelectedScoreboardData
);
router.put(
  "/create-new-scoreboard-data",
  [
    body("username")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (value.length !== 3) {
          return new Error("Invalid username");
        } else {
          return true;
        }
      }),
    body("user_time")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        const splitValue = value.split(":");
        if (splitValue.length !== 3) {
          return new Error("Invalid ranking");
        } else {
          return true;
        }
      }),
    body("ranking")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (typeof +value !== "number") {
          return new Error("Invalid ranking");
        } else {
          if (+value > 10 || +value < 1) {
            return new Error("Invalid input_required");
          } else {
            return true;
          }
        }
      }),
  ],
  scoreboardController.createNewScoreboardEntry
);

module.exports = router;
