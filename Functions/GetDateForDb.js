/**
 * Used to get date object as string
 * @return {[String]} Function returns current date in format 'hh:mm dd/mm/yyyy'
 */
function getDateForDb() {
  const date = new Date();
  let minute = dateLengthChecker(date.getMinutes() + "", 1, "0");
  let hour = dateLengthChecker(date.getHours() + "", 1, "0");
  let day = dateLengthChecker(date.getDate() + "", 1, "0");
  let month = dateLengthChecker((date.getMonth() + 1) + "", 1, "0");

  return (hour + ":" + minute + " " + day + "/" +
    month + "/" + date.getFullYear());
}

/**
 * Checks if a 'date' length string is equal to a certian length
 * @param  {[String]} string -> A String that represents a date parameter
 * @param  {[Integer]} equals -> How long the string needs to be
 * @param  {[String]} adition -> What to add if the string is not big enough
 * @return {[String]} Returns valid string
 */
function dateLengthChecker(string, equals, adition) {
  return (string.length === equals) ?
    (adition + string) :
    string;
}

module.exports = getDateForDb;
