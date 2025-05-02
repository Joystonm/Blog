const express = require("express");
const router = express.Router();
const UserProfile = require("../models/UserProfile");

// Get user profile by email
router.get("/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const user = await UserProfile.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Send the full user profile including bio, location, etc.
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

// Update user profile by email
router.put("/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const updates = req.body;

    // Prevent password changes here (optional)
    if (updates.password) delete updates.password;

    // Check if the user exists before updating
    let user = await UserProfile.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile
    user = await UserProfile.findOneAndUpdate({ email }, updates, {
      new: true,
    });

    res.json(user); // Return updated profile
  } catch (err) {
    res.status(500).json({ message: "Error updating user profile" });
  }
});

module.exports = router;
