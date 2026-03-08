const express = require("express");
const { requireAuth, requireSuperAdmin } = require("../middleware/auth");
const {
  inviteAdmin,
  getAdmins,
  deleteAdmin,
  resendInvite,
} = require("../controllers/adminController");

const router = express.Router();

router.use(requireAuth, requireSuperAdmin);

router.post("/invite", inviteAdmin);
router.get("/", getAdmins);
router.delete("/:id", deleteAdmin);
router.post("/:id/resend-invite", resendInvite);

module.exports = router;
