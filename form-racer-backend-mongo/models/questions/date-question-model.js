const mongoose = require("mongoose");

const DateQuestionSchema = new mongoose.Schema({
  question_text: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
});

module.exports = mongoose.model("DateQuestionSchema", DateQuestionSchema);
