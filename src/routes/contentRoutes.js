const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  getContent,
  updateContent,
  seedContent,
} = require("../controllers/contentController");

const router = express.Router();

// Public route
router.get("/:slug", getContent);

// Auth-protected routes
router.post("/seed", requireAuth, seedContent);
router.put("/:slug", requireAuth, updateContent);

module.exports = router;
