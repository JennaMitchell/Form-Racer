const express = require("express");

const colorQuestionController = require("../../controllers/questions/color-question-controller");
const { body } = require("express-validator");
const router = express.Router();

router.put(
  "/add-new-color-question",
  [
    body("first_color").trim().not().isEmpty(),
    body("second_color").trim().not().isEmpty(),
  ],
  colorQuestionController.createNewColorQuestion
);
module.exports = router;
