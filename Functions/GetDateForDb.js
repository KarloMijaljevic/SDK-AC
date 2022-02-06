/**
 * Used to get date object as string
 * @return {[String]} Function returns current date in format 'hh:mm dd/mm/yyyy'
 */
function getDateForDb() {
  const date = new Date();
  return (
    "" + date.getHours() +
    ":" + date.getMinutes() + " " + date.getDate() +
    "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

module.exports = getDateForDb;
