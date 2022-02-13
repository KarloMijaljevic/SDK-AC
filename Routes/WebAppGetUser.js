// ===== Requirements =====
const express = require("express");
const router = express.Router();

// ===== VerifiedUser Model =====
const VerifiedUser = require("../Models/VerifiedUser");

// ===== Middleware =====
const auth = require("../Middleware/Auth");
const webAppCors = require("../Middleware/WebAppCors");

// @route => GET /users
// @desc => Get users endpoint for web app. Simply lists all users.
// @access => Private
router.get("/", [auth, webAppCors], (req,res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  VerifiedUser.find({}, (err, result) => {
    if (err) {
      res.status(500).json({msg: err});
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
