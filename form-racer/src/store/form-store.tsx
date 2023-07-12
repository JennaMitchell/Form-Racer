import { createSlice } from "@reduxjs/toolkit";
// type InputPropsType = {
//   name: string;
//   type: string;
//   placeholder: string;
//   pattern: string;
//   required: boolean;
//   min: number;
//   max: number;
// };
// type InputContainerDataType = {
//   input_question_data_id: number;
//   label: string;
//   question_text: string;
//   inputProps: InputPropsType;
//   questionType: string;
// };

// type MultipleChoiceDataType = {
//   possibleAnswers: string[];
//   question: string;
//   correctAnswerIndex: number;
//   questionType: string;
// };

// type DateQuestionDataType = {
//   questionText: string;
//   startDate: string;
//   endDate: string;
//   questionType: string;
// };

// type ColorQuestionDataType = {
//   firstColor: string;
//   secondColor: string;
//   resultColor: string;
//   resultRangeStartColor: string;
//   resultRangeEndColor: string;
//   questionType: string;
// };

// type CheckBoxDataType = {
//   questionText: string;
//   possibleAnswersArray: string[];
//   answerKeyArray: boolean[];
//   questionType: string;
// };

// type SliderDataType = {
//   questionText: string;
//   sliderLowerLimit: number;
//   sliderHigherLimit: number;
//   sliderQuestionHigherLimit: number;
//   sliderQuestionLowerLimit: number;
//   questionType: string;
// };

interface State {
  generatedQuestionData: any[];
  userAnswersArray: any[];
  activeLifesArray: boolean[];
  userFailedGame: boolean;
  activeQuestionNumber: number;
  activeQuestionNumberUpdated: boolean;

  endOfTestReached: boolean;
  startQuestionTimer: boolean;
  astroidExplosionTriggered: boolean;
  gameOverScreenActive: boolean;
  fireShipWeapon: boolean;
  astroidDestroyed: boolean;
  questionFailed: boolean;
}

const initialState: State = {
  generatedQuestionData: [],
  userAnswersArray: [],
  activeLifesArray: [true, true, true],
  userFailedGame: false,
  activeQuestionNumber: 1,
  activeQuestionNumberUpdated: false,

  endOfTestReached: false,
  startQuestionTimer: false,
  astroidExplosionTriggered: false,
  gameOverScreenActive: false,
  fireShipWeapon: false,
  astroidDestroyed: false,
  questionFailed: false,
};

export const formStoreSlice = createSlice({
  name: "Form Racer Store",
  initialState: initialState,
  reducers: {
    setGeneratedQuestionData(state, { payload }) {
      state.generatedQuestionData = payload;
    },
    setUserAnswersArray(state, { payload }) {
      state.userAnswersArray = payload;
    },
    setActiveLifesArray(state, { payload }) {
      state.activeLifesArray = payload;
    },
    setUserFailedGame(state, { payload }) {
      state.userFailedGame = payload;
    },
    setActiveQuestionNumber(state, { payload }) {
      state.activeQuestionNumber = payload;
    },
    setActiveQuestionNumberUpdated(state, { payload }) {
      state.activeQuestionNumberUpdated = payload;
    },

    setEndOfTestReached(state, { payload }) {
      state.endOfTestReached = payload;
    },
    setStartQuestionTimer(state, { payload }) {
      state.startQuestionTimer = payload;
    },
    setAstroidExplosionTriggered(state, { payload }) {
      state.astroidExplosionTriggered = payload;
    },
    setGameOverScreenActive(state, { payload }) {
      state.gameOverScreenActive = payload;
    },
    setFireShipWeapons(state, { payload }) {
      state.fireShipWeapon = payload;
    },
    setAstroidDestroyed(state, { payload }) {
      state.astroidDestroyed = payload;
    },
  },
});

export const formStoreActions = formStoreSlice.actions;
