import { databaseUrl } from "../../../assets/constants/constants";
import {
  checkboxQuestionType,
  colorQuestionType,
  dateQuestionType,
  inputQuestionType,
  multipleChoiceQuestionType,
  sliderQuestionType,
} from "../../../assets/constants/questionDataTypes";
import { dbErrorHandeling } from "../error-handeling/db-error-handeling";
import { acceptedDatabaseObject } from "../../../assets/constants/constants";
export const getAllQuestionFromSelectedDatabase = async (
  selectedDatabase: string
) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseUrl}/questions/get-all-selected-question-data/${selectedDatabase}`,
      {
        method: "GET",
      }
    );

    const jsonedResponse = await fetchedResponse.json();

    dbErrorHandeling(fetchedResponse.status, jsonedResponse);
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);
    throw new Error(`${message}`);
  }
};

export const addQuestionDataEntry = async (
  questionDatabase: string,
  newDatabaseEntry:
    | checkboxQuestionType
    | colorQuestionType
    | dateQuestionType
    | inputQuestionType
    | multipleChoiceQuestionType
    | sliderQuestionType
) => {
  try {
    const acceptedDatabaseTypes = Object.keys(acceptedDatabaseObject);
    console.log(
      `${databaseUrl}/questions${acceptedDatabaseObject[questionDatabase].subURL}${acceptedDatabaseObject[questionDatabase].addURL}`
    );
    if (!acceptedDatabaseTypes.includes(questionDatabase)) {
      console.log("Error");
    } else {
      const fetchedResponse = await fetch(
        `${databaseUrl}/questions${acceptedDatabaseObject[questionDatabase].subURL}${acceptedDatabaseObject[questionDatabase].addURL}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(newDatabaseEntry),
        }
      );

      // const jsonedResponse = await fetchedResponse.json();

      // dbErrorHandeling(fetchedResponse.status, jsonedResponse);
      console.log(fetchedResponse);

      return;
    }
  } catch (err) {
    let message;
    console.log(err);
    // if (err instanceof Error) message = err.message;
    // else message = String(err);
    // throw new Error(`${message}`);
  }
};
