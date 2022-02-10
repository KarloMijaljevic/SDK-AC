// ===== Requirements =====
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

// ===== VerifiedUser Model =====
const VerifiedUser = require("../Models/VerifiedUser");

// ===== Middleware =====
const auth = require("../Middleware/Auth");

// @route   POST users
// @desc    Register new user via web app
// @access  Private
router.post('/', auth, (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  const { name, email, mac, password } = req.body;
  // Simple validation
  if(!name || !email || !mac || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check for existing user
  VerifiedUser.findOne({ email }).then(user => {
    if(user) {
      return res.status(400).json({ msg: "User already exist" });
    }
    const newUser = new VerifiedUser({
      _id: new mongoose.Types.ObjectId(),
      name,
      password,
      email,
      mac
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) {
          console.error(err);
          return res.status(500).json({ msg: "Internal server error" });
        }
        newUser.password = hash;
        newUser.save().then(user => {
          res.status(200).json({ msg: `User ${name} created successfully :)` })
        });
      });
    });
  });
});

module.exports = router;
