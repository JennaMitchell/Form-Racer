type CheckBoxDataType = {
  checkbox_question_data_id: number;
  checkbox_question: string;
  checkbox_possible_answer_one: string;
  checkbox_possible_answer_two: string;
  checkbox_possible_answer_three: string;
  checkbox_possible_answer_four: string;
  checkbox_possible_answer_five: string;
  checkbox_possible_answer_one_correct: number;
  checkbox_possible_answer_two_correct: number;
  checkbox_possible_answer_three_correct: number;
  checkbox_possible_answer_four_correct: number;
  checkbox_possible_answer_five_correct: number;
};

export const checkboxDataRefactor = (retrievedData: CheckBoxDataType[]) => {
  return retrievedData.map((dataEntry, index: number) => {
    const correctAnswerArray = [
      dataEntry.checkbox_possible_answer_one_correct === 1,
      dataEntry.checkbox_possible_answer_two_correct === 1,
      dataEntry.checkbox_possible_answer_three_correct === 1,
      dataEntry.checkbox_possible_answer_four_correct === 1,
      dataEntry.checkbox_possible_answer_five_correct === 1,
    ];

    const possibleAnswersArray = [
      dataEntry.checkbox_possible_answer_one,
      dataEntry.checkbox_possible_answer_two,
      dataEntry.checkbox_possible_answer_three,
      dataEntry.checkbox_possible_answer_four,
      dataEntry.checkbox_possible_answer_five,
    ];
    return {
      questionText: dataEntry.checkbox_question,
      possibleAnswersArray: possibleAnswersArray,
      answerKeyArray: correctAnswerArray,
      questionType: "checkbox",
      id: `checkbox-question-${index}`,
    };
  });
};
