const mongoose = require("mongoose");

const InputQuestionSchema = new mongoose.Schema({
  label: { type: String, required: true },
  question_text: { type: String, required: true },
  input_name: { type: String, required: true },
  type: { type: String, required: true },
  placeholder: { type: String, required: true },
  pattern: { type: String, required: true },
  input_required: { type: Boolean, require: true },
  min_number_of_characters: { type: Number, require: true },
  max_number_of_characters: { type: Number, require: true },
});

module.exports = mongoose.model("InputQuestionSchema", InputQuestionSchema);
