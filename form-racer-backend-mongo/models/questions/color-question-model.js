const mongoose = require("mongoose");

const ColorQuestionSchema = new mongoose.Schema({
  first_color: { type: String, required: true },
  second_color: { type: String, required: true },
});

module.exports = mongoose.model("ColorQuestionSchema", ColorQuestionSchema);
