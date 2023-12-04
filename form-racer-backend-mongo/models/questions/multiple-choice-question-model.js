const mongoose = require("mongoose");

const MultipleChoiceQuestionSchema = new mongoose.Schema({
  question_text: { type: String, required: true },
  possible_answer_one: { type: String, required: true },
  possible_answer_two: { type: String, required: true },
  possible_answer_three: { type: String, required: true },
  possible_answer_four: { type: String, required: true },
  correct_answer: { type: String, required: true },
});

module.exports = mongoose.model(
  "MultipleChoiceQuestionSchema",
  MultipleChoiceQuestionSchema
);
