import { formStoreActions } from "../../store/form-store";

export const gameResetFunction = (dispatch: any) => {
  dispatch(formStoreActions.setEndOfTestReached(false));
  dispatch(formStoreActions.setUserFailedGame(false));
  dispatch(formStoreActions.setGeneratedQuestionData([]));
  dispatch(formStoreActions.setStartQuestionTimer(false));
  dispatch(formStoreActions.setGameOverScreenActive(true));
  dispatch(formStoreActions.setActiveLifesArray([true, true, true]));
  dispatch(formStoreActions.setActiveQuestionNumber(1));
};
