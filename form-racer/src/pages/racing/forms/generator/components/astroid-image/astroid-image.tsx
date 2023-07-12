import classes from "./astroid-image.module.css";
import AstroidPixelImage from "../../../../../../assets/backgrounds/astroid.png";
const AstroidImage = (): JSX.Element => {
  return (
    <div className={classes.astroidImageContainer}>
      <img
        className={classes.astroidImage}
        src={AstroidPixelImage}
        alt="astroid backdrop"
      />
    </div>
  );
};
export default AstroidImage;
