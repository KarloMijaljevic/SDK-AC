// ===== Requirements =====
const express = require("express");
const router = express.Router();

// ===== VerifiedUser Model =====
const VerifiedUser = require("../Models/VerifiedUser");

// ===== Middleware =====
const auth = require("../Middleware/Auth");
const webAppCors = require("../Middleware/WebAppCors");

// @route => PUT /users
// @desc => Updates one or more user parameters
// @access => Private
router.get("/", [auth, webAppCors], (req,res) => {
  const { id, name, password, email, mac, role } = req.body;
  VerifiedUser.findAndUpdate(
    {
      _id: id
    },
    {
      name: name,
      password: password,
      email: email,
      mac: mac,
      role: role,
    },
    (err, result) => {
    if (err) {
      res.status(500).json({msg: err});
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
