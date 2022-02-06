// ===== Models =====
const VerifiedUser = require("../Models/VerifiedUser");
const WorkHours = require("../Models/WorkHours");

// ===== Custom Functions =====
const getDateForDb = require("./GetDateForDb");

/**
 * Update the WorkHours DB document by adding the user who is starting
 * his/her shift, sets the endTime to '-' since there is no end time
 * yet.
 * @param {[String]} id -> Users id as String
 * @return {[Boolean]} Returns a true if it succeeded, false otherwise
 */
function addUserToWorkday(id) {
  if(!setUserActive(id)) {
    return false;
  }
  VerifiedUser.findOne({ _id: id }).then(user => {
    if(user === null || user === undefined) {
      return false;
    }
    WorkHours.findOneAndUpdate(
      { date: getDateForDb().split(" ")[1] },
      { $push: { users: {
          userId: user.id,
          userName: user.name,
          userRole: user.role,
          startTime: getDateForDb().split(" ")[0],
          endTime: "-"
        }
      }},
      { new: true },
      (err, docs) => {
        if (err) {
          console.error(err);
          return false;
        }
      }
    );
  });
  return true;
}

/**
 * Sets given users active status to true.
 * @param {[String]} id -> Users id as String
 * @return {[Boolean]} Returns true if its a success, false otherwise
 */
function setUserActive(id) {
  VerifiedUser.findOneAndUpdate(
    { _id: id },
    { active: true },
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

module.exports = addUserToWorkday;
