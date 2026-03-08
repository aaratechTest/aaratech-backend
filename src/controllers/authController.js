const bcrypt = require("bcryptjs");
const { db } = require("../config/firebase");
const {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  addDoc,
} = require("firebase/firestore");
const { generateToken, generateJWT } = require("../utils/tokenUtils");
const { sendEmail } = require("../utils/sendEmail");
const { resetPasswordEmail } = require("../utils/emailTemplates");

const ADMINS = "admins";
const TOKENS = "tokens";

// POST /api/auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const q = query(collection(db, ADMINS), where("email", "==", email));
    const snap = await getDocs(q);

    if (snap.empty) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const adminDoc = snap.docs[0];
    const admin = adminDoc.data();

    if (admin.status !== "active") {
      return res.status(401).json({ error: "Account is not active. Please set your password first." });
    }

    if (!admin.password) {
      return res.status(401).json({ error: "Password not set. Check your email for the setup link." });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateJWT({
      id: adminDoc.id,
      email: admin.email,
      role: admin.role,
    });

    res.json({
      token,
      admin: {
        id: adminDoc.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/auth/verify-token
async function verifyToken(req, res) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    const q = query(collection(db, TOKENS), where("token", "==", token));
    const snap = await getDocs(q);

    if (snap.empty) {
      return res.status(400).json({ error: "Invalid token" });
    }

    const tokenDoc = snap.docs[0];
    const tokenData = tokenDoc.data();

    if (tokenData.used) {
      return res.status(400).json({ error: "Token has already been used" });
    }

    if (Date.now() > tokenData.expiresAt) {
      return res.status(400).json({ error: "Token has expired" });
    }

    res.json({ valid: true, email: tokenData.email, type: tokenData.type });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/auth/set-password
async function setPassword(req, res) {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: "Token and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Find and validate token
    const q = query(
      collection(db, TOKENS),
      where("token", "==", token),
      where("type", "==", "create_password")
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      return res.status(400).json({ error: "Invalid token" });
    }

    const tokenDoc = snap.docs[0];
    const tokenData = tokenDoc.data();

    if (tokenData.used || Date.now() > tokenData.expiresAt) {
      return res.status(400).json({ error: "Token is expired or already used" });
    }

    // Find admin by email
    const adminQ = query(collection(db, ADMINS), where("email", "==", tokenData.email));
    const adminSnap = await getDocs(adminQ);

    if (adminSnap.empty) {
      return res.status(400).json({ error: "Admin account not found" });
    }

    const adminDoc = adminSnap.docs[0];
    const hashed = await bcrypt.hash(password, 10);

    // Update admin: set password and activate
    await updateDoc(doc(db, ADMINS, adminDoc.id), {
      password: hashed,
      status: "active",
    });

    // Mark token as used
    await updateDoc(doc(db, TOKENS, tokenDoc.id), { used: true });

    res.json({ message: "Password set successfully. You can now log in." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/auth/forgot-password
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Always return 200 to prevent email enumeration
    const q = query(collection(db, ADMINS), where("email", "==", email));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const adminDoc = snap.docs[0];
      const admin = adminDoc.data();

      if (admin.status === "active") {
        const token = generateToken();
        await addDoc(collection(db, TOKENS), {
          token,
          email,
          type: "reset_password",
          expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
          used: false,
        });

        const link = `${process.env.FRONTEND_URL}/admin/reset-password?token=${token}`;
        await sendEmail({
          to: email,
          subject: "Reset Your Password — AaraTech",
          html: resetPasswordEmail(admin.name, link),
        });
      }
    }

    res.json({ message: "If the email exists, a reset link has been sent." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/auth/reset-password
async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: "Token and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const q = query(
      collection(db, TOKENS),
      where("token", "==", token),
      where("type", "==", "reset_password")
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      return res.status(400).json({ error: "Invalid token" });
    }

    const tokenDoc = snap.docs[0];
    const tokenData = tokenDoc.data();

    if (tokenData.used || Date.now() > tokenData.expiresAt) {
      return res.status(400).json({ error: "Token is expired or already used" });
    }

    const adminQ = query(collection(db, ADMINS), where("email", "==", tokenData.email));
    const adminSnap = await getDocs(adminQ);

    if (adminSnap.empty) {
      return res.status(400).json({ error: "Admin account not found" });
    }

    const adminDoc = adminSnap.docs[0];
    const hashed = await bcrypt.hash(password, 10);

    await updateDoc(doc(db, ADMINS, adminDoc.id), { password: hashed });
    await updateDoc(doc(db, TOKENS, tokenDoc.id), { used: true });

    res.json({ message: "Password reset successfully. You can now log in." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/auth/change-password (authenticated)
async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Current password and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters" });
    }

    const adminDoc = await getDoc(doc(db, ADMINS, req.admin.id));
    if (!adminDoc.exists()) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const admin = adminDoc.data();
    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await updateDoc(doc(db, ADMINS, req.admin.id), { password: hashed });

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/auth/profile (authenticated)
async function getProfile(req, res) {
  try {
    const adminDoc = await getDoc(doc(db, ADMINS, req.admin.id));
    if (!adminDoc.exists()) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const admin = adminDoc.data();
    res.json({
      id: adminDoc.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      status: admin.status,
      createdAt: admin.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  login,
  verifyToken,
  setPassword,
  forgotPassword,
  resetPassword,
  changePassword,
  getProfile,
};
