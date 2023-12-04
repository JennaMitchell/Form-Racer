type MultipleChoiceQuestionDatabaseType = {
  multiple_choice_question_data_id: number;
  possible_answer_one: string;
  possible_answer_two: string;
  possible_answer_three: string;
  possible_answer_four: string;
  question: string;
  correct_answer_index: number;
};

export const multipleChoiceDataRefactorer = (
  retrievedData: MultipleChoiceQuestionDatabaseType[]
) => {
  return retrievedData.map((dataEntry, index) => {
    return {
      possibleAnswers: [
        dataEntry.possible_answer_one,
        dataEntry.possible_answer_two,
        dataEntry.possible_answer_three,
        dataEntry.possible_answer_four,
      ],
      questionType: "multiple choice",
      question: dataEntry.question,
      correctAnswerIndex:
        dataEntry.correct_answer_index >= 4
          ? 0
          : dataEntry.correct_answer_index,
      id: `multiple-choice-question-${index}`,
    };
  });
};
