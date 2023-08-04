const express = require("express");

const questionDataController = require("../controllers/question-data-controller");
const router = express.Router();

router.get(
  "/get-all-question-data:database",
  questionDataController.getAllQuestionData
);
router.get(
  "/get-question-data-with-limit:requestData",
  questionDataController.getQuestionDataWithLimit
);
module.exports = router;
