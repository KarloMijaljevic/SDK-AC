// ===== Requirements =====
const express = require("express");
const router = express.Router();

// WorkHours Model
const WorkHours = require("../Models/WorkHours");

// @route => GET /dates
// @desc => Get date endpoint for web app. Simply lists all dates.
// @access => Localhost only
router.get("/", (req,res) => {
  WorkHours.find({}, (err, result) => {
    if (err) {
      res.status(500).json({msg: err});
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
