// ===== Models =====
const VerifiedUser = require("../Models/VerifiedUser");
const WorkHours = require("../Models/WorkHours");

// ===== Custom Functions =====
const getDateForDb = require("./GetDateForDb");

/**
 * Update the WorkHours DB document by updating the user who is ending
 * his/her shift, sets the endTime.
 * @param {[String]} id -> Users id as String
 * @return {[Boolean]} Returns a true if it succeeded, false otherwise
 */
function removeUserFromWorkDay(id) {
  WorkHours.findOneAndUpdate(
    { date: getDateForDb().split(" ")[1], "users.userId": id },
    { $set: {
      "users.$.endTime": getDateForDb().split(" ")[0]
    }},
    { new: true },
    (err, docs) => {
      if (err) {
        console.error(err);
        return false;
      }
    }
  );
  VerifiedUser.findOneAndUpdate(
    { _id: id },
    { active: false },
    { new: true },
    (err, docs) => {
      if(err) {
        console.error(err);
        return false;
      }
    }
  );
  return true;
}

module.exports = removeUserFromWorkDay;
