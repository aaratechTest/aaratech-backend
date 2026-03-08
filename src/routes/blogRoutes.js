const express = require("express");
const {
  getBlogs,
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const blogUpload = require("../middleware/blogUpload");
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
router.get("/", getBlogs);
router.get("/slug/:slug", getBlogBySlug);

// Admin routes (order matters: /all before /:id)
router.get("/all", requireAuth, getAllBlogs);
router.get("/:id", requireAuth, getBlogById);

router.post(
  "/",
  requireAuth,
  blogUpload.single("coverImage"),
  handleMulterError,
  createBlog
);

router.put(
  "/:id",
  requireAuth,
  blogUpload.single("coverImage"),
  handleMulterError,
  updateBlog
);

router.delete("/:id", requireAuth, deleteBlog);

module.exports = router;
