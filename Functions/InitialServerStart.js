// ===== WorkHours Model =====
const WorkHours = require("../Models/WorkHours");

// ===== Custom Functions =====
const startNewDate = require("../Jobs/StartNewDate");
const getDateForDb = require("../Functions/GetDateForDb");

/**
 * Function is used to set up initial data
 */
function initialServerStart() {
  WorkHours.findOne(
    { date: getDateForDb().split(" ")[1] },
    (err, result) => {
      if (err) {
        console.error(err);
      }
      if(!result) {
        console.log("There are no records of any dates...");
        console.log("Will create a date for today.");
        startNewDate();
      }
    }
  );
}

module.exports = initialServerStart;
