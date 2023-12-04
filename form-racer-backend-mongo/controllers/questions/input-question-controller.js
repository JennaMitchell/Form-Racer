const InputQuestionSchema = require("../../models/questions/input-question-model");

const { validationResult } = require("express-validator");
exports.getAllInputQuestionData = async (req, res) => {
  try {
    const result = await InputQuestionSchema.find();
    return res.status(201).json({
      message: "Data Retrieved!",
      retrievedData: result,
      status: 201,
    });
  } catch (err) {
    return res.status(401).json({
      message: `Server Error!`,
      error: [{ error: "Server Error" }],
    });
  }
};
exports.createNewInputQuestion = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }

  try {
    if (
      req.body.min_number_of_characters >= req.body.max_number_of_characters
    ) {
      return res.status(401).send({
        error: "Incorrect min and max",
        message: "Incorrect min and max",
      });
    }

    const newInputQuestion = new InputQuestionSchema({
      question_text: req.body.question_text,
      input_name: req.body.input_name,
      type: req.body.type,
      placeholder: req.body.placeholder,
      pattern: req.body.pattern,
      input_required: req.body.input_required,
      min_number_of_characters: req.body.min_number_of_characters,
      max_number_of_characters: req.body.max_number_of_characters,
    });

    await newInputQuestion.save();

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
