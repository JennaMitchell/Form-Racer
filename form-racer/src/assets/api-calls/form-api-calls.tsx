import axios from "axios";

import { databaseURL } from "../constants/constants";
import { apiErrorHandler } from "./api-error-handler";

export const getAllQuestionData = async (databaseExtension: string) => {
  try {
    const returnedData = await axios.get(`${databaseURL}/${databaseExtension}`);
    const errorPresent = apiErrorHandler(returnedData);
    if (errorPresent) {
      throw new Error(`${returnedData?.data?.code}`);
    } else {
      return {
        data: returnedData.data,
        errorPresent: false,
      };
    }
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);
    return {
      data: message,
      errorPresent: true,
    };
  }
};
export const getAllQuestionDataWithLimit = async (
  databaseExtension: string,
  limit: number
) => {
  console.log(`${databaseURL}/limit_${databaseExtension}${limit}`);
  try {
    const returnedData = await axios.get(
      `${databaseURL}/limit_${databaseExtension}${limit}`
    );
    const errorPresent = apiErrorHandler(returnedData);
    if (errorPresent) {
      throw new Error(`${returnedData?.data?.code}`);
    } else {
      return {
        data: returnedData.data,
        errorPresent: false,
      };
    }
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);
    return {
      data: message,
      errorPresent: true,
    };
  }
};
