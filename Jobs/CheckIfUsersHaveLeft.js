// ===== Requirements =====
const { execSync } = require("child_process");
const express = require('express');
const router = express.Router();

// ===== VerifiedUser Model =====
const VerifiedUser = require('../Models/VerifiedUser');

// ===== Constant Variables =====
const regex = /([0-9\.]*)/ig;
const commands = [
  "bash Scanner.sh",
  "cat Files/IpList.txt",
  "cat Files/IpToMacList.txt | grep ",
  "rm Files/IpList.txt Files/IpToMacList.txt"
];

/**
 * Function checks if any user has left the building and notifies the DB
 * if he/she did leave
 */
function checkIfUsersHaveLeft() {
  VerifiedUser.find({}, (error, users) => {
    if(error) {
      console.log(error);
    }
    execSync(commands[0]);
    let ipListResult = execSync(commands[1]).toString();
    users.forEach(user => {
      if(user.fromHome === false) {
        if(!validateUser(user.mac, ipListResult)) {
          VerifiedUser.findOneAndUpdate(
            { email: user.email },
            { active: false},
            null,
            (err, docs) => {
              if (err){
                console.error(err);
              }
            }
          );
        }
      }
    });
  });
  execSync(commands[3]);
}

/**
 * If user is active in the DB but there there is no MAC address on the network
 * @param  {[String]} mac --> A MAC address to be checked
 * @param  {[String]} ipListResult --> Ip List (result of Scanner.sh)
 * @return {[Boolean]} Returns true if the user is active on the network, false
 * otherwise
 */
async function validateUser(mac, ipListResult) {
  let usersIp = "noSuchUser";
  try {
    usersIp = await execSync(commands[2] + `'${mac}'`).toString();
  } catch(err) {
    userIp = "noSuchUser";
  }
  if(userIp === "noSuchUser") {
    return false;
  } else {
    usersIp = regex.exec(usersIp);
    if(ipListResult.includes(usersIp[1])) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = checkIfUsersHaveLeft;
