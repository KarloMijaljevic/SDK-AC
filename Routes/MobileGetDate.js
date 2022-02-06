// ===== Requirements =====
const express = require("express");
const router = express.Router();

// WorkHours Model
const WorkHours = require("../Models/WorkHours");

// @route => post /userDates
// @desc => Get date endpoint for mobile app. Simply lists dates when the user
// has worked.
// @access => From the mobile app, open port is needed for the server
router.post("/", (req,res) => {
  const { id } = req.body;
  WorkHours.aggregate([{
    $project: {
      users: {
        $filter: {
          input: "$users",
          as: "user",
          cond: { $eq: [ "$$user.userId", id ] }
        }
      },
      date: 1
    }}
  ]).exec((err, result) => {
   if (err) {
     res.status(500).json({msg: err});
   } else {
     res.status(200).json(result);
   }
 });
});

module.exports = router;
