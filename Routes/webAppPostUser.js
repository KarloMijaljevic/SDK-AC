// ===== Requirements =====
const express = require('express');
const router = express.Router();

// VerifiedUser Model
const VerifiedUser = require('../Models/VerifiedUser');

// @route   POST users
// @desc    Register new user via web app
// @access  Localhost only
router.post('/', (req, res) => {
  const { name, email, mac } = req.body;

  // Simple validation
  if(!name || !email || !mac) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  VerifiedUser.findOne({ email }).then(user => {
    if(user) {
      return res.status(400).json({ msg: "User already exist" });
    }
    const newUser = new VerifiedUser({
      name,
      email,
      mac
    });
    newUser.save();
    res.status(200).json({user: newUser });
  });
});
module.exports = router;
