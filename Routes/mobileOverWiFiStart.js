// ===== Requirements =====
const { execSync } = require("child_process");
const express = require('express');
const router = express.Router();

// ===== VerifiedUser Model =====
const VerifiedUser = require('../Models/VerifiedUser');

// ===== Commands Variables =====
const regex = /([0-9\.]*)/ig;
const commands = [
  "bash Scanner.sh",
  "cat Files/IpList.txt",
  "cat Files/IpToMacList.txt | grep ",
  "echo -n '' > Files/IpList.txt | echo -n '' > Files/IpToMacList.txt"
];

/**
 * @route => POST /openDoor
 * @desc => Open door and start work time over WiFi from
 * mobile app
 * @access => Localhost only
*/
router.post('/', (req, res) => {
    const { id } = req.body;

    // Simple app request validation
    if(!id) {
      return res.status(400).json({msg: "Error no data sent!"});
    }

    VerifiedUser.findOneAndUpdate(
      { _id: id },
      { active: true},
      null,
      (err, docs) => {
        if (err){
          console.error(err);
          return res.status(500).json({msg: "Internal server error :_("});
        }
      }
    );

    VerifiedUser.findOne({ _id: id }).then(user => {
      if(user != null) {
        return validateUser(user, res);
      } else {
        return res.status(400).json({msg: "There is no such user. Your MAC address has been blacklisted now!"});
      }
    });
});

async function validateUser(user, res) {
  let usersIp = "";
  execSync(commands[0]);
  let ipListResult = execSync(commands[1]).toString();
  try {
    usersIp = await execSync(commands[2] + `'${user.mac}'`).toString();
  } catch(err) {
    console.error(err);
    return res.status(500).json({msg: "Internal server error :_("});
  }
  usersIp = regex.exec(usersIp);
  execSync(commands[3]);
  if(ipListResult.includes(usersIp[1])) {
    return res.status(200).json({msg: `Hello ${user.name}, door will open shortly :)`});
  } else {
    return res.status(401).json({msg: "Nice try punk! >_<"});
  }
}

module.exports = router;
