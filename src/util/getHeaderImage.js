import sunIcon from "../images/sun.svg";
import moonIcon from "../images/half-moon.svg";
import { calculateDateTime } from "./targetDateTime";

export function getHeaderImage(timezone) {
  let date = calculateDateTime(timezone);
  return date.getHours() > 5 && date.getHours() < 17
    ? {icon: sunIcon,alt:"sun"} 
    : {icon: moonIcon,alt:"moon"} ;
}
