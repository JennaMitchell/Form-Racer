import "./App.css";
import RacingTopElement from "./pages/racing/racing-main";
import NavBar from "./components/nav-bar/nav-bar";
import { useEffect } from "react";
import { useAppSelector } from "./store/typescript-hooks";
import SignupPopup from "./components/popups/signup/signup-popup";
import LoginPopup from "./components/popups/login/login-popup";
import ChangeRacerPopup from "./components/popups/change-racer/change-racer-popup";
import GameSetupPopup from "./components/popups/game-setup/game-setup-popup";
// import ServerMessagePopup from "./components/popups/server-message/server-message-popup";
import ResetButton from "./components/reset-button/reset-button";
import {
  addQuestionDataEntry,
  getAllQuestionFromSelectedDatabase,
} from "./utilities/db-requests/questions/questions";
import { acceptedDatabaseObject } from "./assets/constants/constants";

import { checkboxQuestionData } from "./database-setup/questions-data/checkbox-question-data";

function App() {
  const lockViewportActive = useAppSelector(
    (state) => state.popups.lockViewportActive
  );
  const loginPoupActive = useAppSelector(
    (state) => state.popups.loginPopupActive
  );
  const signupPopupActive = useAppSelector(
    (state) => state.popups.signupPopupActive
  );

  const changeRacerPopupActive = useAppSelector(
    (state) => state.popups.changeRacerPopupActive
  );
  const gameSetupPoupActive = useAppSelector(
    (state) => state.popups.gameSetupActive
  );

  // const serverMessagePopupActive = useAppSelector(
  //   (state) => state.popups.serverMessagePopupActive
  // );

  // const serverMessageData = useAppSelector(
  //   (state) => state.popups.serverMessageData
  // );
  const testStarted = useAppSelector((state) => state.formRacing.testStarted);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      window.innerWidth - document.documentElement.clientWidth + "px"
    );
  }, []);

  useEffect(() => {
    const bodyElement = document.getElementsByTagName(
      "body"
    )[0] as HTMLBodyElement;
    if (lockViewportActive) {
      bodyElement.classList.add("lockedViewport");
    } else {
      if (bodyElement.classList.contains("lockedViewport")) {
        bodyElement.classList.remove("lockedViewport");
      }
    }
  }, [lockViewportActive]);

  const dataCreationTestFunction = () => {
    for (
      let indexOfCheckboxQuestion = 0;
      indexOfCheckboxQuestion < checkboxQuestionData.length;
      indexOfCheckboxQuestion++
    ) {
      addQuestionDataEntry(
        "checkbox",
        checkboxQuestionData[indexOfCheckboxQuestion]
      );
    }

    getAllQuestionFromSelectedDatabase(
      acceptedDatabaseObject.checkbox.databaseName
    );
  };

  return (
    <div className="App">
      <button
        onClick={dataCreationTestFunction}
        style={{
          position: "absolute",
          top: "10px",
          left: "200px",
          width: "300px",
          height: "200px",
          backgroundColor: "white",
          zIndex: "100",
        }}
      >
        Test
      </button>
      {signupPopupActive && <SignupPopup />}
      {loginPoupActive && <LoginPopup />}
      {changeRacerPopupActive && <ChangeRacerPopup />}
      {gameSetupPoupActive && <GameSetupPopup />}
      {/* {serverMessagePopupActive && (
        <ServerMessagePopup {...serverMessageData} />
      )} */}
      {!testStarted && <NavBar />}
      {testStarted && <ResetButton />}
      <RacingTopElement />
    </div>
  );
}

export default App;
