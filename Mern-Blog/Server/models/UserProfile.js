const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, default: null },
  linkedIn: { type: String, default: null },
  github: { type: String, default: null },
  portfolio: { type: String, default: null },
  phone: { type: String, default: null },
  location: { type: String, default: null },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
