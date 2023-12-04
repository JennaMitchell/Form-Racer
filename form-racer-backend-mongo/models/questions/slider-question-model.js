const mongoose = require("mongoose");

const SliderQuestionSchema = new mongoose.Schema({
  question_text: { type: String, required: true },
  slider_lower_limit: { type: Number, required: true },
  slider_higher_limit: { type: Number, required: true },
  slider_question_lower_limit: { type: Number, required: true },
  slider_question_higher_limit: { type: Number, required: true },
});

module.exports = mongoose.model("SliderQuestionSchema", SliderQuestionSchema);
