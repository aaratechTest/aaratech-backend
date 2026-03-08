const { db } = require("../config/firebase");
const {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  orderBy,
} = require("firebase/firestore");
const { generateToken } = require("../utils/tokenUtils");
const { sendEmail } = require("../utils/sendEmail");
const { adminInviteEmail } = require("../utils/emailTemplates");

const ADMINS = "admins";
const TOKENS = "tokens";

// POST /api/admins/invite
async function inviteAdmin(req, res) {
  try {
    const { email, name, role } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: "Email and name are required" });
    }

    const adminRole = role === "super_admin" ? "super_admin" : "admin";

    // Check if email already exists
    const q = query(collection(db, ADMINS), where("email", "==", email));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return res.status(409).json({ error: "An admin with this email already exists" });
    }

    // Create admin record
    const adminDoc = await addDoc(collection(db, ADMINS), {
      email,
      name,
      role: adminRole,
      password: null,
      status: "pending",
      createdAt: Date.now(),
      createdBy: req.admin.email,
    });

    // Generate token
    const token = generateToken();
    await addDoc(collection(db, TOKENS), {
      token,
      email,
      type: "create_password",
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      used: false,
    });

    // Send invite email
    const link = `${process.env.FRONTEND_URL}/admin/set-password?token=${token}`;
    await sendEmail({
      to: email,
      subject: "You're Invited to AaraTech Admin Panel",
      html: adminInviteEmail(name, req.admin.email, link),
    });

    res.status(201).json({
      message: "Admin invited successfully",
      admin: {
        id: adminDoc.id,
        email,
        name,
        role: adminRole,
        status: "pending",
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/admins
async function getAdmins(req, res) {
  try {
    const q = query(collection(db, ADMINS), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    const admins = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        email: data.email,
        name: data.name,
        role: data.role,
        status: data.status,
        createdAt: data.createdAt,
        createdBy: data.createdBy,
      };
    });

    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/admins/:id
async function deleteAdmin(req, res) {
  try {
    const { id } = req.params;

    // Prevent self-deletion
    if (id === req.admin.id) {
      return res.status(400).json({ error: "You cannot delete your own account" });
    }

    const adminDoc = await getDoc(doc(db, ADMINS, id));
    if (!adminDoc.exists()) {
      return res.status(404).json({ error: "Admin not found" });
    }

    await deleteDoc(doc(db, ADMINS, id));
    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/admins/:id/resend-invite
async function resendInvite(req, res) {
  try {
    const { id } = req.params;

    const adminDoc = await getDoc(doc(db, ADMINS, id));
    if (!adminDoc.exists()) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const admin = adminDoc.data();
    if (admin.status !== "pending") {
      return res.status(400).json({ error: "Admin account is already active" });
    }

    // Generate new token
    const token = generateToken();
    await addDoc(collection(db, TOKENS), {
      token,
      email: admin.email,
      type: "create_password",
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      used: false,
    });

    const link = `${process.env.FRONTEND_URL}/admin/set-password?token=${token}`;
    await sendEmail({
      to: admin.email,
      subject: "Reminder: Set Your AaraTech Admin Password",
      html: adminInviteEmail(admin.name, req.admin.email, link),
    });

    res.json({ message: "Invite resent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { inviteAdmin, getAdmins, deleteAdmin, resendInvite };
