// ===== Requirements =====
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ===== Schema for the user data =====
const VerifiedUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mac: {
    type: String,
    required: true,
    unique: true
  },
  active: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = VerifiedUser = mongoose.model("VerifiedUser", VerifiedUserSchema);
