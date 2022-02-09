// ===== Requirements =====
const express = require('express');
const router = express.Router();

// ===== Models =====
const VerifiedUser = require("../Models/VerifiedUser");

// ===== Custom Functions =====
const addUserToWorkday = require("../Functions/AddUserToWorkDay");
const removeUserFromWorkDay = require("../Functions/RemoveUserFromWorkDay");

/**
 * @route => POST /homeWork
 * @desc => Start/End work from home
 * @access => Needs to be accesses from home so we would
 * need to open a port for this one
*/
router.post('/', (req, res) => {
    const { id } = req.body;
    if(!id) {
      return res.status(400).json({msg: "Error no data sent!"});
    }
    VerifiedUser.findOne({ _id: id }).then(user => {
      if(user != null) {
        if(user.active === true && user.fromHome === true) {
          if(!removeUserFromWorkDay(id)) {
            return res.status(500).json({msg: "Internal server error :_("});
          }
          return res.status(200).json({msg: `Hello ${user.name}, you have ended working,`});
        } else {
          if(!addUserToWorkday(id, true)) {
            return res.status(500).json({msg: "Internal server error :_("});
          }
          return res.status(200).json({msg: `Hello ${user.name}, you have started working,`});
        }
      } else {
        return res.status(400).json({msg: "No such user. How...?"});
      }
    });
});

module.exports = router;
