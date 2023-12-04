const mongoose = require("mongoose");

const HardFiveQuestionScoreboardSchema = new mongoose.Schema({
  username: { type: String, required: true },
  users_time: { type: String, required: true },
  ranking: { type: Number, required: true },
});

module.exports = mongoose.model(
  "HardFiveQuestionScoreboardSchema",
  HardFiveQuestionScoreboardSchema
);
