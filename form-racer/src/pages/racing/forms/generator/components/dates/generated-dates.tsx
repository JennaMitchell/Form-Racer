import { ChangeEvent, useRef } from "react";
import classes from "./generated-dates.module.css";

type Props = {
  id: string;
  questionNumber: number;
  dateQuestion: string;
};
const GeneratedDate = ({
  questionNumber,
  dateQuestion,
}: Props): JSX.Element => {
  const dateInputRef = useRef<null | HTMLInputElement>(null);

  const dateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const currentDateRef = dateInputRef.current;
    if (currentDateRef) {
      const notNullDateRef = currentDateRef;
      const dateValue = notNullDateRef.value;
      console.log(dateValue);
      // date formatted into yyyy-mm-dd
    }
  };

  return (
    <div className={classes.dateMainContainer}>
      <label className={classes.dateLabel} htmlFor={"date-id"}>
        Question {questionNumber}.
      </label>
      <p className={classes.dateQuestion}>{dateQuestion}</p>
      <input
        type="date"
        className={classes.dateInput}
        id="date-id"
        ref={dateInputRef}
        onChange={dateChangeHandler}
      />
    </div>
  );
};
export default GeneratedDate;
