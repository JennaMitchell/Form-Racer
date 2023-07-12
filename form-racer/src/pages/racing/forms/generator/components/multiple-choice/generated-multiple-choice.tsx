import { useState } from "react";
import classes from "./generated-multiple-choice.module.css";
import { lowerCaseLettersForMultipleChoiceArray } from "../../../../../../assets/constants/constants";
import { MouseEvent } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
type Props = {
  id: string;
  possibleAnswersArray: string[];
  questionNumber: number;
};

const GeneratedMultipleChoice = ({
  id,
  possibleAnswersArray,
  questionNumber,
}: Props): JSX.Element => {
  const [clickedQuestionIndex, setClickedQuestionIndex] = useState<number>();

  const radioButtonClickHandler = (e: MouseEvent<HTMLElement>) => {
    let targetElement = e.target as HTMLElement;
    let targetId = targetElement.id;
    if (targetElement.id.length === 0) {
      targetElement = targetElement.parentElement as HTMLElement;
      targetId = targetElement.id;
    }

    if (targetId) {
      const splitId = targetId.split("-");
      const extractedSelectedQuestionLetter = splitId[splitId.length - 1];
      if (
        lowerCaseLettersForMultipleChoiceArray.includes(
          extractedSelectedQuestionLetter
        )
      ) {
        const indexOfLetter = lowerCaseLettersForMultipleChoiceArray.indexOf(
          extractedSelectedQuestionLetter
        );
        setClickedQuestionIndex(indexOfLetter);
      }
    }
  };

  return (
    <div className={classes.multipleChoiceMainContainer}>
      <span className={classes.multipleChoiceQuestionLabel}>
        Question {questionNumber}.
      </span>
      {possibleAnswersArray.length !== 0 &&
        possibleAnswersArray.map((answer: string, index: number) => {
          return (
            <div
              className={`${classes.multipleChoiceAnswerContainer} ${
                clickedQuestionIndex === index &&
                classes.activeMultipleChoiceAnswerContainer
              }`}
              onClick={radioButtonClickHandler}
              id={`${id}-main-container-${lowerCaseLettersForMultipleChoiceArray[index]}`}
              key={`${id}-main-container-${lowerCaseLettersForMultipleChoiceArray[index]}-key`}
            >
              <button
                className={classes.multipleChoiceRadioButton}
                id={`${id}-choice-${lowerCaseLettersForMultipleChoiceArray[index]}`}
              >
                {clickedQuestionIndex === index && (
                  <CheckIcon className={classes.checkMarkIcon} />
                )}
              </button>
              <label
                className={classes.multipleChoiseRadioButtonLabel}
                htmlFor={`${id}-choice-${lowerCaseLettersForMultipleChoiceArray[index]}`}
                onClick={radioButtonClickHandler}
              >
                {lowerCaseLettersForMultipleChoiceArray[index]}.
              </label>
              <p className={classes.multipleChoiceAnswerText}>{answer}</p>
            </div>
          );
        })}
    </div>
  );
};
export default GeneratedMultipleChoice;
