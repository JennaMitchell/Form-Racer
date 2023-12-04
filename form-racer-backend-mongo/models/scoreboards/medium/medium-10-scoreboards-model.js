const mongoose = require("mongoose");

const MediumTenQuestionScoreboardSchema = new mongoose.Schema({
  username: { type: String, required: true },
  users_time: { type: String, required: true },
  ranking: { type: Number, required: true },
});

module.exports = mongoose.model(
  "MediumTenQuestionScoreboardSchema",
  MediumTenQuestionScoreboardSchema
);
