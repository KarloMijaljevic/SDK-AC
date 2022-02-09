/**
 * Function is used to calculate time worked
 * @param  {[String]} start -> Start time of work in 'hh:mm' format
 * @param  {[String]} end -> End time of work in 'hh:mm' format
 * @param  {[String]} fullTime -> Full time in string format
 * @return {[String]} Returns String containing full work time
 */
function getFullTimeWorked(start, end, fullTime) {
  // From String to Integer:
  let startHour = parseInt(start.split(":")[0]);
  let startMinute = parseInt(start.split(":")[1]);
  let endHour = parseInt(end.split(":")[0]);
  let endMinute = parseInt(end.split(":")[1]);
  let fullTimeHour = parseInt(fullTime.split(":")[0]);
  let fullTimeMinute = parseInt(fullTime.split(":")[1]);
  // Calculation time:
  let fullWork = fullTimeHour * 60 + fullTimeMinute;
  let minutesWorked = ((endHour * 60) + endMinute) - ((startHour * 60) + startMinute);
  fullWork = fullWork + minutesWorked;
  if(fullWork < 60) {
    fullTimeHour = 0;
    fullTimeMinute = fullWork;
  } else {
    fullTimeHour = Math.floor(fullWork / 60);
    fullTimeMinute = fullWork % 60;
  }
  // From Integer to String:
  if((fullTimeHour + "").length === 1) {
    fullTimeHour = "0" + fullTimeHour;
  } else {
    fullTimeHour = fullTimeHour + "";
  }
  if((fullTimeMinute + "").length === 1) {
    fullTimeMinute = "0" + fullTimeMinute;
  } else {
    fullTimeMinute = fullTimeMinute + "";
  }
  return (fullTimeHour + ":" + fullTimeMinute);
}

module.exports = getFullTimeWorked;
