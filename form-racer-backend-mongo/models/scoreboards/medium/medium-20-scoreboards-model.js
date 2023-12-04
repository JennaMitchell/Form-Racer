const mongoose = require("mongoose");

const MediumTwentyQuestionScoreboardSchema = new mongoose.Schema({
  username: { type: String, required: true },
  users_time: { type: String, required: true },
  ranking: { type: Number, required: true },
});

module.exports = mongoose.model(
  "MediumTwentyQuestionScoreboardSchema",
  MediumTwentyQuestionScoreboardSchema
);
