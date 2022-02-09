// ===== Models =====
const VerifiedUser = require("../Models/VerifiedUser");
const WorkHours = require("../Models/WorkHours");

// ===== Custom Functions =====
const getDateForDb = require("./GetDateForDb");

/**
 * Update the WorkHours DB document by adding the user who is starting
 * his/her shift
 * @param {[String]} id -> Users id as String
 * @return {[Boolean]} Returns a true if it succeeded, false otherwise
 */
function addUserToWorkday(id, isFromHome) {
  if(!setUserActive(id, isFromHome)) {
    return false;
  }
  VerifiedUser.findOne({ _id: id }).then(user => {
    if(user === null || user === undefined) {
      return false;
    }
    WorkHours.findOne(
      {
        date: getDateForDb().split(" ")[1],
        "users.userId": id
      }
    ).then(userDate => {
      if(userDate) {
        WorkHours.updateOne(
          {
            date: getDateForDb().split(" ")[1],
            "users.userId": id
          },
          {
            $set: {
              "users.$.currentStartTime": getDateForDb().split(" ")[0]
            }
          }
        ).exec((err, data) => {
          if(err) {
            console.log(err);
          }
        });
      } else {
        WorkHours.findOneAndUpdate(
          { date: getDateForDb().split(" ")[1] },
          { $push: { users: {
              userId: user.id,
              userName: user.name,
              userRole: user.role,
              currentStartTime: getDateForDb().split(" ")[0],
              userWorkTime: [],
              fullTime: "00:00"
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
      }
    });
  });
  return true;
}

/**
 * Sets given users active status to true.
 * @param {[String]} id -> Users id as String
 * @return {[Boolean]} Returns true if its a success, false otherwise
 */
function setUserActive(id, isFromHome) {
  VerifiedUser.findOneAndUpdate(
    { _id: id },
    { active: true, fromHome: isFromHome },
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
