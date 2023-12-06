const DateQuestionSchema = require("../../models/questions/date-question-model");

const { validationResult } = require("express-validator");

exports.createNewDateQuestion = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }

  try {
    const newDateQuestion = new DateQuestionSchema({
      question_text: req.body.question_text,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    });

    await newDateQuestion.save();

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
