import { formStoreActions } from "../../../store/form-store";
import { useAppDispatch } from "../../../store/typescript-hooks";
import classes from "./game-over-screen.module.css";
const GameOverScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const continueButtonHandler = () => {
    dispatch(formStoreActions.setGameOverScreenActive(false));
  };
  return (
    <div className={classes.gameOverScreenTopContainer}>
      <p className={classes.gameOverTitle}> GAME OVER</p>
      <button className={classes.newGameButton} onClick={continueButtonHandler}>
        Continue ?
      </button>
    </div>
  );
};
export default GameOverScreen;
