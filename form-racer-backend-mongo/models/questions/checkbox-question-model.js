const mongoose = require("mongoose");

const CheckboxQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  possible_answer_one: { type: String, required: true },
  possible_answer_two: { type: String, required: true },
  possible_answer_three: { type: String, required: true },
  possible_answer_four: { type: String, required: true },
  possible_answer_five: { type: String, required: true },
  possible_correct_answer_one: { type: Boolean, required: true },
  possible_correct_answer_two: { type: Boolean, required: true },
  possible_correct_answer_three: { type: Boolean, required: true },
  possible_correct_answer_four: { type: Boolean, required: true },
  possible_correct_answer_five: { type: Boolean, required: true },
});

module.exports = mongoose.model(
  "CheckboxQuestionSchema",
  CheckboxQuestionSchema
);
