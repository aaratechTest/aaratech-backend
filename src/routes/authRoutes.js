const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  login,
  verifyToken,
  setPassword,
  forgotPassword,
  resetPassword,
  changePassword,
  getProfile,
} = require("../controllers/authController");

const router = express.Router();

// Public
router.post("/login", login);
router.post("/verify-token", verifyToken);
router.post("/set-password", setPassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Authenticated
router.post("/change-password", requireAuth, changePassword);
router.get("/profile", requireAuth, getProfile);

module.exports = router;
