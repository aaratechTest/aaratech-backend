const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { getMenu, updateMenu } = require("../controllers/menuController");

const router = express.Router();

// Public route
router.get("/", getMenu);

// Auth-protected route
router.put("/", requireAuth, updateMenu);

module.exports = router;
