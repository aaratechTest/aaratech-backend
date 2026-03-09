const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");

const router = express.Router();

// Public route
router.get("/", getSettings);

// Auth-protected route
router.put("/", requireAuth, updateSettings);

module.exports = router;
