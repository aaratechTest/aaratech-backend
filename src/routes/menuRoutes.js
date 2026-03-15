const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { getMenu, updateMenu, seedMenu } = require("../controllers/menuController");

const router = express.Router();

// Public route
router.get("/", getMenu);

// Auth-protected routes
router.put("/", requireAuth, updateMenu);
router.post("/seed", requireAuth, seedMenu);

module.exports = router;
