const express = require("express");

const checkboxQuestionRoutes = require("./questions/checkbox-question-routes");
const colorQuestionRoutes = require("./questions/color-question-routes");
const dateQuestionRoutes = require("./questions/date-question-routes");
const inputQuestionRoutes = require("./questions/input-question-routes");
const multipleChoiceQuestionRoutes = require("./questions/multiple-choice-routes");
const sliderQuestionRoutes = require("./questions/slider-quesiton-routes");
const questionController = require("../controllers/questions/questions-controller");
const router = express.Router();

router.use("/checkbox-questions", checkboxQuestionRoutes);
router.use("/color-questions", colorQuestionRoutes);
router.use("/date-questions", dateQuestionRoutes);
router.use("/input-questions", inputQuestionRoutes);
router.use("/multiple-choice-questions", multipleChoiceQuestionRoutes);
router.use("/slider-questions", sliderQuestionRoutes);

router.get(
  "/get-all-selected-question-data/:database",
  questionController.getAllQuestionDataFromSelectedDB
);
router.get(
  "/get-all-selected-question-data-with-limit/:databaseLimitPair",
  questionController.getAllQuestionDataFromSelectedDBWithLimit
);

module.exports = router;
