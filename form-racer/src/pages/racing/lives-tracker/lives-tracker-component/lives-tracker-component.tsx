import { useAppSelector } from "../../../../store/typescript-hooks";
import classes from "./lives-tracker-component.module.css";
import FullHeart from "../../../../assets/heart-images/full_heart.png";
import EmptyHeart from "../../../../assets/heart-images/empty_heart.png";
const LivesTrackerComponent = (): JSX.Element => {
  const activeLivesArray = useAppSelector(
    (state) => state.formRacing.activeLifesArray
  );

  return (
    <div className={classes.livesTrackerContainer}>
      <span className={classes.livesLabel}>Lives</span>
      {activeLivesArray.map((lifeActive: boolean, index: number) => {
        if (lifeActive) {
          return (
            <img
              src={FullHeart}
              alt="full life point heart"
              className={classes.heartImage}
              key={`full-heart-${index}`}
            />
          );
        } else {
          return (
            <img
              src={EmptyHeart}
              alt="empty life point heart"
              className={classes.heartImage}
              key={`empty-heart-${index}`}
            />
          );
        }
      })}
    </div>
  );
};
export default LivesTrackerComponent;
