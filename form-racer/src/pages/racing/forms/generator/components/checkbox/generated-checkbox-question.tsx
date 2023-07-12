import { ChangeEvent, useState } from "react";
import classes from "./generated-checkbox-question.module.css";
import { lowerCaseLettersForMultipleChoiceArray } from "../../../../../../assets/constants/constants";
type Props = {
  questionNumber: number;
  questionText: string;
  checkBoxOptions: string[];
};
const GeneratedCheckboxQuestion = ({
  questionNumber,
  questionText,
  checkBoxOptions,
}: Props): JSX.Element => {
  const [clickedCheckedBoxArray, setClickedCheckedBoxArray] = useState<
    number[]
  >([]);

  const checkBoxChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event?.target.checked;
    const checkBoxName = event?.target.name;
    if (checkBoxName) {
      const splitName = checkBoxName.split("-");
      const textIndex = +splitName[splitName.length - 1];

      if (checked) {
        setClickedCheckedBoxArray([...clickedCheckedBoxArray, textIndex]);
        // clickedCheckboxsRetrieverFunction(questionNumber, [
        //   ...clickedCheckedBoxArray,
        //   textIndex,
        // ]);
      } else {
        const indexOfIndexToRemove = clickedCheckedBoxArray.indexOf(textIndex);
        const copyOfClickedCheckedBoxArray = clickedCheckedBoxArray.slice();
        copyOfClickedCheckedBoxArray.splice(indexOfIndexToRemove, 1);
        setClickedCheckedBoxArray(copyOfClickedCheckedBoxArray);
        // clickedCheckboxsRetrieverFunction(
        //   questionNumber,
        //   copyOfClickedCheckedBoxArray
        // );
      }
    }
  };

  return (
    <div className={classes.generatedCheckboxQuestionContainer}>
      <p className={classes.generatedCheckBoxQuestionNumberLabel}>
        Question {questionNumber}.
      </p>
      <p className={classes.generatedCheckBoxQuestion}>{questionText}</p>

      {checkBoxOptions.length !== 0 &&
        checkBoxOptions.map((optionText, index) => {
          return (
            <div
              className={classes.generatedCheckboxInputContainer}
              key={`question-${questionNumber}-index-${index}-key`}
            >
              <label
                htmlFor={`question-${questionNumber}-index-${index}`}
                className={classes.generatedCheckboxInputLabel}
              >
                {lowerCaseLettersForMultipleChoiceArray[index]}.
              </label>
              <input
                className={classes.checkBoxInput}
                type="checkbox"
                id={`question-${questionNumber}-index-${index}`}
                onChange={checkBoxChangeHandler}
                name={`question-${questionNumber}-index-${index}`}
              />
              <p className={classes.checkboxTextValue}>{optionText}</p>
            </div>
          );
        })}
    </div>
  );
};
export default GeneratedCheckboxQuestion;
