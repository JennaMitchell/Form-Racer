const MultipleChoiceQuestionSchema = require("../../models/questions/multiple-choice-question-model");

const { validationResult } = require("express-validator");

exports.createNewMultipleChoiceQuestion = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }

  try {
    const newDateQuestion = new MultipleChoiceQuestionSchema({
      question_text: req.body.question_text,
      possible_answer_one: req.body.possible_answer_one,
      possible_answer_two: req.body.possible_answer_two,
      possible_answer_three: req.body.possible_answer_three,
      possible_answer_four: req.body.possible_answer_four,
      correct_answer: req.body.correct_answer,
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
    });
  }
};
