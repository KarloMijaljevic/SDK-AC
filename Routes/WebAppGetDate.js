// ===== Requirements =====
const express = require("express");
const router = express.Router();

// ===== Middleware =====
const auth = require("../Middleware/Auth");

// ===== WorkHours Model =====
const WorkHours = require("../Models/WorkHours");
const webAppCors = require("../Middleware/WebAppCors");

// @route => GET /dates
// @desc => Get date endpoint for web app. Simply lists all dates.
// @access => Private
router.get("/", [auth, webAppCors], (req,res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  WorkHours.find({}, (err, result) => {
    if (err) {
      res.status(500).json({msg: err});
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
