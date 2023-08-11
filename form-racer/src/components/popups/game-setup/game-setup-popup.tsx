import classes from "./game-setup-popup.module.css";
import sharedClasses from "../shared-popups-css.module.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAppDispatch } from "../../../store/typescript-hooks";
import { popupsStoreActions } from "../../../store/popups-store";
import EasyDiffIcon from "../../../assets/images/icons/setup-popup/easy-diff-icon.png";
import MediumDiffIcon from "../../../assets/images/icons/setup-popup/medium-diff-icon.png";
import HardDiffIcon from "../../../assets/images/icons/setup-popup/hard-diff-icon.png";
import ColorInputsIcon from "../../../assets/images/icons/setup-popup/color-inputs.png";
import CommentInputsIcon from "../../../assets/images/icons/setup-popup/comment-inputs.png";
import DateInputsIcon from "../../../assets/images/icons/setup-popup/date-inputs.png";
import PictureInputsIcon from "../../../assets/images/icons/setup-popup/picture-inputs.png";
import TextInputsIcon from "../../../assets/images/icons/setup-popup/text-inputs.png";
import MultipleChoiceIcon from "../../../assets/images/icons/setup-popup/multiple-choice-icon.png";
import { useState, MouseEvent, useMemo, useCallback, useEffect } from "react";
import { testResetFunction } from "../../../assets/test-functions/test-function";
import { formStoreActions } from "../../../store/form-store";
import { userInfoStoreActions } from "../../../store/user-info-store";
const GameSetupPopup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const closingButtonHandler = () => {
    dispatch(popupsStoreActions.setLockViewportActive(false));
    dispatch(popupsStoreActions.setGameSetupActive(false));
  };
  const [gameSetupFormData, setGameSetupFormData] = useState<{
    difficulty: string;
    numberOfQuestions: number;
    selectedQuestionTypes: string[];
    timerPerQuestionInSeconds: number;
  }>({
    difficulty: "",
    numberOfQuestions: 5,
    selectedQuestionTypes: [],
    timerPerQuestionInSeconds: 30,
  });
  const [submitButtonActive, setSubmitButtonActive] = useState(false);
  const questionTypesButtonData = [
    {
      buttonName: "Multiple Choice",
      icon: MultipleChoiceIcon,
      altText: "multiple choice input icon",
      id: "popup-input-type-button-multiple choice",
    },
    {
      buttonName: "Dates",
      icon: DateInputsIcon,
      altText: "dates input icon",
      id: "popup-input-type-button-dates",
    },
    {
      buttonName: "Inputs",
      icon: TextInputsIcon,
      altText: "text input icon",
      id: "popup-input-type-button-inputs",
    },
    {
      buttonName: "Color",
      icon: ColorInputsIcon,
      altText: "color input icon",
      id: "popup-input-type-button-color",
    },
    {
      buttonName: "Slider",
      icon: CommentInputsIcon,
      altText: "comments input icon",
      id: "popup-input-type-button-slider",
    },
    {
      buttonName: "Checkbox",
      icon: PictureInputsIcon,
      altText: "pictures input icon",
      id: "popup-input-type-button-check box",
    },
  ];
  const arrayOfAcceptedValues = useMemo(() => {
    return ["easy", "medium", "hard"];
  }, []);

  const diffucultyClickButtonHandler = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    let targetElement = event.target as HTMLButtonElement;

    let targetId = targetElement?.id;

    if (targetId.length === 0 && targetElement.parentElement) {
      targetElement = targetElement?.parentElement as HTMLButtonElement;
      targetId = targetElement?.id;
    }
    const splitId = targetId.split("-");

    const selectedDifficultyLevel = splitId[splitId.length - 1];
    let timePerQuestionInSeconds = 0;

    switch (selectedDifficultyLevel) {
      case "easy":
        timePerQuestionInSeconds = 30;
        break;
      case "medium":
        timePerQuestionInSeconds = 20;
        break;
      case "hard":
        timePerQuestionInSeconds = 15;
        break;
      default:
        break;
    }

    if (arrayOfAcceptedValues.includes(selectedDifficultyLevel)) {
      setGameSetupFormData({
        ...gameSetupFormData,
        difficulty: selectedDifficultyLevel,
        timerPerQuestionInSeconds: timePerQuestionInSeconds,
      });
    }
  };

  const numberOfInputsClickButtonHandler = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    let targetElement = event.target as HTMLButtonElement;

    let targetId = targetElement?.id;

    const splitId = targetId.split("-");

    const selectedNumberOfQuestions = splitId[splitId.length - 1];
    const arrayOfAcceptedValues = ["5", "10", "20"];

    if (arrayOfAcceptedValues.includes(selectedNumberOfQuestions)) {
      setGameSetupFormData({
        ...gameSetupFormData,
        numberOfQuestions: +selectedNumberOfQuestions,
      });
    }
  };

  const questionTypeSelectionClickHandler = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    let targetElement = event.target as HTMLButtonElement;

    let targetId = targetElement?.id;

    if (targetId.length === 0 && targetElement.parentElement) {
      targetElement = targetElement?.parentElement as HTMLButtonElement;
      targetId = targetElement?.id;
    }
    const splitId = targetId.split("-");

    const selectedQuestionType = splitId[splitId.length - 1];

    const acceptedQuestionTypes = questionTypesButtonData.map((buttonData) => {
      return buttonData.buttonName.toLowerCase();
    });

    if (acceptedQuestionTypes.includes(selectedQuestionType)) {
      let copyOfSelectedQuestionTypes =
        gameSetupFormData.selectedQuestionTypes.slice();

      if (copyOfSelectedQuestionTypes.includes(selectedQuestionType)) {
        const indexOfSelectedType =
          copyOfSelectedQuestionTypes.indexOf(selectedQuestionType);
        copyOfSelectedQuestionTypes.splice(indexOfSelectedType, 1);
      } else {
        copyOfSelectedQuestionTypes.push(selectedQuestionType);
      }

      setGameSetupFormData({
        ...gameSetupFormData,
        selectedQuestionTypes: copyOfSelectedQuestionTypes,
      });
    }
  };

  const submitButtonValidation = useCallback(() => {
    const difficultyCheck = arrayOfAcceptedValues.includes(
      gameSetupFormData.difficulty
    );

    if (difficultyCheck) {
      const numberOfQuestionsCheck =
        gameSetupFormData.numberOfQuestions >= 1 ? true : false;
      if (numberOfQuestionsCheck) {
        const selectedQuestionsTypeCheck =
          gameSetupFormData.selectedQuestionTypes.length !== 0 ? true : false;
        if (selectedQuestionsTypeCheck) {
          setSubmitButtonActive(true);
        }
      }
    }
  }, [
    arrayOfAcceptedValues,
    gameSetupFormData.difficulty,
    gameSetupFormData.numberOfQuestions,
    gameSetupFormData.selectedQuestionTypes.length,
  ]);
  useEffect(() => {
    submitButtonValidation();
  }, [submitButtonValidation]);

  const startButtonHandler = () => {
    if (submitButtonActive) {
      dispatch(userInfoStoreActions.setGameSettings(gameSetupFormData));
      closingButtonHandler();
      testResetFunction(dispatch);

      dispatch(formStoreActions.setStartTest(true));
    }
  };

  return (
    <div className={sharedClasses.backdrop}>
      <div className={sharedClasses.popupMainContainer}>
        <button
          className={sharedClasses.closingPopupButton}
          onClick={closingButtonHandler}
        >
          <XMarkIcon className={sharedClasses.closingPopupButtonIcon} />
        </button>
        <p className={sharedClasses.popupTitle}>Setup</p>

        <p className={classes.popupSectionTitle}>Difficulty</p>
        <button
          className={`${classes.popupDifficultyButton} ${
            gameSetupFormData.difficulty === "easy" &&
            classes.activeDifficultyButton
          }`}
          id={"popup-difficulty-button-easy"}
          onClick={diffucultyClickButtonHandler}
        >
          <img
            src={EasyDiffIcon}
            alt="easy difficulty icon"
            className={classes.difficultyButtonIcon}
          />
          <p className={classes.popupButtonText}>Easy</p>
        </button>
        <button
          className={`${classes.popupDifficultyButton} ${
            gameSetupFormData.difficulty === "medium" &&
            classes.activeDifficultyButton
          }`}
          id={"popup-difficulty-button-medium"}
          onClick={diffucultyClickButtonHandler}
        >
          <img
            src={MediumDiffIcon}
            alt="medium difficulty icon"
            className={classes.difficultyButtonIcon}
          />
          <p className={classes.popupButtonText}>Medium</p>
        </button>
        <button
          className={`${classes.popupDifficultyButton} ${
            gameSetupFormData.difficulty === "hard" &&
            classes.activeDifficultyButton
          }`}
          id={"popup-difficulty-button-hard"}
          onClick={diffucultyClickButtonHandler}
        >
          <img
            src={HardDiffIcon}
            alt="hard dificulty icon"
            className={classes.difficultyButtonIcon}
          />
          <p className={classes.popupButtonText}>Hard</p>
        </button>
        <p className={classes.popupSectionTitle}>Number Of Questions</p>
        <div className={classes.popupNumberOfQuestions}>
          <button
            className={`${classes.popupNumberOfQuestionsButton} ${
              gameSetupFormData.numberOfQuestions === 5 &&
              classes.popupNumberOfQuestionsButtonActive
            }`}
            id={"popup-difficulty-button-5"}
            onClick={numberOfInputsClickButtonHandler}
          >
            5
          </button>
          <button
            className={`${classes.popupNumberOfQuestionsButton} ${
              gameSetupFormData.numberOfQuestions === 10 &&
              classes.popupNumberOfQuestionsButtonActive
            }`}
            id={"popup-difficulty-button-10"}
            onClick={numberOfInputsClickButtonHandler}
          >
            10
          </button>
          <button
            className={`${classes.popupNumberOfQuestionsButton} ${
              gameSetupFormData.numberOfQuestions === 20 &&
              classes.popupNumberOfQuestionsButtonActive
            }`}
            id={"popup-difficulty-button-20"}
            onClick={numberOfInputsClickButtonHandler}
          >
            20
          </button>
        </div>
        <p className={classes.popupSectionTitle}>Question Types</p>
        <div className={classes.questionsTypesContainer}>
          {questionTypesButtonData.map((buttonData) => {
            return (
              <button
                className={`${classes.popupQuestionTypeButton} ${
                  gameSetupFormData.selectedQuestionTypes.includes(
                    buttonData.buttonName.toLowerCase()
                  ) && classes.popupQuestionTypeButtonActive
                }`}
                key={`${buttonData.id}-key`}
                id={buttonData.id}
                onClick={questionTypeSelectionClickHandler}
              >
                <img src={buttonData.icon} alt={buttonData.altText} />
                <p>{buttonData.buttonName}</p>
              </button>
            );
          })}
        </div>

        <button
          className={`${classes.startButton} ${
            submitButtonActive && classes.activeStartButton
          }`}
          disabled={submitButtonActive}
          onClick={startButtonHandler}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default GameSetupPopup;
