const InputQuestionSchema = require("../../models/questions/input-question-model");
const CheckboxQuestionSchema = require("../../models/questions/checkbox-question-model");
const ColorQuestionSchema = require("../../models/questions/color-question-model");
const DateQuestionSchema = require("../../models/questions/date-question-model");
const MultipleChoiceQuestionSchema = require("../../models/questions/multiple-choice-question-model");
const SliderQuestionSchema = require("../../models/questions/slider-question-model");

exports.getAllQuestionDataFromSelectedDB = async (req, res) => {
  const database = req.params.database;

  try {
    let validDatabaseName = false;
    let results;
    switch (database) {
      case "multiple_choice_question_db": {
        results = await MultipleChoiceQuestionSchema.find({});
        validDatabaseName = true;
      }
      case "checkbox_question_db": {
        results = await CheckboxQuestionSchema.find({});
        validDatabaseName = true;
        return res.status(201).json({
          message: "Data Retrieved!",
          retrievedData: results,
          status: 201,
        });
      }
      case "input_question_db": {
        results = await InputQuestionSchema.find();
        validDatabaseName = true;
        return res.status(201).json({
          message: "Data Retrieved!",
          retrievedData: results,
          status: 201,
        });
      }
      case "color_question_db": {
        results = await ColorQuestionSchema.find();
        validDatabaseName = true;
        return res.status(201).json({
          message: "Data Retrieved!",
          retrievedData: results,
          status: 201,
        });
      }
      case "date_question_db": {
        results = await DateQuestionSchema.find();
        validDatabaseName = true;
        return res.status(201).json({
          message: "Data Retrieved!",
          retrievedData: results,
          status: 201,
        });
      }
      case "slider_question_db": {
        results = await SliderQuestionSchema.find();
        validDatabaseName = true;
        return res.status(201).json({
          message: "Data Retrieved!",
          retrievedData: results,
          status: 201,
        });
      }
      default: {
      }
    }

    if (!validDatabaseName) {
      return res.status(401).json({
        message: "Invalid Database Name",
        error: [{ error: "Invalid Database Name" }],
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: `Server Error!`,
      error: [{ error: "Server Error" }],
      status: 401,
    });
  }
};
exports.getAllQuestionDataFromSelectedDBWithLimit = async (req, res) => {
  const databaseLimitPair = req.params.databaseLimitPair;

  try {
    const [database, limit] = databaseLimitPair.split("-");

    let validDatabaseName = false;
    let validLimit = false;
    let results;

    if (typeof +limit === "number" && +limit <= 10) {
      validLimit = true;
    }

    if (validLimit) {
      switch (database) {
        case "multiple_choice_question_db": {
          results = await MultipleChoiceQuestionSchema.find().limit(+limit);
          validDatabaseName = true;
          break;
        }
        case "checkbox_question_db": {
          results = await CheckboxQuestionSchema.find().limit(+limit);
          validDatabaseName = true;
          break;
        }
        case "input_question_db": {
          results = await InputQuestionSchema.find().limit(+limit);
          validDatabaseName = true;
          break;
        }
        case "color_question_db": {
          results = await ColorQuestionSchema.find().limit(+limit);
          validDatabaseName = true;
          break;
        }
        case "date_question_db": {
          results = await DateQuestionSchema.find().limit(+limit);
          validDatabaseName = true;
          break;
        }
        case "slider_question_db": {
          results = await SliderQuestionSchema.find().limit(+limit);
          validDatabaseName = true;
          break;
        }
        default: {
        }
      }
    }
    if (!validDatabaseName) {
      return res.status(401).json({
        message: "Invalid Database Name",
        error: [
          { error: "Server Error: Invalid Database Name or Question Number" },
        ],
        status: 401,
      });
    } else {
      return res.status(201).json({
        message: "Data Retrieved!",
        retrievedData: results,
        status: 201,
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: `Server Error!`,
      error: [{ error: "Server Error" }],
      status: 401,
    });
  }
};
