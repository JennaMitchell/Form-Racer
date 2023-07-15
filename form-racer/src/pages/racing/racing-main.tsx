import classes from "./racing-main.module.css";
import { useSetWindowScrollBarVar } from "../../utilities/media-queries/general-media-queries";

import RacingShipContainer from "./racing-ship/racing-ship";
import ScrollingStarBackground from "./scrolling-star-background/scrolling-star-background";
import BackgroundSettings from "./background-settings/background-settings";
import { useAppDispatch, useAppSelector } from "../../store/typescript-hooks";
import FormGeneratorMainPage from "./forms/generator/form-generator";
import QuestionTimerWindow from "./forms/question-timer/question-timer";
import LivesTrackerComponent from "./lives-tracker/lives-tracker-component/lives-tracker-component";
import GameOverScreen from "./game-over-screen/game-over-screen";
import TestTimer from "./forms/test-timer/test-timer";
import TestCompleteScreen from "./test-complete-screen/test-complete-screen";
import HomeWorldImage from "../../assets/home-world-image/home_world.png";
import { useEffect } from "react";
import { formStoreActions } from "../../store/form-store";
const RacingTopElement = (): JSX.Element => {
  useSetWindowScrollBarVar();
  const dispatch = useAppDispatch();

  const movingBackgoundActive = useAppSelector(
    (state) => state.userInfo.movingBackgroundActive
  );
  const gameOverScreenActive = useAppSelector(
    (state) => state.formRacing.gameOverScreenActive
  );
  const endOfTestReached = useAppSelector(
    (state) => state.formRacing.endOfTestReached
  );

  const shipReturnedAnimationComplete = useAppSelector(
    (state) => state.formRacing.shipReturnedAnimationComplete
  );

  const userFailedGame = useAppSelector(
    (state) => state.formRacing.userFailedGame
  );
  useEffect(() => {
    const deleteTime = setTimeout(() => {
      dispatch(formStoreActions.setEndOfTestReached(true));
    }, 1000);

    return () => {
      clearTimeout(deleteTime);
    };
  }, [dispatch]);

  return (
    <main className={classes.racingMainBackdrop}>
      {movingBackgoundActive && <ScrollingStarBackground />}
      {
        <img
          className={`${classes.homeWorldImage} ${
            endOfTestReached && !userFailedGame && classes.homeWorldMoveIn
          } ${shipReturnedAnimationComplete && classes.homeWorldFadeOut}`}
          alt="home world"
          src={HomeWorldImage}
        />
      }
      <BackgroundSettings />
      <div className={classes.racingMainContainer}>
        <FormGeneratorMainPage />
      </div>
      <RacingShipContainer />
      <QuestionTimerWindow />
      <LivesTrackerComponent />
      <TestTimer />

      {gameOverScreenActive && <GameOverScreen />}
      {endOfTestReached && <TestCompleteScreen />}
    </main>
  );
};
export default RacingTopElement;
