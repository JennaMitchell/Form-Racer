import { formStoreActions } from "../../../store/form-store";

import { KeyboardEvent } from "react";

export const decreaseLivesTracker = (
  dispatch: any,
  userLivesArray: boolean[]
) => {
  let userHasRemainingLives = false;
  let indexOfNextAvailableLife = 0;

  for (
    let indexOfUserLivesArray = 0;
    indexOfUserLivesArray < userLivesArray.length;
    indexOfUserLivesArray++
  ) {
    if (userLivesArray[indexOfUserLivesArray]) {
      userHasRemainingLives = true;
      indexOfNextAvailableLife = indexOfUserLivesArray;
      break;
    }
  }

  if (userHasRemainingLives) {
    const copyOfUserLivesArray = JSON.parse(JSON.stringify(userLivesArray));
    copyOfUserLivesArray[indexOfNextAvailableLife] = false;
    dispatch(formStoreActions.setActiveLifesArray(copyOfUserLivesArray));
  } else {
    dispatch(formStoreActions.setUserFailedGame(true));
    dispatch(formStoreActions.setEndOfTestReached(true));
  }
};

export const enterPressHandler = (
  event: KeyboardEvent<HTMLInputElement>,
  inputValue: string,
  pattern: string,
  dispatch: any,
  userLivesArray: boolean[]
) => {
  const keyCode = event.key;
  if (inputValue) {
    const regexPattern = new RegExp(pattern);
    const patternMet = regexPattern.test(inputValue);

    if (keyCode === "Enter" && patternMet) {
      return { enterPressed: true, patternMet: true };
    } else if (!patternMet && keyCode === "Enter") {
      decreaseLivesTracker(dispatch, userLivesArray);
      return { enterPressed: false, patternMet: false };
    } else {
      return { enterPressed: false, patternMet: true };
    }
  }
};
