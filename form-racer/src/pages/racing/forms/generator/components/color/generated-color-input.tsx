import classes from "./generated-color-input.module.css";
import { useState, useRef, ChangeEvent } from "react";

type Props = {
  circleColorOneHexCode: string;
  circleColorTwoHexCode: string;
  resultColorLowerEnd: string;
  resultColorHigherEnd: string;
  questionNumber: number;
};
const GeneratedColorInput = ({
  circleColorOneHexCode,
  circleColorTwoHexCode,
  resultColorLowerEnd,
  resultColorHigherEnd,
  questionNumber,
}: Props): JSX.Element => {
  const colorInputRef = useRef<null | HTMLInputElement>(null);
  const [userSelectedColor, setUserSelectedColor] = useState<string>("#008000");

  const colorInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const currentColorInputRef = colorInputRef.current;
    if (currentColorInputRef) {
      setUserSelectedColor(event?.target.value);
      // resultColorRetrivalFunction(questionNumber, event?.target.value);
    }
  };

  return (
    <div className={classes.generatedColorInput}>
      <label className={classes.questionLabel}>
        Question {questionNumber}.
      </label>

      <div className={classes.questionColorWindow}>
        <div
          className={classes.questionColorCircleOne}
          style={{ backgroundColor: circleColorOneHexCode }}
        />
        <p className={classes.questionPlusIcon}>+</p>
        <div
          className={classes.questionColorCircleTwo}
          style={{ backgroundColor: circleColorTwoHexCode }}
        />
      </div>

      <div className={classes.colorInputContainer}>
        <input
          type="color"
          id="result-color"
          name="color-hexCode-"
          value={`${userSelectedColor}`}
          className={classes.colorInput}
          onChange={colorInputChangeHandler}
          ref={colorInputRef}
        />
        <label htmlFor="result-color" className={classes.colorInputLabel}>
          Result
        </label>
      </div>
    </div>
  );
};
export default GeneratedColorInput;
