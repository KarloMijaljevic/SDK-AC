// ===== Requirements =====
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

// WorkHours Model
const VerifiedUser = require("../Models/VerifiedUser");

/**
 * Middleware authentification function
 * @param  {[HTTP]}   req -> HTTP request
 * @param  {[HTTP]}   res -> HTTP response
 * @param  {Function} next -> Next middlewarec all
 * @return {[Void]} Displays response to sender and continues on
 */
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if(!token){
    res.status(401).json({ msg: "Unauthorised" });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT);
    next();
  } catch(error) {
    res.status(400).json({ msg: "400: Bad request." });
  }
}

module.exports = auth;
