const EasyFiveQuestionScoreboardSchema = require("../../models/scoreboards/easy/easy-5-scoreboards-model");
const EasyTenQuestionScoreboardSchema = require("../../models/scoreboards/easy/easy-10-scoreboards-model");
const EasyTwentyQuestionScoreboardSchema = require("../../models/scoreboards/easy/easy-20-scoreboards-model");

const MediumFiveQuestionScoreboardSchema = require("../../models/scoreboards/medium/medium-5-scoreboards-model");
const MediumTenQuestionScoreboardSchema = require("../../models/scoreboards/medium/medium-10-scoreboards-model");
const MediumTwentyQuestionScoreboardSchema = require("../../models/scoreboards/medium/medium-20-scoreboards-model");

const HardFiveQuestionScoreboardSchema = require("../../models/scoreboards/hard/hard-5-scoreboards-model");
const HardTenQuestionScoreboardSchema = require("../../models/scoreboards/hard/hard-10-scoreboards-model");
const HardTwentyQuestionScoreboardSchema = require("../../models/scoreboards/hard/hard-20-scoreboards-model");

const { validationResult } = require("express-validator");
exports.getAllSelectedScoreboardData = async (req, res) => {
  try {
    const selectedScoreboard = req.body.selected_scoreboard;
    let result = "false";
    switch (selectedScoreboard) {
      case "easy_5_scoreboard": {
        result = await EasyFiveQuestionScoreboardSchema.find();
      }
      case "easy_10_scoreboard": {
        result = await EasyTenQuestionScoreboardSchema.find();
      }
      case "easy_20_scoreboard": {
        result = await EasyTwentyQuestionScoreboardSchema.find();
      }
      case "medium_5_scoreboard": {
        result = await MediumFiveQuestionScoreboardSchema.find();
      }
      case "medium_10_scoreboard": {
        result = await MediumTenQuestionScoreboardSchema.find();
      }
      case "medium_20_scoreboard": {
        result = await MediumTwentyQuestionScoreboardSchema.find();
      }
      case "hard_5_scoreboard": {
        result = await HardFiveQuestionScoreboardSchema.find();
      }
      case "hard_10_scoreboard": {
        result = await HardTenQuestionScoreboardSchema.find();
      }
      case "hard_20_scoreboard": {
        result = await HardTwentyQuestionScoreboardSchema.find();
      }
    }

    if (result === "false") {
      return res.status(401).json({
        message: `Invalid Database Name`,
        error: `Invalid Database Name`,
      });
    } else {
      return res.status(201).json({
        message: "Data Retrieved!",
        retrievedData: result,
        status: 201,
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: `Server Error!`,
      error: [{ error: "Server Error" }],
    });
  }
};
exports.createNewScoreboardEntry = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }

  try {
    let processed = false;
    switch (selectedScoreboard) {
      case "easy_5_scoreboard": {
        const newScoreboardEntry = new EasyFiveQuestionScoreboardSchema({
          username: req.body.username,
          users_time: req.body.users_time,
          ranking: req.body.ranking,
        });
        await newScoreboardEntry.save();
        processed = true;
      }
      case "easy_10_scoreboard": {
        const newScoreboardEntry = new EasyTenQuestionScoreboardSchema({
          username: req.body.username,
          users_time: req.body.users_time,
          ranking: req.body.ranking,
        });
        await newScoreboardEntry.save();
        processed = true;
      }
      case "easy_20_scoreboard": {
        const newScoreboardEntry = new EasyTwentyQuestionScoreboardSchema({
          username: req.body.username,
          users_time: req.body.users_time,
          ranking: req.body.ranking,
        });
        await newScoreboardEntry.save();
        processed = true;
      }
      case "medium_5_scoreboard": {
        const newScoreboardEntry = new MediumFiveQuestionScoreboardSchema({
          username: req.body.username,
          users_time: req.body.users_time,
          ranking: req.body.ranking,
        });
        await newScoreboardEntry.save();
        processed = true;
      }
      case "medium_10_scoreboard": {
        const newScoreboardEntry = new MediumTenQuestionScoreboardSchema({
          username: req.body.username,
          users_time: req.body.users_time,
          ranking: req.body.ranking,
        });
        await newScoreboardEntry.save();
        processed = true;
      }
      case "medium_20_scoreboard": {
        const newScoreboardEntry = new MediumTwentyQuestionScoreboardSchema({
          username: req.body.username,
          users_time: req.body.users_time,
          ranking: req.body.ranking,
        });
        await newScoreboardEntry.save();
        processed = true;
      }
      case "hard_5_scoreboard": {
        const newScoreboardEntry = new HardFiveQuestionScoreboardSchema({
          username: req.body.username,
          users_time: req.body.users_time,
          ranking: req.body.ranking,
        });
        await newScoreboardEntry.save();
        processed = true;
      }
      case "hard_10_scoreboard": {
        const newScoreboardEntry = new HardTenQuestionScoreboardSchema({
          username: req.body.username,
          users_time: req.body.users_time,
          ranking: req.body.ranking,
        });
        await newScoreboardEntry.save();
        processed = true;
      }

      case "hard_20_scoreboard": {
        const newScoreboardEntry = new HardTwentyQuestionScoreboardSchema({
          username: req.body.username,
          users_time: req.body.users_time,
          ranking: req.body.ranking,
        });
        await newScoreboardEntry.save();
        processed = true;
      }
    }

    if (!processed) {
      return res.status(401).json({
        message: "Invald Scoreboard Added",
        error: "Invald Scoreboard Added",
      });
    } else {
      return res.status(201).json({
        message: "Scoreboard Updated!",
        status: 201,
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Server Error",
      error: [{ error: err }],
    });
  }
};
