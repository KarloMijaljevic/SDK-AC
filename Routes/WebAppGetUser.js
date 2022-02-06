// ===== Requirements =====
const express = require("express");
const router = express.Router();

// VerifiedUser Model
const VerifiedUser = require("../Models/VerifiedUser");

// @route => GET /users
// @desc => Get users endpoint for web app. Simply lists all users.
// @access => Localhost only
router.get("/", (req,res) => {
  VerifiedUser.find({}, (err, result) => {
    if (err) {
      res.status(500).json({msg: err});
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
