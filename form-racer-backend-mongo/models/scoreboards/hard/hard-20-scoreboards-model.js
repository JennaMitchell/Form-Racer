const mongoose = require("mongoose");

const HardTwentyQuestionScoreboardSchema = new mongoose.Schema({
  username: { type: String, required: true },
  users_time: { type: String, required: true },
  ranking: { type: Number, required: true },
});

module.exports = mongoose.model(
  "HardTwentyQuestionScoreboardSchema",
  HardTwentyQuestionScoreboardSchema
);
