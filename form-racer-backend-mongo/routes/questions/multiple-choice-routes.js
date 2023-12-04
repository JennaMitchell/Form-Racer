const express = require("express");

const multipleChoiceQuestionController = require("../../controllers/questions/multiple-choice-question-controller");
const { body } = require("express-validator");
const router = express.Router();

router.put(
  "/add-new-multiple-choice-question",
  [
    body("question_text").trim().not().isEmpty(),
    body("possible_answer_one").trim().not().isEmpty(),
    body("possible_answer_two").trim().not().isEmpty(),
    body("possible_answer_three").trim().not().isEmpty(),
    body("possible_answer_four").trim().not().isEmpty(),
    body("correct_answer").trim().not().isEmpty(),
  ],
  multipleChoiceQuestionController.createNewMultipleChoiceQuestion
);
module.exports = router;
