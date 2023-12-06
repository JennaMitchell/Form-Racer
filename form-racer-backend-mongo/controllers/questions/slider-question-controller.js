const SliderQuestionSchema = require("../../models/questions/slider-question-model");

const { validationResult } = require("express-validator");

exports.createNewSliderQuestion = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
      status: 401,
    });
  }

  try {
    if (
      +req.body.slider_lower_limit > +req.body.slider_higher_limit ||
      +req.body.slider_question_lower_limit >
        +req.body.slider_question_higher_limit
    ) {
      return res.status(401).send({
        error: "Incorrect min and max",
        message: "Incorrect min and max",
      });
    }

    const newSliderQuestion = new SliderQuestionSchema({
      question_text: req.body.question_text,
      slider_lower_limit: req.body.slider_lower_limit,
      slider_higher_limit: req.body.slider_higher_limit,
      slider_question_lower_limit: req.body.slider_question_lower_limit,
      slider_question_higher_limit: req.body.slider_question_higher_limit,
    });
    await newSliderQuestion.save();

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
