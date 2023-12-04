const CheckboxQuestionSchema = require("../../models/questions/checkbox-question-model");

const { validationResult } = require("express-validator");

exports.createNewCheckboxQuestion = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }
  console.log(14);
  try {
    const newCheckboxQuestion = new CheckboxQuestionSchema({
      question: req.body.question,
      possible_answer_one: req.body.possible_answer_one,
      possible_answer_two: req.body.possible_answer_two,
      possible_answer_three: req.body.possible_answer_three,
      possible_answer_four: req.body.possible_answer_four,
      possible_answer_five: req.body.possible_answer_five,
      possible_correct_answer_one: req.body.possible_correct_answer_one,
      possible_correct_answer_two: req.body.possible_correct_answer_two,
      possible_correct_answer_three: req.body.possible_correct_answer_three,
      possible_correct_answer_four: req.body.possible_correct_answer_four,
      possible_correct_answer_five: req.body.possible_correct_answer_five,
    });
    await newCheckboxQuestion.save();

    return res.status(201).json({
      message: "Question Added!",
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Server Error",
      error: [{ error: err }],
    });
  }
};
