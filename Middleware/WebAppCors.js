// ===== Requirements =====
const express = require("express");
const router = express.Router();

/**
 * Middleware CORS function
 * @param  {[HTTP]}   req -> HTTP request
 * @param  {[HTTP]}   res -> HTTP response
 * @param  {Function} next -> Next middleware
 * @return {[Void]} Sets CORS enabled for WEB APP domain
 */
function webAppCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
}

module.exports = webAppCors;
