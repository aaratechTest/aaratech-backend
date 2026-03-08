const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  getPages,
  getPageBySlug,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  seedPages,
} = require("../controllers/pageController");

const router = express.Router();

// Public route
router.get("/slug/:slug", getPageBySlug);

// Auth-protected routes
router.get("/", requireAuth, getPages);
router.get("/:id", requireAuth, getPageById);
router.post("/seed", requireAuth, seedPages);
router.post("/", requireAuth, createPage);
router.put("/:id", requireAuth, updatePage);
router.delete("/:id", requireAuth, deletePage);

module.exports = router;
