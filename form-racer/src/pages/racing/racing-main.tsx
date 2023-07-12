import classes from "./racing-main.module.css";
import { useSetWindowScrollBarVar } from "../../utilities/media-queries/general-media-queries";

import RacingShipContainer from "./racing-ship/racing-ship";
import ScrollingStarBackground from "./scrolling-star-background/scrolling-star-background";
import BackgroundSettings from "./background-settings/background-settings";
import { useAppSelector } from "../../store/typescript-hooks";
import FormGeneratorMainPage from "./forms/generator/form-generator";
import QuestionTimerWindow from "./forms/question-timer/question-timer";
import LivesTrackerComponent from "./lives-tracker/lives-tracker-component/lives-tracker-component";
import GameOverScreen from "./game-over-screen/game-over-screen";

const RacingTopElement = (): JSX.Element => {
  useSetWindowScrollBarVar();

  const movingBackgoundActive = useAppSelector(
    (state) => state.userInfo.movingBackgroundActive
  );
  const gameOverScreenActive = useAppSelector(
    (state) => state.formRacing.gameOverScreenActive
  );

  return (
    <main className={classes.racingMainBackdrop}>
      {movingBackgoundActive && <ScrollingStarBackground />}

      <BackgroundSettings />
      <div className={classes.racingMainContainer}>
        <FormGeneratorMainPage />
      </div>
      <RacingShipContainer />
      <QuestionTimerWindow />
      <LivesTrackerComponent />
      {gameOverScreenActive && <GameOverScreen />}
    </main>
  );
};
export default RacingTopElement;
