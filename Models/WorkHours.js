// ===== Requirements =====
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ===== Schema for the user data =====
const WorkHoursSchema = new Schema({
  _id: Schema.Types.ObjectId,
  date: {
    type: String,
    required: true
  },
  users: [{
    userId: String,
    type: Array,
    required: true,
    userName: String,
    userRole: String,
    currentStartTime: String,
    userWorkTime: [{
      type: Array,
      required: true,
      startTime: String,
      endTime: String
    }],
    fullTime: {
      type: String,
      required: true,
      default: "00:00"
    }
  }]
});

module.exports = WorkHours = mongoose.model("WorkHours", WorkHoursSchema);
