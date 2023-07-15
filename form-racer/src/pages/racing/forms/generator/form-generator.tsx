import GeneratedInput from "./components/inputs/generated-input";
import GeneratedMultipleChoice from "./components/multiple-choice/generated-multiple-choice";
import GeneratedDate from "./components/dates/generated-dates";
import GeneratedColorInput from "./components/color/generated-color-input";
import GeneratedCheckboxQuestion from "./components/checkbox/generated-checkbox-question";
import GeneratedRangeInput from "./components/ranges/generated-ranges";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../store/typescript-hooks";
import { popupsStoreActions } from "../../../../store/popups-store";
import { formStoreActions } from "../../../../store/form-store";

import { inputDataRefactor } from "../../../../assets/api-calls/sql-data-refactors/input-data-refactor";
import { multipleChoiceDataRefactorer } from "../../../../assets/api-calls/sql-data-refactors/multiple-choice-data-refactor";
import { getAllQuestionDataWithLimit } from "../../../../assets/api-calls/form-api-calls";
import { dateDataRefactorer } from "../../../../assets/api-calls/sql-data-refactors/date-data-refactorer";
import { colorDataRefactor } from "../../../../assets/api-calls/sql-data-refactors/color-data-refactor";
import { checkboxDataRefactor } from "../../../../assets/api-calls/sql-data-refactors/checkbox-data-refactor";
import { randomNumberGeneratorWithNumberOfQuestionRemaining } from "../../../../components/random-number-generator/random-number-generator";
import { sliderDataRefactorer } from "../../../../assets/api-calls/sql-data-refactors/slider-data-refactorer";
import { useEffect } from "react";
import { updateActiveQuestionNumber } from "./components/shared-components-functions";

const FormGeneratorMainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userGameSettings = useAppSelector(
    (state) => state.userInfo.gameSettings
  );
  const generatedQuestionData = useAppSelector(
    (state) => state.formRacing.generatedQuestionData
  );

  const activeQuestionNumber = useAppSelector(
    (state) => state.formRacing.activeQuestionNumber
  );
  const endOfTestReached = useAppSelector(
    (state) => state.formRacing.endOfTestReached
  );
  const astroidDestroyed = useAppSelector(
    (state) => state.formRacing.astroidDestroyed
  );
  const astroidExplosionTriggered = useAppSelector(
    (state) => state.formRacing.astroidExplosionTriggered
  );

  const generateGameData = async () => {
    const generatedGameData = {
      timeDurationInSeconds: 0,
      generatedQuestions: {},
    };
    switch (userGameSettings.difficulty) {
      case "easy":
        generatedGameData.timeDurationInSeconds = 1000;
        break;
      case "medium":
        generatedGameData.timeDurationInSeconds = 500;
        break;
      case "hard":
        generatedGameData.timeDurationInSeconds = 200;
        break;
      default:
        break;
    }

    const generatedNumberOfQuestionsPerType = numberOfQuestionsPerTypeGenerator(
      userGameSettings.numberOfQuestions,
      userGameSettings.selectedQuestionTypes
    );

    const generatedDataArray = await questionDataRetriever(
      generatedNumberOfQuestionsPerType,
      userGameSettings.selectedQuestionTypes
    );
    const userAnswerArray = generatedDataArray.map(() => {
      return "";
    });
    dispatch(formStoreActions.setGeneratedQuestionData(generatedDataArray));
    dispatch(formStoreActions.setUserAnswersArray(userAnswerArray));
    dispatch(formStoreActions.setResetTestTimer(true));
    dispatch(formStoreActions.setTestStarted(true));
  };

  const numberOfQuestionsPerTypeGenerator = (
    numberOfQuestions: number,
    questionTypeArray: string[]
  ) => {
    let numberOfQuestionsRemaining = numberOfQuestions;

    const numberOfQuestionsPerQuestionArray = [];
    for (
      let indexOfSelectedQuestionTypes = 0;
      indexOfSelectedQuestionTypes < questionTypeArray.length;
      indexOfSelectedQuestionTypes++
    ) {
      if (indexOfSelectedQuestionTypes === questionTypeArray.length - 1) {
        numberOfQuestionsPerQuestionArray.push(numberOfQuestionsRemaining);
      } else {
        const randomlyGeneratedNumber =
          randomNumberGeneratorWithNumberOfQuestionRemaining(
            numberOfQuestionsRemaining
          );
        numberOfQuestionsRemaining =
          numberOfQuestionsRemaining - randomlyGeneratedNumber;
        numberOfQuestionsPerQuestionArray.push(randomlyGeneratedNumber);
      }
    }
    return numberOfQuestionsPerQuestionArray;
  };

  const questionDataRetriever = async (
    arrayOfQuestionNumbers: number[],
    arrayOfQuestionTypes: string[]
  ) => {
    let generatedDataArray: any[] = [];

    for (
      let indexOfArrayQuestionNumbers = 0;
      indexOfArrayQuestionNumbers < arrayOfQuestionNumbers.length;
      indexOfArrayQuestionNumbers++
    ) {
      const questionType = arrayOfQuestionTypes[indexOfArrayQuestionNumbers];
      const apiCallLinks = {
        inputs: "input_data",
        mulitpleChoice: "multiple_choice_data",
        date: "date_data",
        color: "color_questions",
        checkBox: "checkbox_questions",
        slider: "slider_questions",
      };

      switch (questionType) {
        case "multiple choice":
          const retrievedData = await getQuestionDataWithLimit(
            apiCallLinks.mulitpleChoice,
            arrayOfQuestionNumbers[indexOfArrayQuestionNumbers]
          );

          const renderReadyInputData =
            multipleChoiceDataRefactorer(retrievedData);

          generatedDataArray = generatedDataArray.concat(renderReadyInputData);

          break;
        case "dates":
          const retrievedDatesData = await getQuestionDataWithLimit(
            apiCallLinks.date,
            arrayOfQuestionNumbers[indexOfArrayQuestionNumbers]
          );
          const renderReadyDateData = dateDataRefactorer(retrievedDatesData);

          generatedDataArray = generatedDataArray.concat(renderReadyDateData);
          break;
        case "inputs":
          const retrievedInputData = await getQuestionDataWithLimit(
            apiCallLinks.inputs,
            arrayOfQuestionNumbers[indexOfArrayQuestionNumbers]
          );

          const renderReadyInputsData = inputDataRefactor(retrievedInputData);

          generatedDataArray = generatedDataArray.concat(renderReadyInputsData);
          break;
        case "color":
          const retrievedColorData = await getQuestionDataWithLimit(
            apiCallLinks.color,
            arrayOfQuestionNumbers[indexOfArrayQuestionNumbers]
          );
          const renderReadyRetrievedColorData =
            colorDataRefactor(retrievedColorData);

          generatedDataArray = generatedDataArray.concat(
            renderReadyRetrievedColorData
          );
          break;

        case "check box":
          const checkBoxData = await getQuestionDataWithLimit(
            apiCallLinks.checkBox,
            arrayOfQuestionNumbers[indexOfArrayQuestionNumbers]
          );
          const renderReadyCheckboxData = checkboxDataRefactor(checkBoxData);

          generatedDataArray = generatedDataArray.concat(
            renderReadyCheckboxData
          );

          break;

        case "slider":
          const retrievedSliderData = await getQuestionDataWithLimit(
            apiCallLinks.slider,
            arrayOfQuestionNumbers[indexOfArrayQuestionNumbers]
          );
          const renderReadySliderData =
            sliderDataRefactorer(retrievedSliderData);

          generatedDataArray = generatedDataArray.concat(renderReadySliderData);
          break;
        default:
          break;
      }
    }
    return generatedDataArray;
  };

  const getQuestionDataWithLimit = async (
    apiRoute: string,
    numberOfQuestions: number
  ) => {
    const retrievedDateData = await getAllQuestionDataWithLimit(
      apiRoute,
      numberOfQuestions
    );

    if (retrievedDateData.errorPresent) {
      dispatch(popupsStoreActions.setServerMessagePopupActive(true));
      dispatch(
        popupsStoreActions.setServerMessageData({
          message: `${retrievedDateData.data}`,
          messageType: "error",
        })
      );
    } else {
      dispatch(popupsStoreActions.setServerMessagePopupActive(true));
      dispatch(
        popupsStoreActions.setServerMessageData({
          message: `Data Retrieved`,
          messageType: "success",
        })
      );

      return retrievedDateData.data;
    }
  };

  useEffect(() => {
    if (astroidDestroyed && astroidExplosionTriggered) {
      updateActiveQuestionNumber(
        dispatch,
        activeQuestionNumber,
        generatedQuestionData.length
      );
      dispatch(formStoreActions.setAstroidDestroyed(false));

      dispatch(formStoreActions.setAstroidExplosionTriggered(false));
      dispatch(formStoreActions.setFireShipWeapons(false));
    }
  }, [
    astroidDestroyed,
    dispatch,
    activeQuestionNumber,
    generatedQuestionData,
    astroidExplosionTriggered,
  ]);

  return (
    <>
      <button
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          fontSize: "22px",
        }}
        onClick={generateGameData}
      >
        CREATE DATA
      </button>
      {!endOfTestReached && (
        <>
          {generatedQuestionData.length !== 0 &&
            generatedQuestionData[activeQuestionNumber].questionType ===
              "input" && (
              <GeneratedInput
                label={generatedQuestionData[activeQuestionNumber].label}
                id={`input-question-${activeQuestionNumber}`}
                inputProps={
                  generatedQuestionData[activeQuestionNumber].inputProps
                }
                key={`input-question-${activeQuestionNumber}-top-component`}
                questionNumber={activeQuestionNumber}
                questionText={
                  generatedQuestionData[activeQuestionNumber].question_text
                }
                totalNumberOfQuestions={generatedQuestionData.length}
              />
            )}
          {generatedQuestionData.length !== 0 &&
            generatedQuestionData[activeQuestionNumber].questionType ===
              "multipleChoice" && (
              <GeneratedMultipleChoice
                id={`multiple-choice-question-${activeQuestionNumber}`}
                possibleAnswersArray={
                  generatedQuestionData[activeQuestionNumber]
                    .possibleAnswersArray
                }
                questionNumber={activeQuestionNumber + 1}
              />
            )}
          {generatedQuestionData.length !== 0 &&
            generatedQuestionData[activeQuestionNumber].questionType ===
              "date" && (
              <GeneratedDate
                id={`date-question-${activeQuestionNumber}`}
                questionNumber={activeQuestionNumber + 1}
                dateQuestion={
                  generatedQuestionData[activeQuestionNumber].dateQuestion
                }
              />
            )}
          {generatedQuestionData.length !== 0 &&
            generatedQuestionData[activeQuestionNumber].questionType ===
              "color" && (
              <GeneratedColorInput
                circleColorOneHexCode={
                  generatedQuestionData[activeQuestionNumber].questionType
                }
                circleColorTwoHexCode={
                  generatedQuestionData[activeQuestionNumber].questionType
                }
                resultColorLowerEnd={
                  generatedQuestionData[activeQuestionNumber].questionType
                }
                resultColorHigherEnd={
                  generatedQuestionData[activeQuestionNumber].questionType
                }
                questionNumber={activeQuestionNumber + 1}
              />
            )}
          {generatedQuestionData.length !== 0 &&
            generatedQuestionData[activeQuestionNumber].questionType ===
              "checkbox" && (
              <GeneratedCheckboxQuestion
                questionNumber={activeQuestionNumber + 1}
                questionText={
                  generatedQuestionData[activeQuestionNumber].questionText
                }
                checkBoxOptions={
                  generatedQuestionData[activeQuestionNumber].checkBoxOptions
                }
              />
            )}
          {generatedQuestionData.length !== 0 &&
            generatedQuestionData[activeQuestionNumber].questionType ===
              "slider" && (
              <GeneratedRangeInput
                questionNumber={
                  generatedQuestionData[activeQuestionNumber].questionNumber
                }
                questionText={
                  generatedQuestionData[activeQuestionNumber].questionText
                }
                slideMin={generatedQuestionData[activeQuestionNumber].slideMin}
                slideMax={generatedQuestionData[activeQuestionNumber].slideMax}
                retrieveSlideInput={
                  generatedQuestionData[activeQuestionNumber].retrieveSlideInput
                }
              />
            )}
        </>
      )}
    </>
  );
};
export default FormGeneratorMainPage;
