import { useState, useEffect } from "react";
import { calculateDateTime } from "../util/targetDateTime";

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function TimeDisplay(props) {
  const [currentDate, setCurrentDate] = useState(
    calculateDateTime(props.timezone)
  );

  useEffect(() => {
    setTimeout(() => setCurrentDate(calculateDateTime(props.timezone)), 1000);
  });

  return (
    <p className="date-time">
      {months[currentDate.getMonth()]} {currentDate.getDate()},{" "}
      {currentDate.getHours().toString().length === 1
        ? `0${currentDate.getHours()}`
        : currentDate.getHours()}
      :
      {currentDate.getMinutes().toString().length === 1
        ? `0${currentDate.getMinutes()}`
        : currentDate.getMinutes()}
      :
      {currentDate.getSeconds().toString().length === 1
        ? `0${currentDate.getSeconds()}`
        : currentDate.getSeconds()}
    </p>
  );
}

export default TimeDisplay;
