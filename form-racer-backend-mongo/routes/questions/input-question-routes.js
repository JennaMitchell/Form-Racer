const express = require("express");
// const { body } = require("express-validator");
const inputQuestionController = require("../../controllers/questions/input-question-controller");
const { body } = require("express-validator");
const router = express.Router();
// Checkbox Questions

router.put(
  "/add-new-input-question",
  [
    body("question_text").trim().not().isEmpty(),
    body("input_name").trim().not().isEmpty(),
    body("type").trim().not().isEmpty(),
    body("label").trim().not().isEmpty(),
    body("pattern").trim().not().isEmpty(),
    body("input_required")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (value !== "true" && value !== "false") {
          throw new Error("Invalid input_required");
        } else {
          return true;
        }
      }),
    body("min_number_of_characters")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (typeof +value !== "number" || +value <= 0) {
          throw new Error("Invalid min_number_of_characters");
        } else {
          return true;
        }
      }),
    body("max_number_of_characters")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (typeof +value !== "number" || +value <= 0) {
          throw new Error("Invalid max_number_of_characters");
        } else {
          return true;
        }
      }),
  ],
  inputQuestionController.createNewInputQuestion
);
module.exports = router;
