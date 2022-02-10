// ===== Requirements =====
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

// WorkHours Model
const VerifiedUser = require("../Models/VerifiedUser");

// ===== Middleware =====
const auth = require("../Middleware/Auth");

// @route => post /auth
// @desc => Send credidential to authenticate the user
// @access => Private
router.post("/", (req,res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  const { email, password } = req.body;
  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check for existing user
  VerifiedUser.findOne({ email }).then(user => {
    if(!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if(!isMatch) {
        res.status(400).json({ msg: "Invalid credidentials!" });
      }
      jwt.sign(
        { id: user._id },
        process.env.JWT,
        { expiresIn: 14400 },
        (err, token) => {
          if(err) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
          }
          res.status(200).json(token);
        }
      );
    });
  });
});

// @route => get /auth/user
// @desc => Get user data
// @access => Private
router.get("/user", auth, (req,res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  const { id } = req.body;
  VerifiedUser.findOne(
    { _id: id },
    { password: 0, mac: 0 }
  ).then(user => {
    res.status(200).json(user);
  });
});

module.exports = router;
