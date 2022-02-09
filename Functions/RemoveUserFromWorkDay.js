// ===== Models =====
const VerifiedUser = require("../Models/VerifiedUser");
const WorkHours = require("../Models/WorkHours");

// ===== Custom Functions =====
const getDateForDb = require("./GetDateForDb");
const getFullTimeWorked = require("./GetFullTimeWorked");

/**
 * Update the WorkHours DB document by updating the user who is ending
 * his/her shift.
 * @param {[String]} id -> Users id as String
 * @return {[Boolean]} Returns a true if it succeeded, false otherwise
 */
function removeUserFromWorkDay(id) {
  WorkHours.aggregate([
    {
      $match: {
        date: getDateForDb().split(" ")[1]
      }
    },
    {
      $project: {
        users: {
          $filter: {
            input: "$users",
            as: "user",
            cond: { $eq: [ "$$user.userId", id ] }
          }
        }
      }
    }
  ]).exec((err, result) => {
   if (err) {
     console.log(err)
   }
   WorkHours.updateOne(
     {
       date: getDateForDb().split(" ")[1],
       "users.userId": id
     },
     {
       $push: {
         "users.$.userWorkTime": {
           startTime: result[0].users[0].currentStartTime,
           endTime: getDateForDb().split(" ")[0]
         }
       },
       "users.$.fullTime": getFullTimeWorked(
         result[0].users[0].currentStartTime,
         getDateForDb().split(" ")[0],
         result[0].users[0].fullTime
       )
     }
   ).exec((err, data) => {
     if(err) {
       console.log(err);
     }
   });
  });
  VerifiedUser.findOneAndUpdate(
    { _id: id },
    { active: false, fromHome: false },
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
