const express = require("express");

const checkboxQuestionController = require("../../controllers/questions/checkbox-question-controller");
const { body } = require("express-validator");
const router = express.Router();
router.put(
  "/add-new-checkbox-question",
  [
    body("question").trim().not().isEmpty(),
    body("possible_answer_one").trim().not().isEmpty(),
    body("possible_answer_two").trim().not().isEmpty(),
    body("possible_answer_three").trim().not().isEmpty(),
    body("possible_answer_four").trim().not().isEmpty(),
    body("possible_answer_five").trim().not().isEmpty(),
    body("possible_correct_answer_one")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (value !== "true" && value !== "false") {
          console.log("28");
          throw new Error("Invalid Boolean");
        } else {
          return true;
        }
      }),
    body("possible_correct_answer_two")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (value !== "true" && value !== "false") {
          throw new Error("Invalid Boolean");
        } else {
          return true;
        }
      }),
    body("possible_correct_answer_three")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (value !== "true" && value !== "false") {
          throw new Error("Invalid Boolean");
        } else {
          return true;
        }
      }),
    body("possible_correct_answer_four")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (value !== "true" && value !== "false") {
          throw new Error("Invalid Boolean");
        } else {
          return true;
        }
      }),
    body("possible_correct_answer_five")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (value !== "true" && value !== "false") {
          throw new Error("Invalid Boolean");
        } else {
          return true;
        }
      }),
  ],
  checkboxQuestionController.createNewCheckboxQuestion
);
module.exports = router;
