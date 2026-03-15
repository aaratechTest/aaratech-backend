const express = require("express");
const {
  getEvents,
  getAllEvents,
  getEventBySlug,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const eventUpload = require("../middleware/eventUpload");
const { requireAuth } = require("../middleware/auth");
const multer = require("multer");

const router = express.Router();

// Multer error handler middleware
function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "Cover image must be under 500KB" });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
}

// Public routes
router.get("/", getEvents);
router.get("/slug/:slug", getEventBySlug);

// Admin routes (order matters: /all before /:id)
router.get("/all", requireAuth, getAllEvents);
router.get("/:id", requireAuth, getEventById);

router.post(
  "/",
  requireAuth,
  eventUpload.single("coverImage"),
  handleMulterError,
  createEvent
);

router.put(
  "/:id",
  requireAuth,
  eventUpload.single("coverImage"),
  handleMulterError,
  updateEvent
);

router.delete("/:id", requireAuth, deleteEvent);

module.exports = router;
