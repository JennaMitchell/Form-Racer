const constants = require("../constants");

exports.validDatabaseCheck = (databaseNameToCheck, databaseListName) => {
  let databaseValid = false;
  let databaseListToCheck = [];
  if (databaseListName === "question_data") {
    databaseListToCheck = constants.acceptedQuestionDatabase;
  } else if (databaseListName === "leaderboard_data") {
    databaseListToCheck = constants.acceptedLeaderboardDatabase;
  } else {
    return false;
  }
  for (
    let indexOfAcceptedQuestionDatabase = 0;
    indexOfAcceptedQuestionDatabase < databaseListToCheck.length;
    indexOfAcceptedQuestionDatabase++
  ) {
    if (
      databaseNameToCheck ===
      databaseListToCheck[indexOfAcceptedQuestionDatabase]
    ) {
      databaseValid = true;
      break;
    } else if (
      databaseNameToCheck !==
        databaseListToCheck[indexOfAcceptedQuestionDatabase] &&
      indexOfAcceptedQuestionDatabase == databaseListToCheck.length - 1
    ) {
      databaseValid = false;
    }
  }

  return databaseValid;
};
