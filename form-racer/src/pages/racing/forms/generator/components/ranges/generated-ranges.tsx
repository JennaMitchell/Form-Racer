import { ChangeEvent, useState } from "react";
import classes from "./generated-ranges.module.css";
type Props = {
  questionNumber: number;
  questionText: string;
  slideMin: number;
  slideMax: number;
  retrieveSlideInput: (questioNumber: number, sliderValue: number) => void;
};
const GeneratedRangeInput = ({
  questionNumber,
  questionText,
  slideMin,
  slideMax,
  retrieveSlideInput,
}: Props): JSX.Element => {
  const [sliderValue, setSliderValue] = useState("1");

  const sliderInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const targetValue = event?.target.value;

    if (targetValue) {
      setSliderValue(targetValue);
      retrieveSlideInput(questionNumber, +targetValue);
    }
  };

  return (
    <div className={classes.generatedRangeMainContainer}>
      <p className={classes.generatedRangeQuestionContainer}>
        Question {questionNumber}.
      </p>
      <p className={classes.generatedRangeQuestion}>{questionText}</p>
      <div className={classes.geenratedRangeInputContainer}>
        <label className={classes.rangeInputLabel} htmlFor="range-input-7">
          Question {questionNumber}. Range
        </label>

        <input
          className={classes.rangeInput}
          type="range"
          id="range-input-7"
          min={`${slideMin}`}
          max={`${slideMax}`}
          onChange={sliderInputChangeHandler}
        />
        <p className={classes.rangInputValue}>{sliderValue}</p>
      </div>
    </div>
  );
};
export default GeneratedRangeInput;
