// ===== Requirements =====
const express = require('express');
const mongoose = require("mongoose");

// ===== WorkHours Model =====
const WorkHours = require("../Models/WorkHours");

// ===== Custom Functions =====
const getDateForDb = require("../Functions/GetDateForDb");

/**
 * Function starts new day at midnight aka it creates a new Date
 * input in the WorkHours document
 */
function startNewDate() {
  const newDate = new WorkHours({
    _id: new mongoose.Types.ObjectId(),
    date: getDateForDb().split(" ")[1]
  });
  newDate.save();
}

module.exports = startNewDate;
