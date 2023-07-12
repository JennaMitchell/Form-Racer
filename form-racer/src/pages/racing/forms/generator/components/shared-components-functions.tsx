import { formStoreActions } from "../../../../../store/form-store";
export const updateUserAnswers = (
  dispatch: any,
  currentUserArray: any[],
  questionNumber: number,
  userValue: string | number
) => {
  const copyOfUserAnswers = JSON.parse(JSON.stringify(currentUserArray));
  copyOfUserAnswers[questionNumber - 1] = userValue;
  dispatch(formStoreActions.setUserAnswersArray(copyOfUserAnswers));
};

export const updateActiveQuestionNumber = (
  dispatch: any,
  currentQuestionNumber: number,
  numberOfQuestions: number
) => {
  console.log(currentQuestionNumber);
  console.log(numberOfQuestions);
  const newQuestionNumber = currentQuestionNumber + 1;

  if (numberOfQuestions < newQuestionNumber) {
    dispatch(formStoreActions.setEndOfTestReached(true));
  } else {
    dispatch(formStoreActions.setActiveQuestionNumber(newQuestionNumber));
    dispatch(formStoreActions.setActiveQuestionNumberUpdated(true));
  }
};
