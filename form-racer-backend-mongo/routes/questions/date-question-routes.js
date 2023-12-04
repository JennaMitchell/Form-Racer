const express = require("express");

const dateQuestionController = require("../../controllers/questions/date-question-controller");
const { body } = require("express-validator");
const router = express.Router();

router.put(
  "/add-new-date-question",
  [
    body("question_text").trim().not().isEmpty(),
    body("start_date").trim().not().isEmpty().isISO8601().toDate(),
    body("end_date").trim().not().isEmpty().isISO8601().toDate(),
  ],
  dateQuestionController.createNewDateQuestion
);
module.exports = router;
