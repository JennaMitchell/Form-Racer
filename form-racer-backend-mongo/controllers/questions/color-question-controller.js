const ColorQuestionSchema = require("../../models/questions/color-question-model");

const { validationResult } = require("express-validator");

exports.createNewColorQuestion = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }

  try {
    const newColorQuestion = new ColorQuestionSchema({
      first_color: req.body.first_color,
      second_color: req.body.second_color,
    });
    await newColorQuestion.save();

    return res.status(201).json({
      message: "Question Added!",
      status: 201,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Server Error",
      error: [{ error: err }],
      status: 401,
    });
  }
};
