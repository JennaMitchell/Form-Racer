const express = require("express");

const sliderQuestionController = require("../../controllers/questions/slider-question-controller");
const { body } = require("express-validator");
const router = express.Router();

router.put(
  "/add-new-slider-question",
  [
    body("question_text").trim().not().isEmpty(),
    body("slider_lower_limit")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (typeof +value !== "number") {
          throw new Error("Invalid slider_lower_limit");
        } else {
          return true;
        }
      }),
    body("slider_higher_limit")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (typeof +value !== "number") {
          throw new Error("Invalid slider_higher_limit");
        } else {
          return true;
        }
      }),
    body("slider_question_lower_limit")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (typeof +value !== "number") {
          throw new Error("Invalid slider_question_lower_limit");
        } else {
          return true;
        }
      }),
    body("slider_question_higher_limit")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (typeof +value !== "number") {
          throw new Error("Invalid slider_question_higher_limit");
        } else {
          return true;
        }
      }),
  ],
  sliderQuestionController.createNewSliderQuestion
);
module.exports = router;
