const mongoose = require("mongoose");

const EasyTenQuestionScoreboardSchema = new mongoose.Schema({
  username: { type: String, required: true },
  users_time: { type: String, required: true },
  ranking: { type: Number, required: true },
});

module.exports = mongoose.model(
  "EasyTenQuestionScoreboardSchema",
  EasyTenQuestionScoreboardSchema
);
