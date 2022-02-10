// ===== Requirements =====
const { execSync } = require("child_process");
const express = require('express');
const router = express.Router();

// ===== Models =====
const VerifiedUser = require("../Models/VerifiedUser");

// ===== Custom Functions =====
const addUserToWorkday = require("../Functions/AddUserToWorkDay");

// ===== Constant Variables =====
const regex = /([0-9\.]*)/ig;
const commands = [
  "bash Scanner.sh",
  "cat Files/IpList.txt",
  "cat Files/IpToMacList.txt | grep ",
  "rm Files/IpList.txt Files/IpToMacList.txt"
];

/**
 * @route => POST /openDoor
 * @desc => Open door and start work time over WiFi from
 * mobile app
 * @access => Private
*/
router.post('/', (req, res) => {
    const { id } = req.body;
    if(!id) {
      return res.status(400).json({msg: "Error no data sent!"});
    }
    VerifiedUser.findOne({ _id: id }).then(user => {
      if(user != null) {
        return validateUser(user, res, id);
      } else {
        return res.status(400).json({msg: "There is no such user. Your MAC address has been blacklisted now!"});
      }
    });
});

/**
 * Function checks if the senders MAC is among the connected devices.
 * @param  {[VerifiedUser]} user -> VerifiedUser object
 * @param  {[HTTP Response]} res -> HTTP response object
 * @param  {[String]} id -> The ID that the sender provieds via the HTTP
 * request body
 * @return {[HTTP Response]} Returns a HTTP response for the sender
 */
async function validateUser(user, res, id) {
  let usersIp = "";
  execSync(commands[0]);
  let ipListResult = execSync(commands[1]).toString();
  try {
    usersIp = await execSync(commands[2] + `'${user.mac}'`).toString();
    usersIp = regex.exec(usersIp);
  } catch(err) {
    console.error(err);
    execSync(commands[3]);
    return res.status(500).json({msg: "Internal server error :_("});
  }
  execSync(commands[3]);
  if(ipListResult.includes(usersIp[1])) {
    if(!addUserToWorkday(id, false)) {
      return res.status(500).json({msg: "Internal server error :_("});
    }
    return res.status(200).json({msg: `Hello ${user.name}, door will open shortly :)`});
  } else {
    return res.status(401).json({msg: "Nice try punk! >_<"});
  }
}

module.exports = router;
